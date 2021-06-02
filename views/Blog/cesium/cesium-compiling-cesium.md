---
title: 用源码编译Cesium for Unreal
date: 2021-05-28
author: 'ue001'
lang: 'zh-CN'
sidebar: 'auto'
categories:
 - Blog
 - Cesium
---

官方教程翻译完了，可以写点Cesium for Unreal的学习经验了。这篇文章讲解如何用[Github源码](https://github.com/CesiumGS/cesium-unreal)编译Cesium for Unreal插件。Cesium for Unreal插件可以从[Epic商店下载](https://www.unrealengine.com/marketplace/en-US/product/cesium-for-unreal)，不过版本不是最新的，官方大概两周左右更新一次。如果想体验最新的功能，可以从Github拉取最新源码，自行编译。
> 本文主要讲解在Windows环境下编译Cesium for Unreal，Mac和Linux环境请自行研究，碰到问题可以留言交流。

## 准备工作
* 安装[Visual Studio 2019](https://visualstudio.microsoft.com/vs/community/)
* 安装[CMake](https://cmake.org/download/)
* 安装[Git](https://git-scm.com/downloads)

> CMake是一款跨平台C++编译工具，Cesium for Unreal插件关联了[Cesium Native](https://github.com/CesiumGS/cesium-native)，该项目是3D Tiles和3D GIS工具库，需要用CMake编译。

## 拉取Github源码
创建一个新的虚幻工程，建议选Blank模板，No Starter Content：
![](https://i.loli.net/2021/05/28/4khviNUbeQ8I39H.png)
*创建工程*
![](https://i.loli.net/2021/05/28/L875ItdgTfaRQrS.png)
*选择空白模板*
![](https://i.loli.net/2021/05/28/l6hZPUrg9nsGBXC.png)
*取消初学者内容包*

打开项目所在的目录，在项目根目录创建Plugins目录，打开命令行，进入Plugins目录（虽然不区分大小写，但是其他目录比如Content都是首字母大写，所以保持一致吧），执行如下命令拉取Cesium for Unreal插件源码：
```
git clone --recursive https://github.com/CesiumGS/cesium-unreal.git
```

最终目录结构是这样子的：
![](https://i.loli.net/2021/05/28/JuIbnm5f2Wqp4lh.png)

由于种种原因，国内访问Github可能会很慢，或者根本无法访问，或者克隆到一半挂掉，可以在github.com后面添加.cnpmjs.org。github.com.cnpmjs.org同步了github的代码，国内速度杠杠的：
```
git clone --recursive https://github.com.cnpmjs.org/CesiumGS/cesium-unreal.git
```

如果首次克隆代码时忘记了**recursive**参数，可以先进入cesium-unreal目录，用如下命令克隆子模块
```
cd cesium-unreal
git submodule update --init --recursive
```

拉取代码过程中，有可能子模块拉取失败（网络问题），如果有**Failed**或者**Errors**这样的提示，说明有部分子模块没有拉取成功。可以用如下命令重新拉取子模块；github有代码更新时，也可以用下面的命令拉取代码，一定要带上**recurse-submodules**参数，否则子模块代码不会更新。
```
git pull --recurse-submodules
```

## 编译Cesium for Unreal源码
进入刚下载的Cesium for Unreal源码目录的extern目录，执行如下命令编译Cesium Native子模块：
```
cd cesium-unreal\extern
cmake -B build -S .
cmake --build build --config Release --target install
```

## 验证
重新启动刚创建的项目，如果工具栏上出现了Cesium图标，说明一切顺利，您可以开始Dark World之旅了。
![](https://i.loli.net/2021/05/28/CyV6u7gUinlz5vK.png)
*验证Cesium for Unreal*
![](https://i.loli.net/2021/05/28/xmO65cWV2ANQlrp.png)

写文章时，新版本改动了不少，比如废弃了FloatingPawn，用新的DynamicPawn替换了FloatingPawn，不过将来DynamicPawn又会被改名为CesiumFloatingPawn。具体可以看[Change Log](https://github.com/CesiumGS/cesium-unreal/blob/main/CHANGES.md)。

## 参考链接
* [Cesium for Unreal](https://github.com/CesiumGS/cesium-unreal)
* [Cesium Native](https://github.com/CesiumGS/cesium-native)
* [Cesium for Unreal开发指南](https://github.com/CesiumGS/cesium-unreal/blob/main/Documentation/development-guide.md)
* [Cesium for Unreal更改日志](https://github.com/CesiumGS/cesium-unreal/blob/main/CHANGES.md)

都看到这里了，加个技术交流群一起组队研究呗^^

![](https://i.loli.net/2021/05/09/HzUyekM3QNoblKv.png)
