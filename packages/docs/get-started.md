---
search: false
next:
  link: /components/button
  text: Button 按钮
---


# 最新 Vue3 + TS 高仿 ElementPlus 打造自己的组件库

## 安装

```bash
npm i @eric-ui --save
```

## 开始使用

**全局使用**

```js
// 引入所有组件
import EricUI from "toy-element";
// 引入样式
import "toy-element/dist/index.css";

import App from "./App.vue";
// 全局使用
createApp(App).use(ErElement).mount("#app");
```

```vue
<template>
  <er-button>我是 Button</er-button>
</template>
```

**单个导入**

Eric-UI 提供了基于 ES Module 的开箱即用的 Tree Shaking 功能。

```vue
<template>
  <er-button>我是 Button</er-button>
</template>
<script>
import { ErButton } from " toy-element";
export default {
  components: { ErButton },
};
</script>
```


::: api-table src=components/Button/types.ts
:::
