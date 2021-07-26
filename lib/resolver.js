/**
 * @author GuangHui
 * @description 路径解析器(webpack)
 */

const { create } = require('enhanced-resolve')

function factory(likeWebpackResolveConfig) {
  return create.sync(likeWebpackResolveConfig)
}

module.exports = {
  createMyResolver: factory,
}
