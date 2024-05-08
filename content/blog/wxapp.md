---
title: 企业微信小程序开发遇到的问题及解决方法
description: archives
tags: 
  - blog
date: 2021-09-28 21:01:39
---
## 前言

虽然实习的时候已经有了部分的小程序开发经验，但是针对不同的项目，不同的需求，需要解决的业务问题、实现的页面效果大不相同，以往的经验只能帮你解决一部分的问题，开发时实际的问题还是需要积累成新的经验

> 项目使用 taro 框架，选用的 react

## 业务相关问题

### 企业微信小程序开发

1. 系统 api： wx.qy.xx
2. 开发时开发工具需要安装【企业微信插件】

### 企业微信小程序在微信中打开时

虽然在微信管理后台可以设置不能在微信中搜索到企业微信的小程序，但是在互相绑定的时候，还是能在微信中打开（这个有点忘了怎么复现），所以还是需要处理下

直接在 wx.qy.login 前判断，比如判断 `Reflect.has(wx, 'qy')`，如果 false 直接跳转到缺醒页

```js
export const userLogin = () => {
    return new Promise<string>((resolve, reject) => {
        // 非企业微信显示
        if (Reflect.has(wx, 'qy')) {
            wx.qy.login({
                success: ({ code }: { code: string }) => {
                    if (code) return resolve(code);
                    return reject();
                },
            });
        } else {
            redirectTo({ url: '/pages/xx/index' });
        }
    });
};
```

### 登录身份判断跳转

场景：新用户需要在激活页面 a 激活，老用户直接进入常规页面 b

**方法一**：直接进入 b 页面，然后检测用户身份再 redirectTo 到 a 页面

缺点：页面会跳转一次，使用不友好

**方法二**：增加一个前置页面 c，在前置页面判断状态，在请求数据的时候，页面 loading 显示，请求结果返回判断后，再跳入 a 或 b 页面

缺点：又多了一层（不过好像也没什么）

### 登录页面密码输入的显隐切换

input 组件本身没有支持这种场景，需要自己实现，切换密码显隐的 icon 也需要自己处理。主要是靠 input 组件中的 `password` 属性和 `type` 属性配合使用来实现。

**方案**：

1. 一个变量记录密码的显隐状态
2. 默认不显示密码，`password` 属性置为 `true`，`type` 属性置为 `undefeated`
3. 当显示密码时，`password` 属性为 `false`，`type` 属性为 `text`
4. 图标跟随显隐状态切换

> 注意：这个方案有个明显的缺点，切换显隐后会丢失光标，暂时没有好的解决方法 -.-

```js

const [showPass, setShowPass] = useState<boolean>(false)

<Input
    value={values.newPassword}
    password={!showPass}
    type={showPass ? 'text' : undefined}
    placeholder='请输入密码'
    className={styles.input}
    placeholderClass={styles.placeholder}
    onInput={e => handleChange('newPassword', e.detail.value)}
/>
{showPass ? (
    <Image className={styles.eyes} src={eyes} onClick={() => setShowPassword(false)} />
) : (
    <Image className={styles.eyes} src={eyesClosed} onClick={() => setShowPassword(true)} />
)}

```

### 帮助中心的设计

一般项目中都有说明性的页面，协议、说明等，这类的内容容易发生变化，需要经常修改上线，常见有几种实现形式

1. 一个静态 html 和编辑的后台，在后台编辑变动，发布后在页面显示，页面通过小程序的 web-view 显示
2. 固定格式的内容，以 json 格式存储在后端，前端调用接口显示，因为是固定的格式，样式也按格式匹配
3. 直接写死在小程序中（最不灵活）

### 隐藏左上角主页按钮

> 。微信7.0.7版本起，当用户打开的小程序最底层页面是非首页时，默认展示“返回首页”按钮，开发者可在页面 onShow 中调用 hideHomeButton 进行隐藏。

```js
// 隐藏左上角主页按钮
useDidShow(() => {
    hideHomeButton();
});
```

### 自定义 navigation

```js
// 配置
{
    navigationStyle: 'custom',
}
```

自定义后往往需要自己实现一些样式，比如标题，back 的功能，这时如果定位就成了问题。

[Object wx.getMenuButtonBoundingClientRect()](https://developers.weixin.qq.com/miniprogram/dev/api/ui/menu/wx.getMenuButtonBoundingClientRect.html)

这里可以通过 `getMenuButtonBoundingClientRect` 方法拿到顶部胶囊的样式，使用其中的 `top` 值来定位

## 开发问题

### 图片的显示问题

[image 组件](https://developers.weixin.qq.com/miniprogram/dev/component/image.html?search-key=aspectfill)

小程序中的图片容易出现被压缩的情况，不过小程序原生的组件 Image 自带的属性解决了这个问题

**mode**

值 | 说明
---|---
aspectFit | 缩放模式，保持纵横比缩放图片，使图片的长边能完全显示出来。也就是说，可以完整地将图片显示出来。
widthFix  | 缩放模式，宽度不变，高度自动变化，保持原图宽高比不变
