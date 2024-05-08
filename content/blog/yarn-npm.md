---
title: yarn 和 npm
date: 2019-09-01
description: archives
tags: 
  - blog
---

# yarn 和 npm

> **yarn publish 和 npm publish 遇到的问题**

`可以在本地用 yarn pack 和 npm pack 模拟`

npm pack / publish 的时候，不仅会读取根目录 package.json 文件里的 files （打包/发布那些文件）属性，还会读取其他文件夹里 package.json 里的这个属性

yarn pack / publish 的时候，只读取根目录

> **npm 指令简写**

> **npm install xx --save / npm install xx -S** 安装到 dependencies 中，生产环境
> **npm install xx --save-dev / npm install xx -D** 安装到 devDependencies 中，开发环境

> **npm i** 安装 package.json 中的依赖时，两部分的包都会 pull 下来
>> **npm i --prod <=> npm i --production**  // 仅会拉取dependencies中的依赖

>> 设置**NODE_DEV=production**时  // 效果同上，仅会拉取dependencies中的依赖 (注意等号两边没空格)
