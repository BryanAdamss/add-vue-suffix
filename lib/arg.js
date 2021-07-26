/**
 * @author GuangHui
 * @description 参数
 */

module.exports = require('yargs')
  .boolean('withAST')
  .default('withAST', false)
  .array('patterns')
  .default('patterns', ['src/**/*.vue', 'src/**/*.js'])
  .boolean('debug')
  .default('debug', false)
