---
title: windows 开发环境简单配置
date: 2020-11-08 16:34:12
description: windows 开发环境简单配置
tags:
  - Windows
---

买了台式机后，一直没有怎么用，今天正好得闲，花了点时间捣鼓了下，想配置成可以开发用的机器，奈何好久没有倒腾 `windows` 系统了，也花了不少的时间。

### 终端 - windows terminal

因为用惯了 `mac` 上的 `zsh`，一时间有点不能接受 `cmd` 的控制台，后来发现 windows 新增了一个 `power shell`，集成了 `cmd` 的功能，界面也比 `cmd` 好了一点（换了个蓝色背景？：|）所以又花了点时间搜索了下，发现了 `windows terminal`，集成了 `power shell` 和 `cmd`，还可通过配置文件定制主题和其它一些内容，还是很不错的。

### 包管理工具 - [chocolatey](https://www.chocolatey.org/)

这是一个包管理的软件，功能很强大，简直不能再省劲，之前安装 `node`，不对劲就需要自己去配置环境变量，而有了包管理工具，很多内容只需要一键安装就行了。不限于 `node`、`Git`这样的工具，还可以直接安装软件，然后统一进行管理。（建议安装 `chocolatey gui` 图形化管理软件，很直观方便）。`chocolatey`，彳亍！

> 安装

1. 在官网点击 `install` 进入下载页，赋值命令，在 `power shell`中执行
2. 安装成功后，输入命令安装其他。如：`choco install chocolateygui`

### Github ssh 配置

为了能直接通过 `ssh` 方式克隆项目，所以配置了下 `github` 的 `ssh`

> 犯傻过程

在 `cmd` 中去创建 `ssh`，应该在 `git bash` 终端中去执行

> 学习

`ssh -keygen -t rsa -C 'xxx@email.com'` 这里 -C 后边不一定非要是邮箱，只是一个注释信息，一般与 Git 账户保持一致是为了区分公钥被绑在那个 Git 账户上

输入该命令后一直回车即可，然后再 `.ssh` 问价夹中把 `.pub` 的内容复制到 `github` 中即可

> 尝试连接

`ssh -T git@github.com`
执行后配置全局信息后即可
`git config --global user.name 'xx'`
`git config --global user,email 'xx`

### node 全局脚本的执行

`git` 联通后，克隆了一个自己的博客项目（利用 `hexo` 搭建的静态博客）,在执行 `hexo` 的全局命令时报错，报错内容为 `在此系统上禁止运行脚本`

> 解决办法

1. 以管理员身份运行 power shell
2. 执行 `get-ExecutionPolicy`，显示 `Restricted，表示状态是禁止的`
3. 执行 `set-ExecutionPolicy RemoteSigned`
4. 再执行 `get-ExecutionPolicy`，就显示 `RemoteSigned`
5. 现在可以使用脚本了

`windows`！彳亍 了~

因为是前端开发，暂时先装这么多已经够用了，就这样也花费将近一下午的时间，后续安装后端依赖内容时，再补充。
