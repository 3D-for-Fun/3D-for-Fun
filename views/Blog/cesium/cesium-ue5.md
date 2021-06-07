---
title: 在UE5中运行Cesium for Unreal
date: 2021-06-07
author: 'ue001'
lang: 'zh-CN'
sidebar: 'auto'
categories:
 - Blog
 - Cesium
---

之前有文章介绍[用源码编译Cesium for Unreal](./cesium-compiling-cesium.html)，这篇文章介绍如何在UE5抢先体验版中运行Cesium for Unreal。

## 准备工作
* 先阅读[用源码编译Cesium for Unreal](./cesium-compiling-cesium.html)
* 安装[UE5抢先体验版](https://www.unrealengine.com/zh-CN/unreal-engine-5)

## 修改并编译源码
如果您之前clone过源码，先用下面的命令拉取最新源码：
```
git pull --recurse-submodules
```
然后按照这个PR修改源码：[UE5 Compilation Support](https://github.com/CesiumGS/cesium-unreal/pull/469)
再进入**cesium-unreal\extern**目录编译Cesium Native子模块源码
```
cmake --build build --config Release --target install
```

## 创建新的UE5工程
创建新的UE5工程，将编译后的Cesium for Unreal插件复制到新工程Plugins目录，重启工程。启动时，会提示Cesium for Unreal插件是为UE4.26开发的，是否继续，点继续开始编译Cesium for Unreal插件。一切顺利的话，您将看到正在打开工程界面：
![](https://i.loli.net/2021/06/07/zt9uFMBReHW4gTq.jpg)
这是最终效果：
![](https://i.loli.net/2021/06/07/WtMer5f37mXpiNj.jpg)

## 参考链接
* [UE5 Compilation Support](https://github.com/CesiumGS/cesium-unreal/pull/469)

都看到这里了，加个技术交流群一起组队研究呗^^

![](https://i.loli.net/2021/05/09/HzUyekM3QNoblKv.png)
