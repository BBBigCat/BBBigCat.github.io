---
title: JSON.stringify() 的第二第三个参数
date: 2019-09-01
description: archives
tags: 
  - blog
---

#### JSON.stringify() 的第二第三个参数

> 场景：在使用 node 写命令行脚本的时候，修改文件内容后会出现改变原有格式的情况，这里使用到了 JSON.parse 和 JSON.stringify 的方法

`JSON.parse` 方法主要作用是把 json 字符串解析成 js 值或对象
`JSON.stringify` 方法主要作用是把 js 值或对象转换成 json 字符串
> 操作顺序
>
> 1. 先读取文件内容后使用 `JSON.parse` 将内容转换成可以操作的类型
> 2. 处理后再用 `JSON.stringify` 向文件中写入内容
>
```js
fs.readFile(configFilePath, 'utf8', (err, file) => { // configFilePath 文件路径，注意使用 `utf8` 格式
        if (err) throw err;
        let list = JSON.parse(file);
        // 对转换后的内容进行处理
        fs.writeFile(configFilePath, JSON.stringify(list, null, 4), 'utf8', function (err) {
            if (err) {
                console.log(err)
            };
        });
    });
```

这里主要介绍下 `JSON.stringify` 方法

> 语法：

```js
JSON.stringify(value[, replacer [, space]])
```

> **参数**

1. **value**：将要序列化成 一个 json 字符串的值
2. **replace**：(可选)
  函数：被序列化的每个属性都经过该函数的转换和处理
  数组：只有包含在这个数组中的属性名才会被序列化到最终的 JSON 字符串中
  null或未提供：对象的所有属性都会被序列化
3. **space**：指定缩进使用的空白字符串，用于美化输出
  如果参数是个数字，它代表有多少的空格；上限为10。该值若小于1，则意味着没有空格；
  如果该参数为字符串(字符串的前十个字母)，该字符串将被作为空格；
  如果该参数没有提供（或者为null）将没有空格
  