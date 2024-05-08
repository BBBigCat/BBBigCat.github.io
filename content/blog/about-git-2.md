---
title: about_git_2
date: 2020-11-07 11:45:44
description: archives
tags: 
  - blog
---
### 常用的简化指令

`gp =  git push`

`gl = git pull`

`gco = git checkout`

`gst = git status`

`ga = git add`

`gm = git merge`

`gsta = git stash`

`gstp = git stash pop`

### git stash
>
> `git stash save -u 'xx'`
以 xx 的命名将内容保存至缓存区，`-u` 属性意思是可以可以保存未监听内容，即新加内容

#### git 中的钩子

[git 钩子](https://git-scm.com/book/zh/v2/%E8%87%AA%E5%AE%9A%E4%B9%89-Git-Git-%E9%92%A9%E5%AD%90)

[如何在 git commit 时添加 eslint 校验](https://segmentfault.com/a/1190000016357480)

> 和其他版本控制系统一样，git 能在特定的动作发生时触发自定义脚本。有两组这样的钩子：
>> 客户端：客户端钩子由诸如提交和合并这样的操作所调用
>
>>服务端：服务端钩子作用于诸如接受被推送的提交这样的联网操作
>
>钩子都被存储再 git 目录下的 hooks 子目录中。即绝大部分项目中的 .git/hooks

### pre-commit

`pre-commit` 钩子在提交信息前运行，它用于检测即将提交内容的快照，可以用 `git commit -no-verify(-n)` 来跳过这个环节

### 分支删除

`git branch -d xx` 删除分支，有没有提交的内容时会报错，`git branch -D xx` 强制删除

### 合并冲突时检查到底是哪些文件发生了合并冲突

`git ls-files -s` 解决完冲突再手动 add commit push

### 本地项目与远端项目建立联系

（在 git 或 gitlab 中创建新项目后也会有教程）
[参考连接](https://blog.csdn.net/u012145252/article/details/80628451)

> 场景：本地已经建立项目，这时远端创建完，需要与远端建立联系

不同与直接从远端克隆，可以直接执行 gl 命令拉取代码，本地在执行 git init 后，分支默认是 master，而此时远端的分支是 origin/master

需要进行的操作：

1. 添加远端

`git remote add origin xx(远端地址)`

2. 将本地分支和远端分支建立联系

`git branch --set-upstream-to=origin/master(branch) master(localbranch)`

3. 执行 gl

此时会报错: `fatal: refusing to merge unrelated histories`，这个问题的原因主要是本地仓库和远端的仓库是两个独立的仓库，如果 clone 的方式在本地建立就不会有这个问题，这时需要执行

`git pull --allow-unrelated-history` 增加 `--allow—unrelated-history` 选项来解决，这个选项可以合并两个独立启动仓库的历史，执行后发现进行了 merge 操作，此时完成连接，可以进行 push 操作。（git pull 基本就是 git fetch 和 git merge 命令的组合体）。

### git clone 几种可选参数的使用和区别

[参考链接](https://blog.csdn.net/shrimpcolo/article/details/80164741)

> 思考这个问题是因为从 GitHub 上 clone 项目的时候，会花费很多的时间，因为一个开源项目，包含了所有的分支和 git 历史记录。但是如果我只希望查看最新代码，不关心历史信息，又不想采用下载 zip 包的方式，那么应该如何快速的拉取项项目呢？

**clone** 时的几种情况

1. 全克隆
2. 单一克隆
3. 深克隆

#### 全克隆

`git clone git_project_url`，这里有一个问题，当 clone 的仓库很大时，而 `GitHub` 又是比较慢的克隆速度，导致等待的时间比较长。

`git clone` 最后的结果是切换当前的 `master` 分支，同时也获得了 `remote` 的所有分支记录信息

所以全克隆的好处是全部分支一次性都在本地，要切换非常方便，坏处是消耗时间长，占用很大的磁盘空间

#### 单一克隆

既然 `git clone` 默认的是下载全部分支内容，如果只需要某个分支时改如何操作

**`single-branch`**

`git clone` 后面可以携带这个参数 `--single-branch`

`git clone -b local --single-branch git@github.com:xx/xx.git`

此时 `branch` 的分支就是只有 `local` 分支，所以项目很大时，可以使用此命令，缺点是看不到其他分支

#### 深度克隆

只想克隆仓库最近的 xx 次提交

要完成这样的目的，需要使用 `--depth=commit_num` 或者 `--depth commit_num`

`git clone --depth=10 https://github.com/xx/xx.git`

但是实际下载的速度还是慢，空间变得更大

所以可以结合单一克隆

`git clone -b local --single-branch --depth 3 https://github.com/xx/xx.git`

### git 的一些问题

#### git 本身对大小写不敏感

注意到这个问题是因为一次修改文件名大小写后提交，`git` 会认为文件没有变化，实际上本地多出一个修改完大小写的文件夹（不可见）
> 如何开启 `git` 大小写敏感
>
> 检查是否开启（默认 false 不开启）`git config --get core.ignorecase`
>
>设置开启 `git config core.ignorecase true`

这个时候可用 `git mv` 去修改文件名（简单点先删除，提交；再添加，提交，比较保险）

> 注：这里不建议设置 `git` 为大小写敏感，因为 `windows`、`mac` 的系统对大小写不敏感，只有 `linux` 系统对大小写敏感

#### git 中的 CRLF LF 问题

[理解 CRLF LF](https://www.jianshu.com/p/ec9564fe1c2b)

[git配置中的CRLF、LF、CR](https://www.jianshu.com/p/3e7b11606721)

> 问题起因，项目中的字体丢失，后来发现字体文件 .ttf 在 gitlab 和 本地 md5 后的结果不一样，怀疑是字体文件被改变（可能在 docker 中运行过？）

后来发现是文本的换行格式被改变了

**基本**

- CRLF：Cariage-Return Line-Feed 的缩写，意思是回车换行，即 /r/n
- LF：Line-Feed 的缩写，意思是换行，即 \n;
- CR： Carriage-Return 的缩写，回车，即 \r
