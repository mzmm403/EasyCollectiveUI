# EasyCollectiveUI


![Npm 版本](https://img.shields.io/badge/mzmm_403-ecui_v1.1.0)


## 简介🚩

- 🔗 一款基于vite+vue3+ts+vitest工具链的
- 📕 基于ESM多模块规范开发
- 📦 开箱即用，按需引入

## 进度

- ✅ Button 按钮组件
- ✅ Icon 图标组件
- ✅ Input 输入框组件
- ✅ Collapse 折叠面板组件
- ✅ Dropdown 下拉菜单组件
- ✅ Alert 提示组件
- ✅ Popconfirm 气泡确认框组件
- ✅ Tooltip 文字提示组件
- ✅ Notification 通知组件
- ✅ Form 表单组件
- 🚧 其他组件正在建设中...


##　安装🧱

```bash
npm i @easy-collective-ui
```

## 使用⚙️

- 全局使用🚀

```ts
// 引入所有组件
import EcUI from "easy-collective-ui";
// 引入样式
import "easy-collective-ui/dist/index.css";

import App from "./App.vue";
// 全局使用
createApp(App).use(EcUI).mount("#app");
```

- 按需引入🛹

```ts
import { EcButton } from "easy-collective-ui";
```

