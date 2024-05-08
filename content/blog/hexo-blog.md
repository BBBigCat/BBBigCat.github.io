---
title: hexo 博客搭建指北
description: archives
tags: 
  - blog
date: 2021-01-15 15:41:04
---

## 前言

使用 hexo 搭建一个自己的博客已经有了一段时间了，选择 hexo 主要是因为比较便利，可以直接部署在 github page 中，省去了其他的一些。不过这也有利有弊吧，这么做就不知道自己买服务器，买域名弄博客是怎么操作的了，不过这种等以后再弄吧。

因为研究的也不够深入，所以只介绍当时让自己觉得困惑的几个问题， hexo 使用的是  [cactus](https://github.com/probberechts/hexo-theme-cactus) 主题，所以介绍的内容只围绕这个主题。问题

1. 站点访问统计
2. 文章分类
3. seo 设置

> hexo 相关的基础搭建文章网上已经有很多了，而且我也是照着别人的文章搭建的，搭建过程这里就不再赘述了。

## 站点访问统计

首先来回顾下几个 hexo 的命令

`hexo clean` ：清除缓存（db.json）和静态文件（public）

`hexo generate` or `hexo g` ：生成静态文件

`hexo deploy` or `hexo d` ：发布

`hexo server` or `hexo s` ：启动本地服务

使用 cactus 主题比较方便的就是内置了一些分析工具的 jdk，比如百度统计，你需要做的就是去[百度统计](https://tongji.baidu.com/web/welcome/login)申请下，然后把**追踪 ID**加在 cactus 下的 `_config.yml` 中即可。cactus 主题还支持 google 统计

> 其他的方式其实也大致一致，就是自己去加 jdk，然后根据自己申请的 ID 去统计

## 文章分类

本来自己对这个分类是没有意识的，全部放在一起，但也是受限于 cactus 这个主题，主页显示的文章有限，想要查看所有的文章，只能在顶部的 tab 中加入新的目录，所以就需要对文章进行分类，让文章可以显示到对应的目录中。

解决的方法很简单，就是在每篇文档的顶部加上分类

```javascript
description: 目录名
```

然后还是在 cactus 的配置文件中添加目录即可

## SEO 设置

因为我们的静态博客是部署在 github 上的，而且 github 进制百度爬虫访问，导致静态博客无法被收录。但是百度提供了主动提交的接口，所以可以通过主动提交的方式来补救。

主动提交主要依赖了插件 [hexo-submit-urls-to-search-engine](https://github.com/cjh0613/hexo-submit-urls-to-search-engine)

> 在 [hexo-baidu-url-submit](https://github.com/huiwang/hexo-baidu-url-submit) 插件的 issues 中找到的。。。

插件提供的功能很直接简单，简单来说，就是自己去百度站点申请站长密钥，然后在 hexo 配置文件 `_config.yml` 中的 `deploy` 项加入设置，就可以在发布静态网页的时候主动推送资源

详细的实施步骤见 [hexo-submit-urls-to-search-engine 中文文档](https://cjh0613.com/20200603HexoSubmitUrlsToSearchEngine.html#%E5%BA%8F)，我这里只补充一点细节

首先是去申请站长的时候（百度站长）

1. 会要求补全信息（强行收集个人信息），包括手机号，qq 号和微信号
2. 输入自己的站点，就是 github page 的地址，这里有个地方一定要注意，github page 项目的名字一定要和 github 的名字一样，而且在 hexo 静态博客中，根目录一定要是 `/`，要保证输入 github page 的地址就直接可以访问到内容，比如 github 用户 xxx，他的 github page 项目是 xxx.github.io，对应的网址是 <https://jack.github.io，这样就可以了>
3. 验证网页。会提供三种方式验证，很简单
4. 成功后就可以去拿到 token 了

后续的按照插件文章的用法就可以了，主动提交的资源可能会有几天的延迟，就拭目以待效果吧。

> 2021-07-06 补充下后续，seo 失败了，还是需要一个域名，先还原了

## 最后

拥有自己的一个小站还是挺爽的，就像在星辰大海中有了一个自己的印记，虽然没有什么光亮，但是也会一直存在（应该不会删吧哈哈哈: ）
