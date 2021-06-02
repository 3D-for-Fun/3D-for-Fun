---
title: Cesium for Unreal加载本地影像和地形
date: 2021-05-31
author: 'ue001'
lang: 'zh-CN'
sidebar: 'auto'
categories:
 - Blog
 - Cesium
---

之前有文章介绍[如何加载本地3D Tiles](./cesium-adding-local-data.html)，这篇文章介绍如何加载本地影像和地形数据。

## 准备工作
* 安装了虚幻引擎（至少4.26或更高版本）和**Cesium for Unreal**（1.2.1或者更高版本）。
* 安装最新的[Cesiumlab 2.3.8版本](http://www.cesiumlab.com/)
* 准备本地影像和地形数据（影像可以用Cesiumlab自带的工具下载天地图，地形数据可以到[地理空间数据云](http://www.gscloud.cn/)下载）
> 如果您才接触**Cesium for Unreal**，建议先学习[（一）Cesium for Unreal快速入门（译）](./cesium-unreal-quickstart.html)教程。

## 创建新的**Cesium for Unreal**关卡
由于本教程是从本地加载影像和地形，所以不用连接**Cesium ion**。创建新的空关卡，添加CesiumSunSky、FloatingPawn（新版本废弃了，建议用DynamicPawn）和空的Cesium3DTileset Actor。
![](https://i.loli.net/2021/06/02/KPpDBgTQYCanrsz.png)

## 加载本地地形
运行Cesiumlab，打开**分发服务**->**地形服务**，查看地形服务的url和经纬度范围，接下来会用到。
![](https://i.loli.net/2021/06/02/zfmwBig75ISUNGQ.png)
选中自动创建的**CesiumGeoreference**，将经纬度调整为地形数据所在的区域。比如本文下载的是地理空间数据云里的SRTMDEMUTM 90M高程数据，编号为1的，标识为utm_srtm_58_08，大概经纬度为：经度=107.052831，维度=22.01823。
![](https://i.loli.net/2021/06/02/KBOJmh6Qunv7UtD.png)
![](https://i.loli.net/2021/06/02/5WKqtJRkouhsEbG.png)
选中刚才创建的空白**Cesium3DTileset** Actor，Detail面板中修改Url为Cesiumlab里，地形服务的url，比如我这里为
```
http://localhost:9000/terrain/19c427c0c22b11ebbd3af738010b8f56/layer.json
```
这时界面就应该能看到白色的地形了：
![](https://i.loli.net/2021/06/02/cOKjV8CWnTI7MGF.png)

## 加载本地影像
**Cesium for Unreal**目前只支持TMS协议的影像数据，还好Cesiumlab 2.3.8版除了提供默认的WMTS标准，也新增了TMS标准。发布影像服务时，需要点击一下TMS按钮，记录地理范围和级别，接下来会用到：
![](https://i.loli.net/2021/06/02/WSO7BXgleEIxm5n.png)

选中**Cesium3DTileset** Actor，在Detail面板中点击**Add Component**按钮，搜索**Cesium**，选择**Cesium Tile Map Service Raster Overlay**：
![](https://i.loli.net/2021/06/02/4BDjiVoPXWuzgNb.png)

保持**CesiumTileMapServiceRasterOverlay**为选中状态，修改Url为之前记录的Cesiumlab里影像服务的TMS地址：
```
http://localhost:9000/image/tms/b4f29300b20c11ebb60c95cae837500b/tilemapresource.xml
````
这时，界面没反应，勾选**Specify Zoom Levels**，修改Min和Max Level为相应的级别：
![](https://i.loli.net/2021/06/02/tSE6OLorQuaGl3b.png)
拉高镜头，就能看到影像了：
![](https://i.loli.net/2021/06/02/1ejtSJvqrow2xO9.png)

如果界面是黑的，可以选中**CesiumSunSky**，调整时区和时间。

## 资源链接
* [UE加载CesiumLab处理的影像数据](https://www.bilibili.com/video/BV1Ew411Z7kx)
* [UE加载CesiumLab处理的地形数据](https://www.bilibili.com/video/BV1kv411V7vY)

都看到这里了，加个技术交流群一起组队研究呗^^

![](https://i.loli.net/2021/05/09/HzUyekM3QNoblKv.png)
