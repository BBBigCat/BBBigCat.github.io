---
title: 业务场景中的代码优化-项目分类打包
description: archives
tags: 
  - blog
date: 2020-11-28 16:03:41
---

## 前言

在工作中，遇到了一个比较特殊的场景，需要针对不同的需求开发两套不同的系统，但是两套系统的初期版本功能基本一致，只有一些细微的差异，在这种场景下，决定使用一套项目代码分类打包的方案

## 实现分类打包

这里其实是由使用 `Webpack` 时的开发环境和生产环境的例子得来的，根据 package.json 中不同的命令，执行或打包不同的代码。由此为思路，我找到了实现这种功能的插件 [DefinePlugin](https://webpack.js.org/plugins/define-plugin/)。

**DefinePlugin** 允许我们创建一个在编译时使用的全局变量配置，该全局变量可以提供给代码中使用，通过判断可以实现开发环境的代码不在生产环境中输出。

```js
new webpack.DefinePlugin({
  PRODUCTION: JSON.stringify(true),
  VERSION: JSON.stringify('5fa3b9'),
  BROWSER_SUPPORTS_HTML5: true,
  TWO: '1+1',
  'typeof window': JSON.stringify('object'),
  'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
  'process.env.TEST': JSON.stringify(process.env.TEST)
});
```

在 webpack 的打包中，会经历几个阶段

```js
// 初始代码
if (PRODUCTION) {
    console.log('生产环境');
}

// 通过 webpack 后
if (true) {
    console.log('生产环境');
}

// 再通过最小化处理后
console.log('生产环境');
```

知道了如何区分，接下来就是增加编译时的判断，可以看到配置中可以使用 node 的 process 全局对象获取值，所以我们在执行 node 命令的时候，对配置的变量进行赋值。

```js
// package.json
{
    "script": {
        "start": "TEST=true yarn start",
        "build": "TEST=true yarn build"
    }
}
```

由此，通过不同命令传入时的值，在代码的编译过程中，也会被编译成具体的内容。

## 遇到的问题

在代码中实际进行判断的时候，我为了方便（不用输入太长的字符串判断），直接对取到的内容赋值给了变量

```js
const TEST = process.env.TEST === 'true';

// 实际代码
if (TEST) {
    console.log('测试')
}

// 打包后 伪代码
if(Y.a) console.log('测试')

// 期望
console.log('测试')
```

在最后的打包文件后，并没出现最小化的情况。
因为这里违背了 DefinePlugin 的用法， DefinePlugin 是直接对文本进行替换，再进行最小化操作，这里通过变量的行为，就达不到这样的效果了。

```js
// 正确写法
if (process.env.TEST === 'true') {
    console.log('测试')
}
```

还是有点复杂，这里可以用这种方式简化下

```js
// 在项目中直接使用 TEST: boolean 即可
new webpack.DefinePlugin({
  'TEST': JSON.stringify(process.env.TEST) === 'true'
});
```

## 注意

由于插件会直接替换文本，因此为其提供的值必须在字符串本身内部包含实际引号。通常，这可以通过使用备用引号（例如'"production"'）或使用 JSON.stringify 来完成。
字符串化（'production'） -- 摘自官方文档
简单说就是要用字符串。拙见：)
