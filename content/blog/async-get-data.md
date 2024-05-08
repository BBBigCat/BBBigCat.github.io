---
title: 并发异步获取多个数据
date: 2019-09-01
description: archives
tags: 
  - blog
---

## 并发异步获取多个数据

> **场景**：在有些时候，我们需要并发异步获取多个数据（如爬虫时并行请求多个接口），并且在获取到数据之后，对这些数据一起进行利用，这里从最原始的场景介绍几种方法。

> #### 回调函数
> >
> > 在 promise 没有出现之前，我们首先想到的还是解决异步问题的老大哥，最基础的方法，就是回调函数（等结果出来后再执行的函数），当一个请求数据结束后，返回一个回调函数，在里面对下一个接口进行调用获取数据。

`为了简单这里使用一些 jq 的代码`

```js
$.get('http://data_source_1', function(data1) {
  $.get('http://data_source_2', function(data2) {
    $.get('http://data_source_3', function(data3) {
        let html = Object.assign({}, data1, data2, data3); 
        render(html);
    })
  })
})
```

这种方法先获取 data1，获取完成后再去获取 data2， 然后获取 data3，以此类推，可以进行多层嵌套获取，然后对所有数据进行处理，这种方法也可以解决请求接口相互依赖的情况，可以在回调函数中进行操作后再进行下一次请求。这种方式固然方便，但是嵌套回调会出现一个被很多人诟病的问题，回调地狱（这里暂且不表）。

可以注意到这里的几个请求之间并没有什么依赖关系，所以下面就介绍一种不使用回调的思路，计数器。

> #### 计数器
>>
>> 这里首先要明确下，这个方法有一个很大的局限性，需要知道一共请求了几个接口，且接口简互不关联，而且不能知道异步操作执行的顺序。思路就是自己维护一个计数器，先定义一个 `let count = 0`，每次请求成功后就 `count++`，最后判断 `count` 值是不是等于需要请求的接口数。当值为 `true` 时，对所有数据进行操作。

```js
(function (){
  let count = 0;
  cosnt result = {};
  $.get('http://data_source_1', function(data) {
    result.data1 = data;
    count++;
  });
  $.get('http://data_source_2', function(data) {
    result.data2 = data;
    count++;
  });
  $.get('http://data_source_3', function(data) {
    result.data3 = data;
    count++;
  });
  
  function handle() {
    if (count === 3) {
      let html = Object.assign({}, data1, data2, data3); 
      render(html);
    } 
  }
})
```

> #### Promise
>>
>> 在有 ES6 后，Promise 以更好的异步解决方案替代了大部分回调函数的场景，这里先使用 Promise 封装一个简单的异步请求方法

```js
  const getJson = url => {
    const promise = new Promise((resolve, reject) => {
      const handler = function() {
        if (this.readyState !== 4 ) {
          return;
        }
        if (status === 200) {
          resolve(this.response);
        } else {
          reject(new Error(statusText));
        }
      }
        const xhr = new XMLHttpRequest();
        xhr.open('GET', url);
        xhr.onreadystatechange = handler;
        xhr.responsrType = 'json';
        xhr.setRequestHeader('Accept', 'application/json');
        xhr.send();
    });
    return promise;
  }
```

> 然后进行操作

```js
getJson('http://data_source_1')
.then(data1 => 
  getJson('http://data_source_2')
  ).then(data2 => 
    getJson('http://data_source_3')
    ).then(data3 => {
      let html = Object.assign({}, data1, data2, data3)
      render(html);
    })
```

> 额，感觉也没有好到哪里，换种方法

```js
const urlList = ['http://data_source_1', 'http://data_source_2', 'http://data_source_3'];

const promises = urlList.map(item => {
    return getJson(item);
});
const p = Promise.all(promises).then(data => {
    console.log(data);
}).catch(e => {
  console.log(e);
});
```

`Promise.all` 方法接受一个数组作为参数，且都是 `Promise` 实例，当数组里的实例都变成 `fulfilled`(已完成) ,`p` 的状态才能变成 `fulfilled`
`注意：当数组中的实例中有自己的 catch 方法时，出错时不会触发 p 中的 catch 方法，该实例还会返回一个 Promise 实例，也会变成 resolved，进而调用 p  的 then 方法指定的回调函数`
