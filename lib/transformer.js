/**
 * @author GuangHui
 * @description 转换
 */

const parse = require('@babel/parser').parse
const traverse = require('@babel/traverse').default
const generate = require('@babel/generator').default
const t = require('@babel/types')

const { succ } = require('./log')
const { normalizePath } = require('./normalize')
const { createMyResolver } = require('./resolver')

module.exports = class Transformer {
  constructor(vueFiles = [], resolveConfig = {}) {
    this.resolveConfig = resolveConfig
    this.vueFiles = vueFiles
    this.resolver = createMyResolver(this.resolveConfig)
  }

  /**
   * 路径是否命中
   * @param {string} p 待检测路径
   * @returns {boolean} 是否命中
   */
  isHitted(p) {
    return this.vueFiles.includes(p)
  }

  transform({ code, fileDir, withAST = false, debug = false }) {
    return withAST
      ? this.transformWithAST(code)
      : this.transformWithReg(code, fileDir, debug)
  }

  transformWithAST(
    code,
    options = {
      sourceType: 'module',
      plugins: [
        // enable jsx
        'jsx',
      ],
    }
  ) {
    // const testCode = `export * from 'test'; // ExportAllDeclaration
    // import "test.css"; // ImportDeclaration
    // import Test from 'test'; // ImportDeclaration
    // export { aa } from 'test2'; // ExportNamedDeclaration
    // export * as TT from 'test3'; // ExportNamedDeclaration
    // import(
    //     /* webpackChunkName:'AiClassReport' */ 'Views/AiClassReport/AiClassReport'
    //   ); // 动态导入
    // export default {test:3}; // ExportDefaultDeclaration，无source
    // `

    const ast = parse(code, options)

    traverse(ast, {
      enter: function (path, state) {
        // 动态导入import('xxx')
        if (
          t.isImport(path.node) &&
          path.parentPath &&
          path.parentPath.node &&
          path.parentPath.node.arguments &&
          path.parentPath.node.arguments.length
        ) {
          if (
            path.parentPath.node.arguments[0] &&
            typeof path.parentPath.node.arguments[0].vaule === 'string' &&
            path.parentPath.node.arguments[0].vaule.indexOf('.vue') < 0
          ) {
            try {
              const resolvedModulePath = this.resolver(
                process.cwd(),
                path.parentPath.node.arguments[0].value
              )
              const normalizedPath = normalizePath(resolvedModulePath)

              if (this.isHitted(normalizedPath)) {
                path.node.source.value += '.vue'
              }
            } catch (error) {}
          }
        }

        // 覆盖ExportAllDeclaration、ExportNamedDeclaration、ImportDeclaration
        if (
          t.isExportAllDeclaration(path.node) ||
          t.isExportNamedDeclaration(path.node) ||
          t.isImportDeclaration(path.node)
        ) {
          if (
            path.node &&
            path.node.source &&
            path.node.source.value &&
            path.node.source.value.indexOf('.vue') < 0
          ) {
            try {
              const resolvedModulePath = this.resolver(
                process.cwd(),
                path.node.source.value
              )

              const normalizedPath = normalizePath(resolvedModulePath)

              if (this.isHitted(normalizedPath)) {
                path.node.source.value += '.vue'
              }
            } catch (error) {}
          }
        }
      },
    })

    return generate(ast, { retainLines: true, comments: true }, code).code
  }

  transformWithReg(code, fileDir, debug) {
    if (typeof code !== 'string') return

    const reg =
      /(?:(?:(?:im|ex)port[\s{}\w,\-\*]*?from\s*?(?<SQUOTE>['"]+?)(?<SMODULE>[^'"\s]+)\k<SQUOTE>)|(?:import\s*?\(\s*?(?:\/\*[^\*\/]*?\*\/)?\s*?(?<DQUOTE>['"])(?<DMODULE>[^'"\s]+)\k<DQUOTE>\s*?\);?));??/g

    return code.replace(reg, (...args) => {
      const { SMODULE, DMODULE } = args[7]
      const input = args[0]

      const modulePath = SMODULE || DMODULE || ''

      if (!modulePath) return input

      try {
        const resolvedModulePath = this.resolver(
          /^\./.test(modulePath) ? fileDir : process.cwd(), // 相对路径，需要基于文件路径解析
          modulePath
        )

        const normalizedPath = normalizePath(resolvedModulePath)

        debug &&
          succ(
            `this.isHitted(${normalizedPath})`,
            this.isHitted(normalizedPath)
          )

        return this.isHitted(normalizedPath)
          ? input.replace(modulePath, modulePath + '.vue')
          : input
      } catch (error) {
        return input
      }
    })
  }
}
