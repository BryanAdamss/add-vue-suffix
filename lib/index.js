/**
 * @author GuangHui
 * @description 入口
 */

const fs = require('fs')
const path = require('path')
const globby = require('globby')
const Transformer = require('./transformer')
const { normalizePath } = require('./normalize')
const fileSave = require('file-save')
const { log, warn, succ, err } = require('./log')

const defaultGlobbyOptions = {
  absolute: true,
  ignore: ['**/node_modules/**'],
}

module.exports = function start({
  withAST = false, // 是否使用AST进行转换
  patterns = ['src/**/*.vue', 'src/**/*.js'], // 默认搜索src下面的vue和js文件
  globbyOptions = {}, // 自定义globby的选项，会覆盖默认的选项
  resolveConfig = {}, // https://www.npmjs.com/package/enhanced-resolve；和webpack.resolve一致；https://webpack.js.org/configuration/resolve/#resolve
  debug = false, // 设为true，则不会世界写文件
}) {
  const _startTime = new Date().getTime()
  let _rewriteCount = 0

  const options = Object.assign({}, defaultGlobbyOptions, globbyOptions)

  const maybeImportVue = globby.sync(patterns, options)

  if (!maybeImportVue || !maybeImportVue.length) return

  const normalizedPaths = maybeImportVue.map(normalizePath)
  log('maybeImportVue', normalizedPaths)

  const vueFiles = normalizedPaths.filter(p => /.vue$/.test(p))

  if (!resolveConfig || JSON.stringify(resolveConfig) === '{}') {
    warn(
      '💢The `resolveConfig` config is empty, the alias path will be ignored!'
    )
  }

  const myTransformer = new Transformer(vueFiles, resolveConfig || {})

  for (
    let i = 0, cont = null, filePath = null;
    i < normalizedPaths.length;
    i++
  ) {
    try {
      filePath = normalizedPaths[i]
      debug && log(`Processing: ${filePath}`)

      cont = fs.readFileSync(filePath, 'utf8')

      // 不包含需要替换的模块语法，直接跳过
      if (!Transformer.MODULE_REG.test(cont)) {
        debug &&
          warn(`Skip: ${filePath},cause not inculde need replace ESModule code`)
        continue
      }

      const output = myTransformer.transform({
        code: cont,
        fileDir: path.dirname(filePath),
        withAST,
        debug,
      })

      if (!debug && output && output !== cont) {
        fileSave(filePath).write(output)
        _rewriteCount++
        succ(`Rewrited: ${filePath}`)
      }
    } catch (error) {
      debug && err(error)
      continue
    }
  }

  !debug && succ(`Total rewrite ${_rewriteCount} file;`)
  !debug && succ(`Total cost ${new Date().getTime() - _startTime}ms;`)
}
