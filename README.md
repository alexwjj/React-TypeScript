<p align="center">
  <img width="120" src="https://alexwjj.github.io/img/logo.png">
</p>

<p align="center">
  <a href="https://alexwjj.github.io/study">
    <img src="https://img.shields.io/github/stars/alexwjj/react-ts" alt="react-ts">
  </a>
  <a href="https://react.docschina.org/">
    <img src="https://img.shields.io/badge/react-16.13.1-brightgreen" alt="react">
  </a>
  <a href="https://youzan.github.io/zent/zh/guides/install">
    <img src="https://img.shields.io/badge/zent-9.4.0-yellowgreen" alt="zent">
  </a>
</p>

![](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/3f46c5cabc554d65b48b3bc4a80ee9c4~tplv-k3u1fbpfcp-watermark.image)

# 个人学习项目

- 尝试各种技术
- 等项目搞复杂了，再搞搞优化
- 基础代码源于[MFinnnne/react-admin](https://github.com/MFinnnne/react-admin-server)
- 交流学习：[俊劫的个人博客](https://alexwjj.github.io/) 欢迎扫码加 V

## 技术栈

- React
- TypeScript
- Zent
- Antd
- 微服务 - qiankun (TODO)

## 启动

```js
yarn //安装依赖

yarn dev //启动

yarn build //打包
```

## 输出文章

### 1、[vue 转 react 不完全指北](https://juejin.cn/post/6953482028188860424) 已完成 2021-4-21

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/93320594dfea45bd955c28f074fe9733~tplv-k3u1fbpfcp-watermark.image)

### 2、[一名 vueCoder 总结的 React 基础](https://juejin.cn/post/6960556335092269063) 已完成 2021-5-10
![](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/2d96f20fe5b94c52ae7224e2df821b2d~tplv-k3u1fbpfcp-watermark.image)

### 3、[一篇够用的TypeScript总结](https://juejin.cn/post/6981728323051192357) 已完成 2021-7-6
![](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/e8c0a52167474efda5eeb47f8cdb1cbb~tplv-k3u1fbpfcp-watermark.image)

- react hooks Doing
- node bff 开发实战

## QA

### 1、项目无法启动，提示 craco 版本过低

删除本地 node_modules,重新安装

### 2、craco配置别名不生效

需要在tsconfig中也配置下，因为别名会经过ts编译


### 2022-06-15更新
 - 启动craco会报错，原因使用了cnpm i ，使用yarn安装即可解决，记得先删除包