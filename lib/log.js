/**
 * @author GuangHui
 * @description log
 */

const chalk = require('chalk')

const log = console.log.bind(console)

const err = chalk.hex('#f56c6c')
const warn = chalk.hex('#e6a23c')
const info = chalk.hex('#409eff')
const succ = chalk.hex('#67c23a')

const logFactory =
  chalkFn =>
  (...args) =>
    log(chalkFn(args[0]), ...args.slice(1))

module.exports = {
  log,
  err: logFactory(err),
  warn: logFactory(warn),
  info: logFactory(info),
  succ: logFactory(succ),
}
