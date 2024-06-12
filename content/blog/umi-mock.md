---
title: UmiJS V3 和 V4 版本对 Mock 文件转译方式的区别
description: archives
tags: 
  - blog 
date: 2024-06-12 15:52:05
---

## UmiJS Mock 插件实现的整体思路

1. 读取 Mock 目录下的 Mock 文件，获取文件内容
2. 使用插件 API `addBeforeMiddlewares`，在`webpack-dev-middleware`之前添加中间件处理请求并返回 Mock 内容

查看文档可以发现，示例中的 Mock 文件都使用 ESM，而 UmiJS 会在处理内容的过程中，将其转译为 CJS，随后使用 `require` 获取内容

## UmiJS 两个版本中转译方式的区别

### V3

> Mock 插件地址 packages/preset-built-in/src/plugins/commands/dev/Mock/Mock.ts

UmiJS V3 中使用 Babel 的 `register` 处理 Mock 文件

> @babel/register 使用 Node 的 require() 钩子系统（hook system） 在加载文件时即时编译文件

具体在代码中体现在插件 API 中提供的 [babelRegister.setOnlyMap](https://v3.umijs.org/zh-CN/plugins/api#babelregistersetonlymap-key-string-value-string-) 属性

Mock 插件中的使用方式为

```typescript
export const getMockData = (opts) => {
  ...
   // register babel
  registerBabel(MockPaths);
  ...
}
```

### V4

> Mock 插件地址 packages/preset-umi/src/features/Mock/Mock.ts

UmiJS 在 V4 版本中废弃了 `babelRegister.setOnlyMap` API，转而使用 [pirates](https://github.com/danez/pirates) 对 `require` 进行劫持

然后添加 hook，使用 `transformSync` 对 Mock 文件进行同步转换（V4 中使用的是 `esbuild.transformSync`）

基于 `pirates` 和 `transformSync`，V4 中在 `@umijs/utils` 中实现了一个自己的 `register` 方法

Mock 插件中的使用方式为

```typescript
export const getMockData = (opts) => {
   register.register({
    implementor: esbuild,
  });
  register.clearFiles();
  ...
  for (const file of register.getFiles()) {
    delete require.cache[file];
  }
  register.restore();
}
```
  
注意：**在 `register.restore()` 中会执行取消 hook 的操作**

### 读取数据

在最后，两个版本都是通过以下的判断去获取最终数据

```typescript
// V4 中实现
try {
  m = require(MockFile);
} catch(e) {
  ...
}
// Support esm and cjs
const obj = m?.default || m || {};
```
