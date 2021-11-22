# add-vue-suffix

🔨Give some vue files ,find reference and add `.vue` suffix;(Useful for some project migrate to `vite` from `webpack`)

English | [中文](https://github.com/BryanAdamss/add-vue-suffix/blob/master/README.zh-CN.md)

## Install

```sh
npm i -D add-vue-suffix

or

yarn add add-vue-suffix -D
```

## Usage

### with cli

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

- `resolveConifg` is a path to a `enhanced-resolve` config file;
- Because [`webpack` use `enhanced-resolve` underhood](https://webpack.js.org/concepts/module-resolution/),so you just point to a `webpack config` that contain `resolve` property.
- etc

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

- If you use `vue-cli` or other not emit `webpack config` cli,you can just create a `js` file that export a object that contain `resolve` property like above.

### with function

```js
import addVueSuffix from 'add-vue-suffix'

addVueSuffix({
  withAST = false, // add-vue-suffix use regexp to replace import/export/import() by default;If you got some error,set this to true,it will use babel to replace import/export/import();
  patterns = ['src/**/*.vue', 'src/**/*.js'], // some file may be import vue file;search `vue` and `js` under `src` by default;
  globbyOptions = {}, // custom globby options, it will override default globby options;
  resolveConfig = {}, // https://www.npmjs.com/package/enhanced-resolve；https://webpack.js.org/configuration/resolve/#resolve
  debug = false,// set true will not rewrite file;
})
```

## NPM

- [vue-cli-plugin-auto-alias](https://www.npmjs.com/package/vue-cli-plugin-auto-alias)
- [@bryanadamss/drawing-board](https://www.npmjs.com/package/@bryanadamss/drawing-board)
- [@bryanadamss/num2chn](https://www.npmjs.com/package/@bryanadamss/num2chn)
- [ant-color-converter](https://www.npmjs.com/package/ant-color-converter)

## Show your support

Give a ⭐️ if this project helped you!

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
