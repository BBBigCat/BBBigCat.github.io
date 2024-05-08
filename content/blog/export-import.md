---
title: js 模块引用的相关介绍(export, exports, import等)
date: 2019-09-01
description: archives
tags: 
  - blog
---

## export, export default, exports, module expoerts的区别

**export, export default**

1、这两个是属于 es6 的模块规范，可用于导出常量，函数，文件，模块等，导入使用 import（也可以是 require）
2、在一个文件和模块中，export 可以有多个，但是 export default 只能有一个
3、通过 export 导出时，在导入时要加入 {}， export default 则不需要
4、输出单个值用 export default，多个值用 export
5、两个不能一起用

**exports, module.exports**
1、这两个是 node 的语法，属于 CommonJS 模块规范，导入需要 require
2、

~~~
  var exports = module.exports = {};
~~~

Node 应用由模块构成，node 为每一个模块提供一个 exports 变量，指向 module.exports
3、可以在 exports 对象上添加方法，表示对外输出的接口，如同在 module.exports 上添加一样
4、不能直接将 exports 变量指向一个值，会切断与 module.exports 之间的联系

## 直接在 h5 页面中使用 import 的问题
>
> 在 h5 页面中使用 import 时，会一直报错 `Unexpected identifier` 这种错误指的是书写不规范的原因

**解决办法**：

1. 在 h5 页面的中的 script 标签设置 : `<script type='module'>`, 然后开服务器
2. 使用 beble 编译成 es5

## commonjs 的扩展学习

[廖雪峰 JavaScript 教程](https://www.liaoxuefeng.com/wiki/1022910821149312/1023027697415616)

>模块：在 node 环境中，一个 .js 文件就称为一个模块(module)，使用模块大大提高了代码的可维护性，也避免了函数名和变量名的冲突，相同名字的函数和变量完全可以存在不同模块中。

> 模块的加载机制被称为 CommonJS 规范。

* 在这个规范下，每一个 .js 都是一个模块，他们内部各自使用的变量名和函数名都不冲突。
* 一个模块想要对外暴露变量(函数也是变量)，可以用 module.export = veriable，一个模块想要引用其他模块暴露的变量，用 var ref = require('module_name')，就拿到了引用模块的变量

##### 深入了解模块原理
>
> JavaScript 语言本身并没有一种模块机制来保证不同模块可以使用相同的变量(全局变量)名。

**node.js 是如何实现的？**
> 实现`模块`的功能，并不需要语法层面的支持。Node.js 也并不会增加任何 JavaScript 语法，实现`模块`的主要奥妙就在于 JavaScript 是一直函数式变成语言，支持闭包。如果把一段 JavaScript 用函数包装起来，这段代码的所有`全局`变量就变成了函数的内部变量。

```js
// 编写 hello.js
var s = 'hello';
var name = 'world';

console.log(s + '' + name + '!');
```

> Node.js 加载了 hello.js 后，它可以把代码包装一下，就变成了这样执行

```js
(function (){
  var s = 'hello';
  var name = 'world';
  
  console.log(s + '' + name + '!')
})()
```

这样一来，原来的全局变量 s 现在变成了匿名函数内部的局部变量。如果 Node.js 继续加载其他模块，这些模块中定义的“全局”变量 s 也互干扰了。
> 模块的输出 `module.exports` 怎么实现
准备一个对象 `module`

```js
// 准备 module 对象
var module = {
  id: 'hello',
  exports: {}
};

var load = function (module){
  // 读取的 hello.js 代码
  function greet(name) {
    console.log('Hello, ' + name + '!');
  }
  
  module.exports = great;
  // hello.js 代码结束
  return module.exports;
}；
var exported = load(module);
// 保存 module
save(module, exported);
```

可见，变量 `module` 是 Node 在加载 js 文件前准备的一个变量，并将其传入加载函数，我们在 hello.js 中可以直接使用变量 `module` 的原因就在于它实际上是函数的一个参数：

`module.exports = greet`

通过把参数 `module` 传递给 `load()` 函数，hello.js 就顺利的把一个变量传递给了 Node 环境，Node 会把 `module` 变量保存到某个地方。

由于 Node 保存了所有导入的 module ，当我们用 require() 获取 module 时，Node 找到对用的 module，把这个 module 的 exports 变量返回，这样，另一个模块就顺利的拿到了模块的输出。

> ##### 注意

如果要输出一个键值对象 {}， 可以利用 exports 这个已存在的空对象 {}，并继续在上面添加新的键值。
如果要输出一个函数或数组，必须直接对 module.exports 对象赋值。

```js
// 如以下情况
module.exports = function () { return 'foo'; };

```

```js
function hello() {
    console.log('Hello, world!');
}

function greet(name) {
    console.log('Hello, ' + name + '!');
}

function hello() {
    console.log('Hello, world!');
}
// 使用 exports
exports.hello = hello;
exports.greet = greet;
// 使用 module.exports
module.exports = {
    hello: hello,
    greet: greet
};
```
