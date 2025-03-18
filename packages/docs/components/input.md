---
title: Input
description: Input 组件文档

prev: false

next: 
  link: components/form
  text: Form 表单
---

# Input 输入框

通过鼠标或键盘输入字符

## 基础用法

::: previews 
demo-preview=../demo/input/Basic.vue
:::


## 禁用状态

通过 `disabled` 属性指定是否禁用 input 组件

::: previews 
demo-preview=../demo/input/Disabled.vue
:::

## 一键清空

使用`clearable`属性即可得到一个可一键清空的输入框

::: previews 
demo-preview=../demo/input/Clearable.vue
:::

## 密码框

使用`show-password`属性即可得到一个可切换显示隐藏的密码框

::: previews 
demo-preview=../demo/input/Password.vue
:::


## 带图标的输入框

带有图标标记输入类型

`prefix`和`suffix`命名的插槽能正常工作。

::: previews 
demo-preview=../demo/input/HaveIcon.vue
:::

## 文本域​

用于输入多行文本信息可缩放的输入框。 添加`type="textarea"`属性来将 input 元素转换为原生的`textarea`元素。

::: previews 
demo-preview=../demo/input/Area.vue
:::

尺寸​
使用`size`属性改变输入框大小。 除了默认大小外，还有另外两个选项： `large`, `small`。

::: previews 
demo-preview=../demo/input/Size.vue
:::



## Input API

### Prop

| 参数           | 说明                                 | 类型                                    | 可选值                  | 默认值 |
| -------------- | ------------------------------------ | --------------------------------------- | ----------------------- | ------ |
| `id`           | 输入框的唯一标识符                   | `string`                                | —                       | —      |
| `modelValue`   | 绑定值                               | `string`                                | —                       | —      |
| `type`         | 输入框类型                           | `string`                                | —                       | `text` |
| `size`         | 输入框尺寸                           | `"large" \| "small"`                    | `large`、`small`        | —      |
| `disabled`     | 是否禁用输入框                       | `boolean`                               | —                       | `false`|
| `clearable`    | 是否可清空                           | `boolean`                               | —                       | `false`|
| `showPassword` | 是否显示密码切换按钮                 | `boolean`                               | —                       | `false`|
| `placeholder`  | 输入框占位文本                       | `string`                                | —                       | —      |
| `readonly`     | 是否只读                             | `boolean`                               | —                       | `false`|
| `autocomplete` | 原生属性，自动完成                   | `string`                                | —                       | —      |
| `autofocus`    | 是否自动获取焦点                     | `boolean`                               | —                       | `false`|
| `form`         | 原生属性，所属表单的 id              | `string`                                | —                       | —      |


### Slot

| 名称      | 说明           |
| --------- | -------------- |
| `prefix`  | 输入框头部内容 |
| `suffix`  | 输入框尾部内容 |
| `prepend` | 输入框前置内容 |
| `append`  | 输入框后置内容 |


### Event

| 事件名               | 说明                           | 回调参数               |
| -------------------- | ------------------------------ | ---------------------- |
| `update:modelValue`  | 输入值变化时触发               | `(value: string)`      |
| `input`              | 输入时触发                     | `(value: string)`      |
| `change`             | 失去焦点且值变化时触发         | `(value: string)`      |
| `focus`              | 输入框获得焦点时触发           | `(event: FocusEvent)`  |
| `blur`               | 输入框失去焦点时触发           | `(event: FocusEvent)`  |
| `clear`              | 点击清除按钮时触发             | —                      |


### Exposes

| 方法名 | 说明                     | 参数 |
| ------ | ------------------------ | ---- |
| `focus`| 使输入框获取焦点         | —    |
| `blur` | 使输入框失去焦点         | —    |
| `select` | 选中输入框中的文本内容 | —    |
| `clear` | 清空输入框内容           | —    |