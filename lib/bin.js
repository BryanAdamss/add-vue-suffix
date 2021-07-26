/**
 * @author GuangHui
 * @description bin
 */
const path = require('path')
const { argv } = require('./arg')

let resolveConfig = {}

try {
  const { resolve } = require(path.join(process.cwd(), argv.resolveConfig))

  resolveConfig = resolve
} catch (error) {}

require('./index')({
  resolveConfig,
  patterns: argv.patterns,
  debug: argv.debug,
  withAST: argv.withAST,
})
