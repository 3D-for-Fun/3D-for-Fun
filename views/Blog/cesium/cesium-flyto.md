---
title: （六）Cesium for Unreal在全球各地穿梭（译）
date: 2021-05-19
author: 'ue001'
lang: 'zh-CN'
sidebar: 'auto'
categories:
 - Blog
 - Cesium
---

> 原文请参考Cesium官方文档：[Transition Between Locations on the Globe](https://cesium.com/docs/tutorials/cesium-unreal-flyto/)

> 上一篇：[（五）Cesium for Unreal使用地理参考子关卡搭建全球场景（译）](./cesium-sublevels.html)

在本教程中，您将学习使用虚幻引擎蓝图在**Cesium for Unreal**全球的两个位置之间平滑地飞行。

![](https://i.loli.net/2021/05/20/WBnKqHDbZrAeC1m.gif)
*在悉尼和澳大利亚墨尔本之间穿梭*

您将学习如何：

* 在虚幻引擎中使用地图坐标
* 在各地创建视口
* 创建一个蓝图在各地穿梭

> 蓝图是虚幻引擎内部的基于节点接口的可视化脚本系统。尽管掌握一些编码知识很有用，但**蓝图**使非程序员也可以轻松地给应用程序添加逻辑。

## 准备工作
* 知道如何创建一个基于**Cesium for Unreal**的虚幻应用程序。请查阅[（一）Cesium for Unreal快速入门（译）](./cesium-unreal-quickstart.html)教程，以获取有关**Cesium for Unreal**插件的入门指南。

## 第一步：创建一个虚幻关卡
从**Cesium for Unreal**[示例](https://www.unrealengine.com/marketplace/en-US/product/cesium-samples)的**01_CesiumWorld**关卡开始。
> 译者注：可以考虑复制一份**01_CesiumWorld**关卡，打开复制的关卡，开始下面的操作。

1.    在**World Outliner**中选择**CesiumGeoreference** Actor，然后在**Details**面板中，查找**Origin Longitude**，**Origin Latitude**和**Origin Height**属性。将它们设置为起始位置的值。例如，要从澳大利亚悉尼开始，我们可以输入以下坐标：**Origin Longitude**= 151.206696，**Origin Latitude**= -33.871799，**Origin Height**= 3000.0。
    ![](https://i.loli.net/2021/05/19/YgETvfzoZwrPhaG.png)
2. 启用**Keep World Origin Near Camera**参数，这将确保我们在整个飞行过程中镜头保持正确的方向。

## 第二步：添加**FloatingPawn** Actor
> 当镜头在**Cesium**地球上各地之间飞行时，镜头应遵循与地球表面平行的弯曲路径，而不是线性的点对点轨迹。**FloatingPawn**可以用来实现这种功能。

1. 将**FloatingPawn**添加到场景中。如果您找不到它，请按照[此处](./cesium-unreal-quickstart.html#%E7%AC%AC%E4%B8%89%E6%AD%A5-%E6%B7%BB%E5%8A%A0sunsky%E7%85%A7%E6%98%8E%E5%92%8Cfloatingpawn)的说明进行操作。要定位到刚添加的**FloatingPawn**，请在**World Outliner**中双击其标签。这个Pawn看起来应该像这样：
    ![](https://i.loli.net/2021/05/20/his72ej3ABxE6FS.png)
    由于绑定了镜头，因此可以在编辑器右下角通过镜头预览场景。使用虚幻引擎中的平移和旋转控件调整**FloatingPawn**的初始位置和旋转角度。
2.    在**Details**面板中，搜索**possess**。选择**Auto Possess Player**旁边的下拉菜单，然后选择**Player 0**。
    ![](https://i.loli.net/2021/05/20/dJGNRUtfFr4YZ7X.png)
    现在在运行模式下，您将能够使用鼠标和键盘**WASD**键控制**FloatingPawn**了。
> 玩家**Player**是您在运行模式下控制的实体。您可以使用**Player**在场景中移动并执行其他操作。如果场景中有多个**Player**，您也可以在不同的**Player**之间切换。

## 第三步：在蓝图中设置穿梭功能
在此步骤中，您将创建一个蓝图函数，该函数让我们按下键盘上的按钮后，在地球上的两个位置之间飞行。

1. 点击虚幻引擎编辑器工具栏上的**Blueprints** -> **Open Level Blueprint**按钮，打开关卡蓝图。
    ![](https://i.loli.net/2021/05/20/izKRvdsw2nyjVgU.png)
2.    从**World Outliner**中，选择**FloatingPawn** Actor。将**FloatingPawn**拖放到关卡蓝图中的**Event Graph**中。从**FloatingPawn**节点拖出一根连线，然后查找**Inaccurate Fly to Location Longitude Latitude Height**节点。此函数是本教程的核心，让我们可以输入目的地。
    ![](https://i.loli.net/2021/05/20/YcyUAXTQbV1fj9W.png)
    如果想知道这个函数如何工作的，可以将鼠标悬停在这个函数的节点上查看详细说明。该函数的参数之一是**Can Interrupt By Moving**，它是该函数节点上的最后一个引脚。如果您希望能够使用WASD键在飞行中移动**Pawn**，则可以勾选参数旁边的复选框。
> 蓝图目前不支持双精度。之所以该函数称为**Inaccurate Fly to Location Longitude Latitude Height**，是因为为了将该函数暴露给**蓝图**（译者注：蓝图不支持双精度浮点数），所以它的输入参数使用了单精度而不是双精度来计算值。在**GlobeAwareDefaultPawn.h**头文件中，还有一个名为**FlyToLocationLongitudeLatitudeHeight**的函数，可在C++代码中用双精度计算。
3.    右键点击**Event Graph**中的空白区域，然后添加一个**Make Vector**节点。将目的地的经度、纬度和高度的值分别输入到X，Y和Z参数中。在本教程中，我们将飞往经度= 144.9631，纬度= -37.8136，高度= 2000的澳大利亚墨尔本。
    ![](https://i.loli.net/2021/05/20/2QChuvpxfydLZHR.png)
4. 要触发穿梭功能，请添加一个键盘事件，并将其输出引脚连接到**Inaccurate Fly to Location Longitude Latitude Height**节点的输入引脚。下面的示例使用F键。
    ![](https://i.loli.net/2021/05/20/gZBlWUX17pM9z48.png)
5. 点击编辑器工具栏左上角的**Compile**按钮，编译新添加的节点。
    要检查所有设置是否正确，请返回主编辑器。点击顶部工具栏上的**Play**按钮。初始视图应该与我们之前通过**Floating Pawn**的镜头预览看到的视图相同。按键盘上的F键（或你选择的任意键）以查看飞行情况。
    镜头将以相对较直的路径非常快速地在悉尼和墨尔本之间移动。在下一步中，您将设置一些变量以自定义整个穿梭过程中**FloatingPawn**的速度和高度。

## 第四步：自定义穿梭
在这一步中，我们将调整**FloatingPawn** Actor的一些参数，以自定义pawn如何穿梭到目的地。第一个任务是添加一些**Fly To Curves**。

> **Fly To Curves**是**UCurveFloat** Actor，用于在计算**Pawn**从起始位置到达结束位置所经过的路径时，给**Inaccurate Fly to Location Longitude Latitude Height**提供输入参数。

在创建**Fly To Curves**时，我们有如下考虑：

* **Pawn**从起始位置拉升其高度，拉远镜头，然后移动到目标位置，然后再拉近镜头。此行为由**Fly To Altitude Profile Curve**控制。该曲线必须在两个轴上都保持在0到1的范围内。
* 根据垂直移动距离，**Pawn**需要保持在最大高度范围内。例如，如果**Pawn**升高12,000公里，那么我们将最大高度设置为3,000公里。如果升高18公里，最大海拔高度要小得多，为9.3公里。我们通过**Fly To Maximum Altitude Curve**来实现此行为。
* 为了让速度随着时间变化，我们需要使用**Fly To Progress Curve**。这里x是时间，y是曲线上的位置。

### 设置**Fly To Curves**

1. 右键单击**Content Browser**中的任意位置，然后选择**Miscellaneous —> Curve —> CurveFloat**。点击**Select**并为其命名。双击新创建的曲线以导航到**Curve Editor**。您应该在y = 0处看到一条直线：
    ![](https://i.loli.net/2021/05/20/tiXKZdq21yOhcYf.png)
2. 右键单击曲线，然后选择**Add Key**以创建新的控制点。在曲线上添加三个控制点，使其看起来如下所示：
    ![](https://i.loli.net/2021/05/20/RYgsb3iPWLpyIu9.png)
3. 同时选择所有三个关键点，并从顶部工具面板中点击**cubic interpolation**三次曲线插值，还有**toggle weighted tangents for cubic interpolation modes**：
    ![](https://i.loli.net/2021/05/20/pHzlKvhY4B3WSQ2.png)
4. 通过选择关键点并移动其手柄来修改曲线的形状。最终得到一条在x轴上从-1到1，在y轴上从0到1的曲线：
    ![](https://i.loli.net/2021/05/20/LtlZnVBHquiNfmy.png)
5. 按照上述步骤，设置其余曲线，即**Fly to Maximum Altitude Curve**和**Fly to Progress Curve**。以下是其余曲线的曲线选项和最终结果：
    ![](https://i.loli.net/2021/05/20/vfG8KeyO5QxniSF.png)
    *Fly to Maximum Altitude Curve曲线形状和曲线选项*
    ![](https://i.loli.net/2021/05/20/kAZRuCT2yVnOwa4.png)
    *Fly to Progress Curve曲线形状和曲线选项*

6. 对曲线的形状满意后，将它们设置到我们前面添加的**FloatingPawn** Actor的**Details**面板中的相应属性上。
    ![](https://i.loli.net/2021/05/20/ilQG7pb1zdM9KWH.png)
7. 导航回到主编辑器，然后点击**Play**。再次按F键启动飞行。请注意仔细观察**Pawn**是如何先快速上升到一定高度，然后缓慢地飞到目的地，然后迅速降落到最终位置的。
    ![](https://i.loli.net/2021/05/20/WBnKqHDbZrAeC1m.gif)
8. 您也可以通过在**Details**面板中的**Fly to Curve**参数下的**Fly to Duration**参数来修改跳跃速度。该值确定跳跃需要多长时间，因此该值越高，跳跃就越慢。

## 第五步：飞往**geo-markers地理标记**
输入起点和终点WGS84坐标来指定飞跃并不总是很方便。在某些情况下，可以通过放置**geo-markers地理标记**来避免这种情况。这些标记可以用来表示目标位置，能直接放置在Cesium地球上。

1.    首先，只需将立方体放置在地球上的任何地方，这便是您的目标地理标记。如果需要，请右键单击该对象，然后单击**Snap Object To View**以将目标地理标记与编辑器镜头的当前位置和方向完全一致。到目前为止，您应该非常熟悉在世界范围内移动编辑器镜头并[放置对象](./cesium-placing-objects.html)。如果您在[子关卡](./cesium-sublevels.html)教程之后尝试本教程，请确保将立方体添加到**Persistent Level**。
    ![](https://i.loli.net/2021/05/20/YovLnuiX4NF5S8f.jpg)
    *在此示例中，将立方体设置为悬停在波士顿上方*

2.    将立方体的移动性设置为**Movable**。
    ![](https://i.loli.net/2021/05/20/xCXKrbaN42PBksn.jpg)

3.    将**CesiumGeoreferenceComponent**添加到立方体中，此组件将帮助提供和维护此立方体的全球定位功能。要了解有关在**Cesium for Unreal**中地理绑定的更多信息，请参见[此处](./cesium-placing-objects.html)。
    ![](https://i.loli.net/2021/05/20/sUmnpdfeOHlw3yE.jpg)

4.    现在，再次打开**关卡蓝图**。在**Event Graph**中为键盘**G**键添加一个新的键盘事件。
    ![](https://i.loli.net/2021/05/20/mM6FSdqOtQaLJog.jpg)

5.    和之前一样，将**FloatingPawn**拖拽到Graph中。这次，从**FloatingPawn**拉出连线，然后搜索**Inaccurate Fly to Location ECEF**节点。将执行引脚从键盘G事件连接到**Inaccurate Fly to Location ECEF**节点的执行引脚。
    ![](https://i.loli.net/2021/05/20/ulO1przbjPsUwKi.jpg)

6.    将立方体和默认的**CesiumGeoreference**从**World Outliner**拖到**关卡蓝图**中。
    ![](https://i.loli.net/2021/05/20/hBNfYpVbj21H7RG.jpg)

7.    从**CesiumGeoreference**节点拉出连线，然后搜索**Inaccurate Transform Ue to Ecef**节点。从立方体拉出连线，搜索**GetActorLocation**函数。将立方体的虚幻坐标连接到**Inaccurate Transform Ue to Ecef**。将这个函数的输出连接到**Inaccurate Transform Ue to Ecef**。
    ![](https://i.loli.net/2021/05/20/pZwQzhL15bIRUnJ.jpg)

8.    点击**Play**，然后按**G**键尝试一下。通过修改**Inaccurate Transform Ue to Ecef**中的**Yaw**和**Pitch**属性，可以根据自己的喜好调整终点镜头的方向。为了能够通过手动移动**Pawn**来取消正在进行的跳跃，请勾选**Can Interrupt By Moving**复选框。
    ![](https://i.loli.net/2021/05/20/SYn1voFxqmtU4Wk.gif)
    *FloatingPawn从丹佛飞往波士顿*
    ![](https://i.loli.net/2021/05/20/MmVU2vN4Eh79lT6.jpg)

## 下一步
继续阅读[使用Cesium for Unreal构建航班轨迹](./cesium-flight-tracker.html)教程。

都看到这里了，加个技术交流群一起组队研究呗^^

![](https://i.loli.net/2021/05/09/HzUyekM3QNoblKv.png)
