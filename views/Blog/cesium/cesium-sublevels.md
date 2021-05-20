---
title: （五）Cesium for Unreal使用地理参考子关卡搭建全球场景（译）
date: 2021-05-11
author: 'ue001'
lang: 'zh-CN'
sidebar: 'auto'
categories:
 - Blog
 - Cesium
---

> 原文请参考Cesium官方文档：[Building Global Scenes with Georeferenced Sublevels](https://cesium.com/docs/tutorials/cesium-unreal-050-sublevels/)

> 上一篇：[（四）Cesium for Unreal将对象放置在地球上（译）](./cesium-placing-objects.html)

本教程将介绍如何在世界各地搭建多个地理参考子关卡，并能在子关卡之间无缝切换（在镜头进入子关卡范围时自动加载子关卡，镜头离开子关卡范围时自动卸载子关卡）。您将参观丹佛、波士顿、大峡谷以及任何您选择的其他地方。在每个子关卡中，您可以用以往创建游戏场景一样的套路，构建任何您想要的场景。
![](https://i.loli.net/2021/05/16/KeanJ9yjg4wSObN.gif)
*在世界各地创建子关卡，然后无缝探索它们*

## 准备工作
* 知道如何创建**Cesium for Unreal**应用程序。如果您不熟悉**Cesium for Unreal**，请先查阅[（一）Cesium for Unreal快速入门（译）](./cesium-unreal-quickstart.html)，以了解如何安装**Cesium for Unreal**，将其与**Cesium ion**连接，并创建一个简单的地球。
* 一个**Cesium ion**帐户，用于将现实数据流式传输到虚幻引擎中。
* 按顺序读完以前的**Cesium for Unreal**入门教程。尤其要彻底读懂[（四）Cesium for Unreal将对象放置在地球上（译）](./cesium-placing-objects.html)。

## 简介
到目前为止，这些教程已经涵盖了在**Cesium for Unreal**中构建项目和探索3D Tiles tileset的几种方法。但是，到目前为止，您仅限于一次仅围绕地球上一个位置构建虚幻场景。到目前为止，此中心位置已经由**CesiumGeoreference** Actor确定了，您可能已经在**World Outliner**中看到过。更准确地说，**CesiumGeoreference**的工作是将这个**中心位置**放在虚幻引擎的原点上。随着您离这个原点越来越远，事情将会变得越来越怪异。用于确定重力的向下方向将变得不正确，物理特性将变得不稳定，并且虚幻引擎对象的位置将开始变得不精确。

但地理参考Actor突破了这些限制，比如3D tilesets、FloatingPawn和带有**CesiumGeoreferenceComponent**组件的Actor。
尽管对于3D贴图集，FloatingPawn和具有CesiumGeoreferenceComponent的actor等地理参考对象不存在这些限制（在[此处](./cesium-placing-objects.html#地理参考对象遵循不同的规则)了解地理参考对象的更多信息），一旦您离原点足够远，许多虚幻引擎自带的功能会变得不正常，比如内置的物理引擎、SunSky系统和对象放置。

本教程的目的是介绍一种克服这些问题的方法。创建地理参考子关卡，可让我们为每个子关卡指定特定的**中心位置**。然后，每个子关卡都可以支持您在虚幻引擎中习惯的所有元素，包括物理、植被和游戏逻辑。学习完本教程后，您将能够：

* 创建一个持久的全球关卡
* 将几个本地子关卡放入持久关卡中
* 使用典型的虚幻工作流向每个子关卡填充资产和游戏逻辑
* 在子关卡之间无缝地飞行以及探索持久关卡
* 始终注意陷阱

## 第一步：创建一个世界组合项目
设置地理参考子关卡需要一些额外的准备步骤，这些步骤在[（一）Cesium for Unreal快速入门（译）](./cesium-unreal-quickstart.html)教程中没有介绍。

1. 首先，创建一个完全为空的新项目，并删除World Outliner中显示的所有默认Actor。
    ![](https://i.loli.net/2021/05/11/RxtjdCnMLTZiauF.png)

2. 在**Content Browser**中，**Content**文件夹中创建一个名为**World**的文件夹。将空关卡保存在此文件夹中，并将其命名为**Globe**。这将作为持久关卡，它将代表整个地球。

3. 在工具栏中点击**Settings**图标，然后单击**World Settings**。
    ![](https://i.loli.net/2021/05/11/KE7hAu56GyNVLMl.png)


4. 搜索**Enable World Composition**选项，启用该选项。
    ![](https://i.loli.net/2021/05/11/BtuKEmf6c3jZ987.png)

5. 还是在**World Settings**中，搜索**Enable World Bounds Check**，并将其禁用。在**Cesium for Unreal**的全球世界中，物体可能会移动很远的距离。禁用**Enable World Bounds Check**可确保虚幻引擎不会删除远离原点的对象。
    ![](https://i.loli.net/2021/05/12/y2VfNU7GsZMehwP.png)

6. 点击菜单**Window**->**Levels**，打开关卡面板
    ![](https://i.loli.net/2021/05/12/bgjKWwFOZR5Tyd9.png)

7. 接下来，在关卡面板中，单击**Summon World Composition**
    ![](https://i.loli.net/2021/05/12/kmEOzYiSHIZfCg4.png)

8. 在刚刚打开的**World Composition**窗口中，创建一个禁用**Streaming Distance**的新图层（**CesiumGeoreference**将决定何时加载子关卡）。将新层命名为**CesiumLayer**。
    ![](https://i.loli.net/2021/05/12/RoeOJ62L1Um9aph.png)

> 如果您不小心启用了**Streaming Distance**，则必须创建一个新图层。当前，一旦创建了图层，就无法修改它的设置。

9. 要完成项目的设置，请确保您已在虚幻引擎中登录**Cesium ion**。如果不知道如何执行此操作，请阅读[此处](./cesium-unreal-quickstart.html#%E7%AC%AC%E4%BA%94%E6%AD%A5-%E8%BF%9E%E6%8E%A5%E5%88%B0cesium-ion)。
    ![](https://i.loli.net/2021/05/12/1rHIhb5EeSTp4NM.png)

## 第二步：设置持久全局关卡
如果到目前为止，您已经按顺序学习了**Cesium for Unreal**的入门教程，那么这一步的内容您应该很熟悉了。如果发生任何意外或混乱的情况，请按照提供的链接获取更详细的说明。

1. 现在您已经完成了项目的设置，并且已经登录了**Cesium ion**，现在该用来自**Cesium ion**的真实全球数据填充持久全局关卡了。首先将**Cesium World Terrain With Bing Aerial Imagery**添加到场景中，这是带有卫星影像的全球地形。如果不知道如何执行此操作，请[在此处](./cesium-unreal-quickstart.html#%E7%AC%AC%E5%85%AD%E6%AD%A5-%E5%88%9B%E5%BB%BA%E4%B8%80%E4%B8%AA%E5%9C%B0%E7%90%83)快速阅读有关如何导入真实世界地形的信息。
    ![](https://i.loli.net/2021/05/13/38gVaFK5wfR9hUl.jpg)

2. 由于该关卡还没有光照，因此将**CesiumSunSky** Actor添加到场景中。如果找不到正确的Actor，或者屏幕显示为全白，请按照[此处](./cesium-unreal-quickstart.html#%E7%AC%AC%E4%B8%89%E6%AD%A5-%E6%B7%BB%E5%8A%A0sunsky%E7%85%A7%E6%98%8E%E5%92%8Cfloatingpawn)的说明进行操作。将**CesiumSunSky**添加到场景中并启用**extended luminance range**设置后，您应该能够看到在美丽的蓝天下风景如画的丹佛山麓。
    ![](https://i.loli.net/2021/05/13/6IdFAiTJ2uaE5Z4.jpg)

3. 该**CesiumSunSky**还没有绑定**CesiumGeoreference** Actor，这可能最终会导致奇怪的光照问题。要解决此问题，请在**World Outliner**中找到默认的**CesiumGeoreference** Actor，然后导航至**Details**面板。在**Cesium Sun Sky**分组下，将**Sun Sky**属性设置为在上一步中添加到场景中的**CesiumSunSky** Actor。
    ![](https://i.loli.net/2021/05/13/fCoHA2PdySlE9vB.png)

4. 为了在更具体的实际位置开始建立子关卡，请导入**Aerometrex Denver Photogrammetry**和**Nearmap Boston Photogrammetry**倾斜摄影数据。请查看[导入倾斜摄影模型](./cesium-photogrammetry.html#%E7%AC%AC%E4%BA%8C%E6%AD%A5-%E4%BB%8Ecesium-ion%E6%B7%BB%E5%8A%A0%E5%A2%A8%E5%B0%94%E6%9C%AC%E5%80%BE%E6%96%9C%E6%91%84%E5%BD%B1%E6%A8%A1%E5%9E%8B)教程，了解如何从**Cesium ion**中搜索和添加3D Tileset。您可以在**World Outliner**中双击3D Tilesets，以将编辑器镜头跳转到tileset的位置。
    ![](https://i.loli.net/2021/05/13/38gVaFK5wfR9hUl.jpg)
    *丹佛倾斜摄影3D瓦片集*
    ![](https://i.loli.net/2021/05/15/CkaAeiuZHUXwGSd.jpg)
    *波士顿倾斜摄影3D瓦片集*

    > 如果在资产列表中找不到丹佛和波士顿倾斜摄影3D瓦片集，请跳转到[Cesium ion资产仓库](https://cesium.com/ion/assetdepot)页面，找到对应的倾斜摄影3D瓦片集，然后点击添加按钮添加到**我的资产列表**。然后返回虚幻引擎，关闭**Cesium ion Assets**面板，然后再次单击**Cesium**面板上的**Add**按钮以重新打开并刷新资产列表。

5. 为了在全球飞行而不至于迷失方向，请将**FloatingPawn** Actor添加到场景中，然后在**Details**面板中将**Auto Possess Player**设置为**Player 0**。该Pawn在围绕地球飞行时会调整其方向，以始终保持适当的向上方向。如果找不到**FloatingPawn** Actor，请阅读[此处](./cesium-unreal-quickstart.html#%E7%AC%AC%E4%B8%89%E6%AD%A5-%E6%B7%BB%E5%8A%A0sunsky%E7%85%A7%E6%98%8E%E5%92%8Cfloatingpawn)。
    ![](https://i.loli.net/2021/05/15/mhQyJiqCwdSzTKv.jpg)

## 第三步：设置地理参考子关卡
1. 准备开始创建第一个地理参考子关卡。首先，将编辑器镜头移动到您想构建第一个子关卡的位置。可以通过调整编辑器镜头的速度并在编辑器中直接飞到想要到的地方或双击要访问的倾斜摄影瓦片集来完成。如果您已经知道想要设置的**WGS84**坐标，则可以直接在**CesiumGeoreference**的详细信息面板中输入此坐标。在本教程中，我们将在**World Outliner**中双击Aerometrex丹佛倾斜摄影瓦片集，快速移动到那里。您可以自由选择第一个子关卡的任何位置。
    ![](https://i.loli.net/2021/05/15/ApfTatZ9QRiwx4q.jpg)

> 在地球上飞行或传送后，地球在编辑器窗口中是不是倾斜或者颠倒了？在**CesiumGeoreference**的细节面板中，点击**Place Georeference Origin Here**按钮，将当前编辑镜头的位置作为新的中心位置。但是请一定要小心，在没有对场景中的虚幻对象进行经纬度绑定之前，点击这个按钮的话，这些对象会被重新定位，从而跑到非预期的地方。有关地理参考和对象放置的更全面概述，请查看[（四）Cesium for Unreal将对象放置在地球上（译）](./cesium-placing-objects.html)教程。

2. 既然您已经到了想要去的地方，那么将编辑器镜头移动到想要创建子关卡的地方，然后再次点击**Place Georeference Origin Here**按钮。在本教程中，我们将飞往丹佛市中心的摩天大楼屋顶。
    ![](https://i.loli.net/2021/05/15/VCFUEbkS4af5Omx.jpg)

3. 接下来，返回**Levels**面板，并创建一个新的子关卡。在**World**文件夹中创建一个名字为**Sublevels**的文件夹，然后将新关卡保存到该文件夹​​中。
    ![](https://i.loli.net/2021/05/15/wxvNryPCkS5AR43.png)
    *创建新的子关卡*
    ![](https://i.loli.net/2021/05/15/gOHvzX2G6qCS3As.png)
    *在**World**文件夹中创建**Sublevels**文件夹*
    ![](https://i.loli.net/2021/05/15/A1mklnhgxwJ9f7K.png)
    *保存子关卡在**Sublevels**文件夹中*

4. 在**Levels**面板中，双击新的子关卡以加载它。然后，右键单击子关卡，点击**Assign to Layer**菜单项，然后选择**CesiumLayer**（或者是在步骤1.8中自定义的关卡图层名）。
    ![](https://i.loli.net/2021/05/16/VAhgo4HJCSj3KQf.png)

    > 如果将子关卡添加到了未禁用**Streaming Distance**的图层，在运行模式您可能会注意到该子关卡偶尔在很远的地方也会出现。如果您碰到了这种情况，请检查是否所有子关卡都已正确放置在自定义关卡图层中了，并检查是否已禁用**Streaming Distance**。

5. 此时，子关卡创建好了，并且中心位置也已经在**CesiumGeoreference** Actor中设置好了。要对子关卡进行地理定位（即将子关卡定位在地球上），请转到CesiumGeoreference actor的**Details**面板，然后点击**Check for New Sublevels**按钮。
    ![](https://i.loli.net/2021/05/16/cr37KuxZCoFEWQf.jpg)
    *点击**Check for New Sublevels**对子关卡进行地理定位*
    ![](https://i.loli.net/2021/05/16/y3TnrsFHEiXOmwf.jpg)
    *一旦子关卡成功设置了地理定位，你应该能够看到一个新的条目添加到了**Cesium Sublevels**数组中*

6. 现在，您应该看到一个蓝色的线框球体。球体的中心就在子关卡的**中心位置**（即地理参考点），它的半径由**Cesium Sublevels**数组中对应条目的**Load Radius**属性决定。该球体决定了为了加载该子关卡，玩家镜头必须进入的区域。您可以根据实际需要随意缩放**Load Radius**。
    ![](https://i.loli.net/2021/05/16/XMPO3nJ7Z1pQHIj.jpg)

## 第四步：小心陷阱
> 在使用地理参考子关卡时遇到任何问题，请随时查阅这些陷阱。

搭建地理参考子关卡和在普通虚幻引擎关卡中一样容易，但是在开始好玩的旅程之前，需要注意一些潜在的陷阱：

* 在构建子关卡时，应避免更改**CesiumGeoreference**的世界坐标原点。最好的情况下，它将引起令人讨厌的子关卡位置混乱的问题，可以通过输入对应的**Current Level Index**或点击**Jump To Current Level**来解决。最糟糕的是，最近添加的对象的位置完全不对了。
* 要注意，不要随意更改或删除**CesiumGeoreference** Actor中的**Cesium Sublevels**中的子关卡地理参考数据。这样做将导致以前放置在该子关卡中的资产不再显示在其最初放置的位置。
* 要检查最近放置的资产是否已正确添加到子关卡，请在**Levels**面板中切换子关卡旁边的可见性图标。隐藏关卡时，资产应消失。如果发现不小心将大量资产放置到了持久全局关卡，而不是子关卡中，请选择所有放错位置的资产，在**Levels**面板中右键单击所需的子关卡，然后单击**Move Selected Actors to Level**。特别要注意植被，因为植被往往会将其自身添加到与其所在的网格体相同的关卡上，这通常就是持久全局关卡。
* 注意不要将已经设置了地理参考的对象添加到地理参考子关卡中。特别是，请勿将**Cesium 3D Tileset** Actor，**FloatingPawn**或其他任何将具有**CesiumGeoreferenceComponent**组件的Actor添加到地理参考子关卡中。应该只将它们放在持久全局关卡上。地理参考子关卡的目的，就是提供了一种无法像上[一个教程](/cesium-placing-objects.html#%E5%9C%B0%E7%90%86%E5%8F%82%E8%80%83%E5%AF%B9%E8%B1%A1%E9%81%B5%E5%BE%AA%E4%B8%8D%E5%90%8C%E7%9A%84%E8%A7%84%E5%88%99)中给资产添加地理参考的替代方法。

## 第五步：构建地理参考子关卡
1. 通过在**Levels**面板中双击子关卡，确保将其加载并设置为当前关卡。在此示例中，我们在丹佛大楼的屋顶上添加了一些道具和第三人称控制器。随意添加自己的角色、车辆、植被、物理对象和游戏逻辑。请参阅[（三）Cesium for Unreal使用自定义控制器（译）](./cesium-custom-controllers.html)教程以获取一些启发。
    ![](https://i.loli.net/2021/05/16/ltoQIbuFxrwvXGR.jpg)
    *在屋顶上搭建了一个简单的虚幻场景*
    ![](https://i.loli.net/2021/05/16/DuMyxAsCePpbGg5.jpg)
    *使用您自己的任何角色或车辆探索现实世界的数据*

2. 点击**Play**按钮，然后尝试将**FloatingPawn**一直飞行到太空中，然后再次尝试找到您的子关卡，您可能需要一张地图！
    ![](https://i.loli.net/2021/05/16/Di4gbRQJKMPSckh.gif)


## 第六步：创建多个子关卡
仅当您构建多个子关卡时，地理参考子关卡的真正用途才能体现出来。

1. 保存当前的子关卡并开始构建一个新的子关卡。再次检查所有想要的资产是否在正确的子关卡中。如果发现任何资产处于错误的关卡，请根据需要在各个关卡之间移动资产。按**Ctrl + Shift + S**键保存子关卡和永久全局关卡。现在，右键单击**Levels**面板中的子关卡，然后选择**Unload**。
    > 译者注：这一步非常重要，否则在创建下一个子关卡时，点击**CesiumGeoreference** Actor的**Place Georeference Origin Here**按钮后，之前的子关卡的资产会被重新定位，导致上一个关卡里的资产需要重新设置位置，上一个关卡也就废了。译者就是没有**Unload**上一个子关卡，被困扰了很久。

    ![](https://i.loli.net/2021/05/16/l7Ofs1aKbhWGJkC.jpg)
    > 在编辑器中操作时，一次只能加载一个地理参考子关卡。如果同时加载并显示具有不同地理参考的多个子关卡，则它们将在编辑器中错乱地显示。这在运行时不是问题。

2. 现在，根据需要重复[步骤3](./cesium-sublevels.html#%E7%AC%AC%E4%B8%89%E6%AD%A5-%E8%AE%BE%E7%BD%AE%E5%9C%B0%E7%90%86%E5%8F%82%E8%80%83%E5%AD%90%E5%85%B3%E5%8D%A1)的各个部分，以构建下一个子关卡。请记住将所有子关卡保存在**Content/World/Sublevels/**文件夹中。同样，您可以随时随地随意构建这些子关卡。我们在波士顿的一个足球场上创建了下一个子关卡。
    ![](https://i.loli.net/2021/05/16/Xv2nGYS5RHtBihZ.jpg)
    *一个简单的场景，上面有草、树、角色、车辆和两个立方体的球门柱*
    ![](https://i.loli.net/2021/05/16/vmetDUn8MVyEoOg.gif)
    *在运行模式下，您可以再次看到整个世界都是可探索的。可以通过飞到子关卡所在的地方访问您创建的任何子关卡*

3. 您可以随意创建更多的子关卡。熟悉所涉及的步骤，并记下常见的错误，以免再次犯错。如果需要，可以在大峡谷中创建最后一个子关卡。与往常一样，请确保先正确保存和卸载上一个关卡。然后，将**CesiumGeoreference** Actor的原点设置为以下坐标：（经度：-112.118392，纬度：36.056595，高度：2200）。在此处，转到要构建子关卡的特定位置，按在此处点击**Place Georeference Origin Here**，然后以正常的方式构建新的子关卡。
    ![](https://i.loli.net/2021/05/16/CXniGzwEpB8URYm.jpg)
    *构建子关卡的另一个简单示例*
    ![](https://i.loli.net/2021/05/16/OEZAYeilGbm3JBa.gif)
    *在下一个教程中，将学习如何使用FloatingPawn的fly-to功能*

## 下一步
在**Cesium for Unreal**提供的全球范围内，漫无目的地飞来飞去很容易迷失方向。幸运的是，使用**Cesium for Unreal**内置的地理参考系统，不仅可以轻松确定您在地球上的位置，而且可以朝特定的目标位置移动。当使用**FloatingPawn**的**fly-to**功能时，这会变得非常容易。请查看本系列的下一篇教程，以了解如何在全球位置之间移动。


都看到这里了，加个技术交流群一起组队研究呗^^

![](https://i.loli.net/2021/05/09/HzUyekM3QNoblKv.png)
