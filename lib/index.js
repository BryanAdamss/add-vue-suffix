/**
 * @author GuangHui
 * @description 入口
 */

const fs = require('fs')
const globby = require('globby')
const Transformer = require('./transformer')
const { normalizePath } = require('./normalize')
const fileSave = require('file-save')

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
  let _count = 0

  const options = Object.assign({}, defaultGlobbyOptions, globbyOptions)

  const maybeImportVue = globby.sync(patterns, options)

  if (!maybeImportVue || !maybeImportVue.length) return

  const normalizedPaths = maybeImportVue.map(normalizePath)

  console.log('maybeImportVue', normalizedPaths)

  const vueFiles = normalizedPaths.filter(file => /.vue$/.test(file))

  if (!resolveConfig || JSON.stringify(resolveConfig) === '{}') {
    console.log(
      '💢The `resolveConfig` config is empty, the alias path will be ignored!'
    )
  }
  const myTransformer = new Transformer(vueFiles, resolveConfig || {})

  for (let i = 0, cont = null, file = null; i < normalizedPaths.length; i++) {
    try {
      file = normalizedPaths[i]
      cont = fs.readFileSync(file, 'utf8')

      // 不包含导入、导出直接跳过
      if (cont.indexOf('import') < 0 && cont.indexOf('export') < 0) {
        continue
      }

      const output = myTransformer.transform(cont, { withAST })

      !debug && output && output !== cont && fileSave(file).write(output)
      cont++
    } catch (error) {
      console.log(error)
      continue
    }
  }

  console.log(`Total rewrite ${_count} file;`)
  console.log(`Total cost ${new Date().getTime() - _startTime}ms;`)
}
