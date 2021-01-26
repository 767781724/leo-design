# 快速入门

## 安装

```node
npm install leo-design
yarn add leo-design
```

## 使用

```js
import { Button } from 'leo-design';
```

## 按需加载

**babel.config.json** or **.babelrc.json**

```json
"plugins":[
  [
    "import", {
      "libraryName": "leo-design",
      "libraryDirectory": "lib",
      "style": "css"
    }
  ]
]
```
