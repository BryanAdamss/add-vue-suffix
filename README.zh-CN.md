# add-vue-suffix

🔨 找出所有引用`vue`组件的地方，并给其加上`.vue`后缀；适用于需要从`webpack`迁移到`vite`的老项目

中文 | [English](https://github.com/BryanAdamss/add-vue-suffix/blob/master/README.md)

## 安装

```sh
npm i -D add-vue-suffix

or

yarn add add-vue-suffix -D
```

## 使用

### cli

```bash
npx add-vue-suffix --resolveConifg ./path/to/resolve-config.js
```

or

```json
{
  "scripts": {
    "add-vue-suffix": "add-vue-suffix --resolveConifg ./path/to/resolve-config.js"
  }
}
```

- `resolveConifg` 指向 `enhanced-resolve` 配置文件的路径；
- [因为`webpack`底层使用`enhanced-resolve`来解析模块，所以直接将`resolveConfig`指向一个导出包含`resolve`的对象路径即可](https://webpack.js.org/concepts/module-resolution/)
- 例子

```js
// webpack.config.js
const path = require('path')

module.exports={
  input:'./src/index.js',

  ...,

  resolve:{
    extensions: ['.js', '.vue', '.json'],
    alias: {
      '@': path.resolve('src'),
      Api: path.resolve('src/api'),
      Api2: path.resolve('src/api2'),
      Assets: path.resolve('src/assets'),
      Base: path.resolve('src/base'),
      Config: path.resolve('src/config'),
      Components: path.resolve('src/components'),
      Directives: path.resolve('src/directives'),
      Plugins: path.resolve('src/plugins'),
      Routes: path.resolve('src/routes'),
      Sass: path.resolve('src/sass'),
      Services: path.resolve('src/services'),
      Stores: path.resolve('src/stores'),
      Utils: path.resolve('src/utils'),
      Views: path.resolve('src/views')
  }
}
```

- 如果你使用`vue-cli`等一些不会抛出`webpack`配置的`cli`，你可以创建一个`js`文件，导出一个包含`resolve`属性的对象即可，就像上面的例子一样

### 使用 function

```js
import addVueSuffix from 'add-vue-suffix'

addVueSuffix({
  withAST = false, // 是否使用AST进行转换
  patterns = ['src/**/*.vue', 'src/**/*.js'], // 默认搜索src下面的vue和js文件
  globbyOptions = {}, // 自定义globby的选项，会覆盖默认的选项
  resolveConfig = {}, // https://www.npmjs.com/package/enhanced-resolve；和webpack.resolve一致；https://webpack.js.org/configuration/resolve/#resolve
  debug = false, // 设为true，则不会世界写文件
})
```

## NPM

- [vue-cli-plugin-auto-alias](https://www.npmjs.com/package/vue-cli-plugin-auto-alias)
- [@bryanadamss/drawing-board](https://www.npmjs.com/package/@bryanadamss/drawing-board)
- [@bryanadamss/num2chn](https://www.npmjs.com/package/@bryanadamss/num2chn)
- [ant-color-converter](https://www.npmjs.com/package/ant-color-converter)

## Show your support

如果你觉得这个插件对你有帮助，请给一个小星星 ⭐️(star)

## 📝 License

Copyright © 2021 [BryanAdamss@foxmail.com](https://github.com/BryanAdamss).<br />
This project is [MIT](https://github.com/kefranabg/readme-md-generator/blob/master/LICENSE) licensed.

## Contributors ✨

Thanks goes to these wonderful people ([emoji key](https://allcontributors.org/docs/en/emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tr>
    <td align="center"><a href="https://bryanadamss.github.io/"><img src="https://avatars3.githubusercontent.com/u/7441504?v=4" width="64px;" alt=""/><br /><sub><b>GuangHui</b></sub></a><br /><a href="#projectManagement-BryanAdamss" title="Project Management">📆</a></td>
  </tr>
</table>

<!-- markdownlint-enable -->
<!-- prettier-ignore-end -->

<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification. Contributions of any kind welcome!
