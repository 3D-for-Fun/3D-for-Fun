---
title: （八）Cesium for Unreal添加本地数据（译）
date: 2021-05-25
author: 'ue001'
lang: 'zh-CN'
sidebar: 'auto'
categories:
 - Blog
 - Cesium
---

> 原文请参考Cesium官方文档：[Adding Local Data](https://cesium.com/docs/tutorials/cesium-unreal-adding-local-data/)

> 上一篇：[（七）Cesium for Unreal创建航班追踪器（译）](./cesium-flight-tracker.html)

在本教程中，您将学习如何使用**Cesium for Unreal**将**3D Tileset**从本地目录加载到项目中。

## 准备工作
* 安装了虚幻引擎（至少4.26或更高版本）和**Cesium for Unreal**插件。
* 知道如何使用**Cesium for Unreal**插件在虚幻引擎中创建关卡。
> 您还是Cesium新手？请先学习[（一）Cesium for Unreal快速入门（译）](./cesium-unreal-quickstart.html)教程。

## 设置关卡
您可以从[Cesium for Unreal示例代码](https://www.unrealengine.com/marketplace/en-US/product/cesium-samples)的01_CesiumWorld关卡开始本教程。您也可以创建一个新关卡，至少需要添加**CesiumSunSky**和**FloatingPawn** Actor。
![](https://i.loli.net/2021/05/26/TNi9OMxyhSa5twd.png)
*Cesium for Unreal示例的01_CesiumWorld关卡*
> 译者注：其实应该再加一个**CesiumWorld Terrain**，否则界面一片空白，没有卫星图片、地形，添加的本地**3D Tileset**也处于悬空状态。

## 从本地目录添加3D Tileset
在这个章节，您将用3D Tileset添加一些不同高度的立方体。可以在[此处](https://cesiumjs.s3.amazonaws.com/downloads/unreal-learning-content/Tileset.zip)下载3D Tileset。确保下载整个Tileset文件夹，其中包括tileset.json文件以及所有引用的**b3dm**文件。您也可以使用自己的**3D Tileset**文件。

> 如果您还是头一次听说3D Tiles文件格式，请查看[3D Tiles规范](https://github.com/CesiumGS/3d-tiles)以了解更多信息。

1. 在编辑器左侧的**Cesium**面板中，点击**Add Blank**按钮。这步操作将往场景中添加一个新的、空白的**Cesium3DTileset** Actor。
![](https://i.loli.net/2021/05/26/3Vgt1mbnwyrMokB.png)

在**World Outliner**中选择**Cesium3DTileset** Actor，并将其重命名为**LocalTileset**。

2. 在**Details**面板中，找到**Cesium**类别。通常，要从[Cesium ion](https://cesium.com/platform/cesium-ion/)中加载数据，您需要填写**Ion Asset ID**和**Ion Access Token**属性。要加载本地数据，您将用**3D Tileset**顶层**tileset.json**文件的路径填写**Url**字段。在本地文件系统中找到**3D Tileset**数据。例如，如果目录为**C:\Users\username\document\Unreal Projects\CesiumForUnrealSamples\Data\Tileset\tileset.json**，则需要将**Url**设置为**file:///C:/Users/username/document/Unreal Projects/CesiumForUnrealSamples/Data/Tileset/tileset.json**。请注意file后面的3个斜杠。
![](https://i.loli.net/2021/05/26/9Hob7hJ1GTlaUjS.png)
> 译者注：路径或者文件名不要有空格，否则会出现莫名其妙的问题。
> 另外也可以将**3D Tiles**资源发布在Web服务器上，通过HTTP的方式访问，比如**http://127.0.0.1:8080/test/tileset.json**

在**World Outliner**中，双击**LocalTileset** Actor，让该Actor在编辑器主窗口中居中显示。地球和刚添加的资产的方向可能不对，如下所示：
![](https://i.loli.net/2021/05/26/mpjzTYJ9qf58cUN.png)

这是因为**LocalTileset** Actor离**CesiumGeoreference** Actor的原点太远了导致的。

> 译者注：如果没用本教程提供的**3D Tileset**，而是用了自己的本地**3D Tileset**，有可能这个**3D Tileset**所处的地方正好是晚上，界面一片漆黑，可以调整**SunSky**的时间，具体可以参考[（二）添加倾斜摄影模型（译）](./cesium-photogrammetry.html)教程。

3. 保持**LocalTileset** Actor在编辑器窗口中居中显示，在**World Outliner**中选择**CesiumGeoreference** Actor，然后找到**Place Georeference Origin Here**按钮。单击此按钮可以重新设定世界原点。
![](https://i.loli.net/2021/05/26/jnZBepr82GbFSuw.png)

4. 在**Details**面板中调整LocalTileset的位置**Location**，将其放置在需要的地方。例如，要将**3D Tileset**贴在地形上，请将**Location**的Z坐标更改为7400。
![](https://i.loli.net/2021/05/26/YhnVXmU8cf91v6k.png)

> 目前**Cesium for Unreal**不支持加载本地**quantized-mesh**地形文件。但是，可以从任何服务器（包括本机**localhost**）加载地形资产。要完全离线加载地形资产，请考虑设置本机**localhost**地形服务。可以使用与上述相同的步骤，用**http://localhost:portNumber/terrainAsset**设置**Url**属性。

> 译者注：译者还没有成功加载过本地地形和影像资源，有大神知道如何加载的话，请留言告知，不胜感激！

## 资源链接
* [3D Tiles规格](https://github.com/CesiumGS/3d-tiles)
* 虚幻市场上的[Cesium for Unreal示例](https://www.unrealengine.com/marketplace/en-US/product/cesium-samples)
* [Cesium for Unreal快速入门教程](./cesium-unreal-quickstart.html)
* [上传数据到Cesium ion指南](https://cesium.com/docs/tutorials/uploading/)

都看到这里了，加个技术交流群一起组队研究呗^^

![](https://i.loli.net/2021/05/09/HzUyekM3QNoblKv.png)
