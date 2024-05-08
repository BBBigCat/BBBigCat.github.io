---
title: about_git
date: 2019-09-01
description: archives
tags: 
  - blog
---
## git 学习

### git stash

> **git stash**
切换其他分支前保存到缓存区

> **git stash pop**
再次切回该分支后取出内容，并删除 stash 中的内容
  
> **git stash apply**
取出内容不删除 stash

> **git stash drop**
此时删除需要

> **git stash list**
查看缓存区所有数据

---

### 分支同步主干

（分支）**git checkout master**
（主干）**git pull**
（主干）**git checkout 分支**
（分支）**git merge master**
此时会出现 vim 格式的一个提示，要求输入同步主干的必要原因，可以忽略，按照 vim 的操作即可（:wq）
然后再执行 `git push`

---

### 查看 git 的提交历史

> **git log**
---

### 只显示 commitID 的提交历史

> **git log --pretty=oneline**
---

### 回退版本

[详细链接参考](https://www.cnblogs.com/lyy-2016/p/6509707.html)

> **git reset --hard HEAD^**
也可以把暂存区的修改回退到工作区
> **git reset HEAD 文件名**
> **如果已经 push 到了远端，需要使用强推进行覆盖**

> `git push --force-with-lease`
---

### 命令记录

> git reflog
---

### 撤销修改

> git checkout -- 文件名

两种情况：

1. 修改后还未 add 放到暂存区，撤销修改就回到和版本库一样的状态
2. 修改后已经添加到暂存区，又做了修改，撤销修改就回到添加到暂存区后的状态，丢弃工作区的修改
总之，就是让文件回到最近一次 git commit 或 git add 时的状态

---

### 查看分支合并图

> **git log --graph**
---

### 查看 commitID 简化后的分支合并图

> **git log --graph --pretty=oneline --abbrev-commit**
---

### 添加标签

在当前分支上
> **git tag v1.0**
对应 commit 上
> **git tag v1.0 commitId**
创建带有说明的标签
> **git tag -a v0.1 -m "version 0.1 released" commitId**
查看标签
> **git show tagName**

**删除标签**
> **git tag -d v1.0**

**推送到远程**
> **git push origin v1.0**
---

### rebase 后推送远端会报错，原因是合并后包含的 commit 不存在远端，要使用强推

[Git push rejected after feature branch rebase](https://stackoverflow.com/questions/8939977/git-push-rejected-after-feature-branch-rebase)
[解决git rebase操作后推送远端分支不成功的问题](https://blog.csdn.net/ManyPeng/article/details/81095744)

> `git push --force-with-lease`
>
> ##### git push 只执行快速合并，而 --force 选项所做的只是忽略远程分支的状态

---

### 推送远程时的问题

> 已存在远端
>
> 1. **给原远程重命名**
>
```JS
git remote rename origin old-origin
git git remote add origin xxx
```
>
> 2. **删除旧远程**
>
```js
git remote rm origin
git git remote add origin xxx
```

---

### GIT HUB comment mean

```
LGTM  —  looks good to me
ACK  —  acknowledgement, i.e. agreed/accepted change
NACK/NAK — negative acknowledgement, i.e. disagree with change and/or concept
RFC  —  request for comments, i.e. I think this is a good idea, lets discuss
WIP  —  work in progress, do not merge yet
AFAIK/AFAICT  —  as far as I know / can tell
IIRC  —  if I recall correctly
IANAL  — “ I am not a lawyer ”, but I smell licensing issues
```

---

### 关于创建新的分支时在工作区（add 前变化文件所在）和暂存区（add 后文件所在）

> git 在切换分支时会把未 add 或未 commit 的内容带过去
>> 因为 add 的内容不属于任何一个分支，未 commit 的内容也不属于任何一个分支，对于所有分支而言，工作区和暂存区是公共的。要想在分子间切换，又不想有上述的影响，用 `git stash`，注意，其他分支也可以用 `git stash pop` 从缓存区中取出内容。
