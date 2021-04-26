---
title: （三）使用自定义控制器（译）
date: 2021-04-20
author: 'ue001'
lang: 'zh-CN'
sidebar: 'auto'
categories:
 - Blog
 - Cesium
---

> 原文请参考Cesium官方文档：[Using Custom Controllers](https://cesium.com/docs/tutorials/cesium-unreal-030-custom-controllers/)

<iframe src="//player.bilibili.com/player.html?aid=757679498&bvid=BV1i64y1m7kt&cid=325738995&page=1" width="800" height="450" scrolling="no" border="0" frameborder="no" framespacing="0" allowfullscreen="true"> </iframe>

在本教程中，您将学习如何设置除了**Cesium FloatingPawn**以外的控制器，以及如何基于导入的倾斜摄影模型创建一个关卡。
![](https://i.loli.net/2021/04/25/kLNZXdeF4wvYQ2T.jpg)

您将学会如何：

* 导入虚幻引擎自带内容包
* 设置关卡的游戏模式（Game Mode）
* 在**Cesium 3D Tileset**上使用基于物理的控制器
* 在运行模式切换人物控制器
* 优化关卡设置以获得流畅的用户体验

## 准备工作
* 知道如何创建基于**Cesium for Unreal**的项目（请参考[（一）Cesium for Unreal快速入门（译）](./cesium-unreal-quickstart.html)了解如何快速上手**Cesium for Unreal**）。
* 知道如何从**Cesium ion**导入倾斜摄影模型（请参考[（二）添加倾斜摄影模型（译）](./cesium-photogrammetry.html)了解如何添加倾斜摄影模型）。

## 第一步：设置关卡和倾斜摄影模型
要么从**Cesium for Unreal**[示例](https://www.unrealengine.com/marketplace/en-US/product/cesium-samples)中的01_CesiumWorld开始本教程，要么参考[（一）Cesium for Unreal快速入门（译）](./cesium-unreal-quickstart.html)，使用**Cesium World Terrain**和**Cesium SunSky**创建一个新的关卡。

1. 该关卡将使用科罗拉多州丹佛市的高分辨率倾斜摄影模型。打开**Cesium ion**面板，然后单击**Add**按钮。搜索您的**ion**资产，找到**Aerometrex Denver**，然后单击**Add to Level**按钮。
![](https://i.loli.net/2021/04/25/7uxbjDy3vldr2iE.png)
> 如果资产列表中没有**Aerometrex Denver**，访问[科罗拉多州丹佛市倾斜摄影模型资产仓库页面](https://cesium.com/ion/assetdepot/354307)，然后单击添加到我的资产。然后返回虚幻引擎，关闭**Cesium ion**面板，然后再次单击**Cesium**面板上的**Add**按钮以重新打开并刷新资产列表。

2. 有两种设置世界原点参考坐标的方法。如果您记得住经纬度，则可以直接进行设置：在**世界大纲视图**中选择CesiumGeoreference角色，然后在**细节**面板中，找到原点经度**Origin Longitude**，原点维度**Origin Latitude**和原点高度**Origin Height**属性。将它们设置为以下坐标让镜头转到丹佛：原点经度= -104.999689，原点纬度= 39.752827，原点高度= 1570.879421

![](https://i.loli.net/2021/04/25/OAM2wEvSqlIraG7.png)
*新的世界原点参考坐标*

另外，您也可以在**世界大纲视图**中双击Aerometrex Denver。这会将场景镜头视角切换到倾斜摄影模型的位置。然后您可以继续移动镜头到您想要的位置，然后在**世界大纲视图**面板中点击**CesiumGeoreference-1**，再点击**Place Georeference Origin Here**按钮设置世界原点参考坐标。

3. 您会看到**Cesium World Terrain**和科罗拉多州丹佛市倾斜摄影模型交错重叠了。
![](https://i.loli.net/2021/04/25/pgMjwiRNtIcUBTz.png)
在**世界大纲视图**中，选中Aerometrex Denver，并将Z位置设置为600.0。这会让其上移，以使**Cesium World Terrain**和倾斜摄影模型不再重叠。
![](https://i.loli.net/2021/04/25/SPfBIAGR5zJTOyw.png)

## 第二步：导入第三人称角色
> 在**Cesium for Unreal**[示例](https://www.unrealengine.com/marketplace/en-US/product/cesium-samples)中已经包含了**ThirdPersonCharacter**和ThirdPersonGameMode。如果您使用的是示例项目，则可以跳过这一步。示例代码中的第三人称角色**ThirdPersonCharacter**，可以在CesiumSamples/Maps/03/ThirdPersonController目录中找到。

1. 在**内容浏览器**窗口中，选择绿色的**添加/导入**按钮。然后，在出现的菜单顶部选择**添加功能或内容包**。
![](https://i.loli.net/2021/04/25/tkzxblHT7LFoQAp.png)

2. 将出现一个新窗口，将内容添加到项目中。对于本教程，需要导入**第三人称游戏**模板：选择**第三人称游戏**，然后选择绿色的**添加到项目**按钮。可以任意导入其他模板，或构建自己的模板。
![](https://i.loli.net/2021/04/25/Cwgnxet5MBU8J6h.png)
导入此内容后，项目的内容文件夹增加了四个新的文件夹：Geometry，Mannequin，ThirdPerson和ThirdPersonBP。可以根据需要移动这些文件夹。

## 第三步：在世界上放置一个角色控制器
在这一步中，您将学习如何将Pawn放置在世界中。如果希望在开始游戏时生成Pawn，则可以选择将**PlayerStart** Actor放置在关卡中，并将**World Settings**面板中的**GameMode**更改为所需的游戏模式。

1. 在**放置actor**面板中，搜索**ThirdPersonCharacter**。将此Actor拖放到场景中。在**世界大纲视图**中双击**ThirdPersonCharacter**，或者按键盘**F**键，让刚刚创建的第三人称角色获得焦点。
![](https://i.loli.net/2021/04/25/G1sq94oXUzutxac.png)

> 有时，**ThirdPersonCharacter**可能不会出现在**放置actor**面板中。如果发生这种情况，请通过**内容浏览器**找到这个Actor。如果使用示例项目，则这个Actor在CesiumSamples/Maps/03/ThirdPersonController目录。否则，导入**第三人称游戏**模板后的默认位置为ThirdPersonBP/Blueprints。

2. 当**ThirdPersonCharacter**处于选中状态时，在**细节**面板中，找到**变换**分组。单击**位置**旁边的黄色箭头让位置归零。
![](https://i.loli.net/2021/04/25/PdUv4qOFiYG1ZbK.png)

为了在运行模式，让玩家面向正确的方向，请将第三个旋转值设置为220.0。此时**ThirdPersonCharacter**应该面向联合车站。

3. 在**细节**面板中，搜索**possess**。选择**自动控制玩家**旁边的下拉菜单，然后选择**玩家0**。
![](https://i.loli.net/2021/04/25/jcxglW17XINweVR.png)

当您进入运行模式时，您可以使用鼠标和WASD键或手持游戏控制器来控制**ThirdPersonCharacter**。

> 如果您此时运行关卡，您会注意到Actor在丹佛倾斜摄影模型完全加载之前可能会往下掉落。请继续阅读以了解如何解决此问题。因此，还建议您在当前未与之交互的任何物理对象上禁用物理特性。

## 第四步：设置安全的开始位置
由于3D Tiles分片包含相当多的数据，并将被流式传输到虚幻引擎，因此可能需要一些时间才能完全加载。这可能会对立即开始模拟的Actor造成问题，例如刚添加的第三人称角色。在此步骤中，您将在倾斜摄影模型下面放置一些几何体，以确保角色安全出生。

1. 在**放置actor**面板中，拖拽一个立方体到世界场景中。
2. 重置立方体的位置，并将比例设置为4.0、4.0、0.5。
![](https://i.loli.net/2021/04/25/lkB9ULMVastHZp4.png)
3. 使用平移装置，将立方体沿Z轴向下移动，直到它几乎完全隐藏在地面下，或者将Z位置设置为-130.0。
![](https://i.loli.net/2021/04/25/Sr5WtT3xUhezqLG.png)
4. 点击**运行**。现在，在加载世界时，**ThirdPersonCharacter**应该保持在原地。

> 只要您不更改CesiumGeoreference的原点，将角色放置在一个关卡中就是安全的。现在更改CesiumGeoreference的原点，将导致所有这些Actors移动到新的原点。在接下来的两个教程中，您将了解为什么会发生这种情况，以及如何安全地对所有放置的资产进行经纬度绑定以绕过此限制。

## 第五步：设置载具控制器
1. 请仿照第二步的步骤导入**高级载具类游戏**模板。
![](https://i.loli.net/2021/04/26/extN9l1SzH5X6Eh.png)

2. 将**VehicleAdvBP/Blueprints**目录中的**VehicleBlueprint**拖到场景中。将其放在**ThirdPersonCharacter**前面的街道上。
![](https://i.loli.net/2021/04/26/gXIEhSTPB2ROYxl.png)

3. 创建另一个立方体作为**VehicleBlueprint**出生的平台。将其放置在**VehicleBlueprint**所在的倾斜摄影模型下。

4. 与**ThirdPersonCharacter**不同，此Pawn不会被自动控制。取而代之的是，您将使用一个简单的**蓝图**，在运行时动态切换**ThirdPersonCharacter**和**VehicleBlueprint**。点击工具栏的**蓝图**->**打开关卡蓝图**按钮。
![](https://i.loli.net/2021/04/26/spuHdErkS6Yweix.png)

5. 从**世界大纲视图**中，将**VehicleBlueprint**和**ThirdPersonCharacter** Actor拖放到**关卡蓝图**中的**事件图表**中。您将在**事件图表**中看到为每个Actor创建的节点。

6. 右键点击**事件图表**中的空白区域，打开用于添加节点的菜单。搜索**键盘 C**以找到C键盘事件。单击它创建一个键盘事件。
![](https://i.loli.net/2021/04/26/e8bxghifEqXMtdT.png)

7. 从键盘事件节点的**Released**端口拖出一根线在画布的空白处释放鼠标。在出现的菜单中取消勾选**Context Sensitive**，搜索**Un Possess**，点击该节点添加到画布。
![](https://i.loli.net/2021/04/26/GzqOuplxfjnAQvX.png)

8. 添加一个**Possess**节点和一个**Get Player Controller**节点。如下图所示将它们连接起来。
![](https://i.loli.net/2021/04/26/gX2Ok7sq41a5yPL.png)

9. 键盘C键会将控制切换到第三人称角色**ThirdPersonCharacter**。连接**ThirdPersonCharacter**到**Possess**节点的**In pawn**输入端口。
![](https://i.loli.net/2021/04/26/FxB8RyctJQ6jgvU.png)

10. 框选刚才创建的所有节点，按键盘Ctrl+C键复制，Ctrl+V粘贴到空白区域，选中刚创建的键盘事件节点，在**Detail**面板中将**Input Key**改为**V**。
![](https://i.loli.net/2021/04/26/4iWOFtXmPDkUYQL.png)

11. 将键盘V键绑定到复制的事件节点后，用**VehicleBlueprint**节点替换**Possess**节点的**In pawn**端口。
![](https://i.loli.net/2021/04/26/jt1nprhNoSFbxyz.png)

12. 点击工具栏的**Compile**和**Save**按钮。现在，如果运行关卡，你就可以用键盘**V**键切换到小车**VehicleBlueprint**；键盘**C**键切换到第三人称角色**ThirdPersonCharacter**。

13. 您会注意到，如果您开着小车离开，然后再切换回第三人称角色，则由于地图瓦片被销毁，汽车可能会往下掉。如果启用了视锥体裁剪**Frustrum Culling**，则当您的视线从小车移开时，也会发生这种情况。不控制小车时，您需要禁用小车的物理特性。返回**关卡蓝图**中，创建一个新的**Set Simulate Physics**节点。

> 要了解有关视锥体裁剪**Frustrum Culling**的更多信息，请访问下一个《在地球上放置对象》的教程。本教程稍后还将对此进行解释。

14. 将**ThirdPersonCharacter**的**Possess**节点和**Set Simulate Physics**节点连接起来。复制**VehicleBlueprint**节点，并将其连接到**Set Simulate Physics**节点的**Target**输入端口。蓝图编辑器将自动创建一个转换节点，以获取**VehicleBlueprint**的网格体。

15. 确保将**Set Simulate Physics**节点上的**Simulate**属性为false。
![](https://i.loli.net/2021/04/26/9C3otvdwlJBQmNr.png)

16. 复制并粘贴刚刚新建的节点，并将这些节点连接到键盘V事件上。这次，确保将**Set Simulate Physics**节点上的**Simulate**属性设置为true。
![](https://i.loli.net/2021/04/26/sBEXRmoIjeDxnvJ.png)

17. 点击**Play**，小车将始终停留在你离开的位置。

## 第六步：优化关卡运行时的性能
在此步骤中，您将调整两个可用的设置，以确保流畅的用户体验。虽然您将需要根据性能需求来决定项目的最佳设置，但是您将了解这些设置以及它们的优缺点。

1. 选中**Aerometrex Denver Photogrammetry** Actor，在**Details**面板中找到**Cesium**分组。展开**Level of Detail**以显示**Maximum Screen Space Error**设置。
![](https://i.loli.net/2021/04/26/4xMzkeL2qB57b1J.png)

2. **Maximum Screen Space Error**设置使您可以控制3D Tileset的细节级别。较高的数字表示较低的详细程度和较好的性能。默认值为16。尝试将其降低到2，您会看到更高清的图像，但是场景需要更长的时间才能完全加载。
![](https://i.loli.net/2021/04/26/eCyTStL3MbcHopA.png)

3. 在关卡运行时，您可能会注意到看不见的切片会停止渲染，并且当您转身时可能需要一些时间才能再次加载。打开**Details**面板的**Tile Culling**分组，就可以找到启用视锥体裁剪**Enable Frustrum Culling**的选项。 
![](https://i.loli.net/2021/04/26/XhYTL82lUJEOIi4.png)

禁用此设置将确保您在转动镜头时不再销毁3D Tiles切片。但是，您可能会注意到，禁用此设置后，3D Tiles的整体质量可能会下降。

## 下一步
阅读下一个教程**将对象放置在地球上**，以了解有关在虚幻关卡中将对象放置在Cesium中的更多信息。


都看到这里了，加个技术交流群一起组队研究呗^^

![](./images/barcode.png)
