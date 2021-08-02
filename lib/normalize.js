/**
 * @author GuangHui
 * @description 标准化路径
 */
const path = require('path')
const fs = require('fs')

function normalizePath(p) {
  if (typeof p !== 'string') throw new TypeError('Path must be a string')

  return p.split(path.sep).join('/')
}

/**
 * 
 * @author LinLeung
 * @description 提取正确路径 
 */

function normalizeTransPath(normalizedPath, modulePath) {
  try {
    const tempSuffix = modulePath.match(/\/((?!\/).)*$/)
    const suffixSplit = normalizedPath.split(tempSuffix[0])

    return modulePath
      .replace(
        tempSuffix[0],
        `${tempSuffix[0]}${suffixSplit[suffixSplit.length - 1]}`
      ) || modulePath + '.vue';
  } catch(error) {
    return modulePath + '.vue'
  }
}

module.exports = { normalizePath, normalizeTransPath }
