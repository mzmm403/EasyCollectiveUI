---
title: Icon
description: Icon 组件文档

prev:
  link: /components/button
  text: Button 按钮
---

# Icon 图标

> EasyCollectiveUI 提供了一套常用的图标集合。

## 基础用法

支持将图标名称传入`icon`属性来进行引入

:::preview
demo-preview=../demo/Icon/Basic.vue
:::


## 图标集合

:::Tip
**您可以点击图标复制代码**
**更多图标详见：**[Icon](https://fontawesome.com/v6/search?o=r&ic=free&s=solid&ip=classic)
:::

> 下面是部分图标的展示

:::preview
demo-preview=../demo/Icon/All.vue
:::

## Icon API

### Options

| Name  | Description  | Type         |
| ----- | ------------ | ------------ |
| icon | 图标名称 | string |
| size | 图标大小 | `enum` - `'2xs'\| 'xs'\| 'sm'\| 'lg'\| 'xl'\| '1x - 10x'` |
| sipn | 是否苍白 | boolean |
| type | 图标类型 | `enum` - `'primary'\| 'success'\| 'warning'\| 'danger'\| 'info'` |
| color | 图标颜色 | string |