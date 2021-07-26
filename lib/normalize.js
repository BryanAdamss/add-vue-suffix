/**
 * @author GuangHui
 * @description 标准化路径
 */
const path = require('path')

function normalizePath(p) {
  if (typeof p !== 'string') throw new TypeError('Path must be a string')

  return p.split(path.sep).join('/')
}

module.exports = { normalizePath }
