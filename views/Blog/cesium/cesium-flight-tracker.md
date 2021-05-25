---
title: （七）Cesium for Unreal构建航班轨迹（译）
date: 2021-05-23
author: 'ue001'
lang: 'zh-CN'
sidebar: 'auto'
categories:
 - Blog
 - Cesium
---

> 原文请参考Cesium官方文档：[Build a Flight Tracker with Cesium for Unreal](https://cesium.com/docs/tutorials/cesium-unreal-flight-tracker/)

> 上一篇：[（六）Cesium for Unreal在全球各地穿梭（译）](./cesium-flyto.html)

本教程将向您展示如何用可视化的方式查看从旧金山到哥本哈根的航班。

![](https://i.loli.net/2021/05/23/YUmgzK2awIZ4RPk.gif)
*飞越美国加利福尼亚州旧金山*

您将学习如何：

* 将真实的航班数据导入虚幻引擎
* 用数据和[USplineComponent](https://docs.unrealengine.com/en-US/API/Runtime/Engine/Components/USplineComponent/index.html)创建航班路线
* 导入飞机模型并使飞机跟随航班轨迹
* 在飞行中切换镜头视角

## 准备工作
* 安装虚幻引擎（至少4.26或更高版本）。有关如何安装虚幻引擎的说明，请查阅[虚幻引擎下载页面](https://www.unrealengine.com/zh-CN/download)和[安装虚幻引擎](https://docs.unrealengine.com/zh-CN/Basics/InstallingUnrealEngine/index.html)指南。
* 安装Visual Studio 2019
* 知道如何构建基本的**Cesium for Unreal**应用程序。查看[Cesium for Unreal快速入门指南](./cesium-unreal-quickstart.html)，以获取有关Cesium for Unreal插件的入门指南。

## 第一步：创建虚幻关卡
您可以从虚幻引擎市场上下载的[Cesium for Unreal Samples](https://www.unrealengine.com/marketplace/zh-CN/product/cesium-samples)的**01_CesiumWorld**关卡开始，也可以创建一个新关卡。如果用新的关卡，请确保关卡中至少有**CesiumWorld Terrain**和一些灯光（使用**CesiumSunSky**或您自己的自定义灯光）。查看[快速入门指南](./cesium-unreal-quickstart.html)，了解如何使用**Cesium for Unreal**创建新的关卡。

对于本教程，**CesiumGeoreference** Actor的**Origin Longitude**， **Origin Latitude**和**Origin Height**属性值分别设置为-122.390533、37.61779和0.0，这是航班始发地旧金山国际机场（SFO）的坐标。

## 第二步：添加**PlaneTrack**类
**PlaneTrack**类将包含处理航班数据的逻辑，还能生成代表航班轨迹的样条线上的点。

1. 点击虚幻编辑器左上角的菜单**File -> New C ++ Class**添加一个新的C++类。选择**Actor**作为父类。点击**File -> Open Visual Studio**，在Visual Studio中打开项目。
![](https://i.loli.net/2021/05/23/x5RsDhOfUy42tNd.png)

可以在Visual Studio项目的Source文件夹中找到新创建的C++文件。
![](https://i.loli.net/2021/05/23/n97JN3brXuMHavA.png)

2. 将以下代码片段添加到项目**Build.cs**文件中，该文件也可以在**Source**文件夹中找到：
```C++
// 添加Cesium for Unreal插件依赖
PrivateDependencyModuleNames.AddRange(new string[] { "CesiumRuntime" });

// 告诉虚幻引擎使用C++17
CppStandard = CppStandardVersion.Cpp17;
```
![](https://i.loli.net/2021/05/23/qjeQA5RxcwBmUkT.png)

3. 在**PlaneTrack**类中添加一些成员变量，以存储航班数据和样条曲线，并将数据转换为适当的坐标系对应的坐标。导入必要的头文件，并将以下public变量添加到**PlaneTrack.h**头文件中：
```C++
...
// 添加头文件引用。确保在PlaneTrack.generated.h代码之前（否则会导致编译错误）
#include "Components/SplineComponent.h"
#include "CesiumGeoreference.h"
#include "Engine/DataTable.h"
...

public: 
  // 代表航班轨迹的样条线成员变量
  UPROPERTY(BlueprintReadOnly, Category = "FlightTracker")
    USplineComponent* SplineTrack;

  // Cesium工具类，包含很多有用的坐标转换相关的函数
  UPROPERTY(EditAnywhere, Category = "FlightTracker")
    ACesiumGeoreference* CesiumGeoreference;

  // 用于保存航班数据的虚幻引擎数据表
  UPROPERTY(EditAnywhere, Category = "FlightTracker")
    UDataTable* AircraftsRawDataTable;
```
4. 打开**PlaneTrack.cpp**文件，在**PlaneTrack**构造函数中初始化**SplineTrack**成员变量：
```C++
APlaneTrack::APlaneTrack()
{
  // 让该Actor每帧都执行Tick()方法，如果需要可以设置成false以提高性能
  PrimaryActorTick.bCanEverTick = true;

  // 初始化轨迹
  SplineTrack = CreateDefaultSubobject<USplineComponent>(TEXT("SplineTrack"));
  // 让样条线在运行模式下可见
  SplineTrack->SetDrawDebug(true);
  // 设置样条线的颜色
  SplineTrack->SetUnselectedSplineSegmentColor(FLinearColor(1.f, 0.f, 0.f));
  // 设置样条线的粗细或者宽度
  SplineTrack->ScaleVisualizationWidth = 70.f;                           
}
```
**ACesiumGeoreference**和**UDataTable**成员变量将在虚幻引擎编辑器中初始化。

在继续下一步之前，请编译代码。在**虚幻引擎编辑器**中，单击顶部工具栏上的**Compile**按钮：
![](https://i.loli.net/2021/05/23/6YZzy5m9q7iXlAh.png)

如果代码没有问题，您将在虚幻引擎主编辑器的右下角看到**Compile Complete**的消息。在本教程中，编译代码指的就是这个步骤。

## 第三步：导入真实的航班数据
接下来，您将使用从旧金山到哥本哈根的真实航班数据。该数据由[FlightRadar24](https://cesium.com/blog/2020/08/13/flightradar24/)收集。在**Cesium for Unreal**中的高度，是相对于WGS84椭球的，以米为单位。这里对数据进行了预处理，将高度单位从相对于平均海平面的英尺，换算成了相对于椭球的米。您可以在[此处](https://cesiumjs.s3.amazonaws.com/downloads/SFO_to_CPH_flight_data_WGS84.csv)下载转换后的数据。
![](https://i.loli.net/2021/05/23/krygWZS2RlM6OJj.png)
*微软电子表格中的航班数据*

为了使**PlaneTrack**类能访问数据以执行坐标转换，您将使用虚幻引擎的**DataTable**将数据存储在项目中。在此步骤中，您将创建一个数据结构来表示航班数据的结构。

1. 在中**PlaneTrack.h**，将以下代码片段插入引入头文件的下方，以定义航班数据的结构：
```C++
USTRUCT(BlueprintType)
struct FAircraftRawData : public FTableRowBase
{
  GENERATED_USTRUCT_BODY()

  public:
    FAircraftRawData()
      : Longitude(0.0)
      , Latitude(0.0)
      , Height(0.0)
    {}

  UPROPERTY(EditAnywhere, Category = "FlightTracker")
    double Longitude;
  UPROPERTY(EditAnywhere, Category = "FlightTracker")
    double Latitude;
  UPROPERTY(EditAnywhere, Category = "FlightTracker")
    double Height;
};
```
该结构包含三个成员变量：Longitude，Latitude，和Height。这些变量对应于上面原始数据表中的列名。另外请注意，该结构继承于**FTableRowBase**。
编译代码。

2. 将.csv数据文件拖放到虚幻引擎**Content Browser**中。在**Choose DataTable Row Type**下拉框中选择**AircraftRawData**：
![](https://i.loli.net/2021/05/23/5VnpJAUhKtPsCic.png)

点击**Apply**，然后**Content Browser**中双击新创建的UDataTable对象，以打开数据表：
![](https://i.loli.net/2021/05/23/l3exdGNLwv8jbDz.png)

> 故障排除：如果您收到了虚幻引擎无法导入的错误消息，请检查数据文件是否保存在项目文件夹中。如果数据文件保存在其他位置，可能会引发此错误。

## 第四步：将坐标添加到航班轨迹中
在此步骤中，您将向PlaneTrack类添加更多代码，以完成剩下的创建样条线轨迹的功能。

1. 将以下头文件引用和方法定义代码添加到**PlaneTrack.h**中：
```C++
// 头文件
...
#include <glm/vec3.hpp>
#include "CesiumGeospatial/Ellipsoid.h"
#include "CesiumGeospatial/Cartographic.h"
...

public:
  // 解析数据表并创建样条线轨迹的方法
  UFUNCTION(BlueprintCallable, Category = "FlightTracker")
    void LoadSplineTrackPoints();
```
2. 在**LoadSplineTrackPoints**的方法体中添加以下代码。这是大部分计算要完成的地方。
```C++
  void APlaneTrack::LoadSplineTrackPoints()
  {
    if (this->AircraftsRawDataTable != nullptr && this->CesiumGeoreference != nullptr)
    {
      int32 PointIndex = 0;
      for (auto& row : this->AircraftsRawDataTable->GetRowMap())
      {
        FAircraftRawData* Point = (FAircraftRawData*)row.Value;
        // 获取经度/维度/高度值，转换成UE4坐标
        double PointLatitude = Point->Latitude;
        double PointLongitude = Point->Longitude;
        double PointHeight = Point->Height;

        // 计算UE里的坐标
        glm::dvec3 UECoords = this->CesiumGeoreference->TransformLongitudeLatitudeHeightToUe(glm::dvec3(PointLongitude, PointLatitude, PointHeight));
        FVector SplinePointPosition = FVector(UECoords.x, UECoords.y, UECoords.z);
        this->SplineTrack->AddSplinePointAtIndex(SplinePointPosition, PointIndex, ESplineCoordinateSpace::World, false);

        // 获取飞机的向上方向
        const CesiumGeospatial::Ellipsoid& Ellipsoid = CesiumGeospatial::Ellipsoid::WGS84;
        glm::dvec3 upVector = Ellipsoid.geodeticSurfaceNormal(CesiumGeospatial::Cartographic(FMath::DegreesToRadians(PointLongitude), FMath::DegreesToRadians(PointLatitude), FMath::DegreesToRadians(PointHeight)));

        // 计算飞机的UE4向上方向
        glm::dvec4 ecefUp(upVector, 0.0);
        const glm::dmat4& ecefToUnreal = this->CesiumGeoreference->GetEllipsoidCenteredToUnrealWorldTransform();
        glm::dvec4 unrealUp = ecefToUnreal * ecefUp;
        this->SplineTrack->SetUpVectorAtSplinePoint(PointIndex, FVector(unrealUp.x, unrealUp.y, unrealUp.z), ESplineCoordinateSpace::World, false);

        PointIndex++;
      }
      this->SplineTrack->UpdateSpline();
    }
  }
```
编译代码。

3. 回到虚幻引擎编辑器，将航班轨迹添加到场景中。在**Place Actors**面板中，搜索**Plane Track**，将其拖放到场景中。
4. 选中**PlaneTrack** Actor，然后在**Details**面板中，找到**Flight Tracker**类别。将**Cesium Georeference**属性设置为场景中的**Cesium Georeference**，并将**Aircrafts Raw Data Table**属性设置为在步骤三中添加的数据表。
![](https://i.loli.net/2021/05/23/KpxVHXNiR5Ejmkd.png)
5. 打开关卡编辑。在这里，您将添加一些**蓝图**节点以填充样条曲线轨迹。
![](https://i.loli.net/2021/05/23/CtmHoJyNiavkZBc.png)
6. 查找**Event BeginPlay**节点。在运行模式的最开始，这个节点就会被调用。从**World Outliner**拖拽**PlaneTrack** Actor到**Event Graph**中，从这个节点拉出一根连线，搜索并添加**Clear Spline Points**节点。首次将样条线添加到场景时，默认情况下它有两个点。这两个点是随机的，在本教程中不需要，因此可以使用**Clear Spline Points**清除它们。
7. 从**PlaneTrack**对象节点，拖动另一跟连线并搜索**Load Spline Track Points**节点。连接**Clear Spline Points**和**Load Spline Track Points**节点，并将**Event BeginPlay**节点连接到**Clear Spline Points**节点。最终的**蓝图**拓扑如下所示：
![](https://i.loli.net/2021/05/23/p8wOFcho6t59NRz.png)
单击**蓝图编辑器**左上角的**Compile**按钮。默认情况下样条线在运行时处于不可见状态，您可以通过点击编辑器主窗口，按键盘上的`键（通常在Esc键下面），输入命令：**ShowFlag.Splines 1**。要检查所有设置是否正确，请点击主编辑器顶部面板中的**Play**按钮。您应该能够看到由样条曲线连接的数据点，该样条曲线从旧金山国际机场的航站楼开始，如下所示：
![](https://i.loli.net/2021/05/23/YPMFVylKHQkBzow.png)
> 译者注：也可以**Event BeginPlay**节点后添加**Execute Console Command**节点，**Command**输入**ShowFlag.Splines 1**：
![](https://i.loli.net/2021/05/23/lQSwbBi51F2YCrc.jpg)

## 第五步：添加飞机
完成航班轨迹的最后一步是添加跟随样条线轨迹的飞机。对于飞机网格体，可以使用任何您想要的模型。这是TurboSquid的[波音787](https://www.turbosquid.com/3d-models/free-boeing-787-8-1-3d-model/858876)飞机模型，您可以免费下载。

本教程中的飞机模型是[Sketchfab](https://sketchfab.com/3d-models/boeing-737-max-3d-model-a9ad26216b754c3396b90745af615a72)的波音737飞机模型。
> 译者注：翻译此教程时，该模型已经从Sketchfab下架了，您可以在Sketchfab搜索[其他的波音787飞机模型](https://sketchfab.com/3d-models/boeing737-259de41be0c7410e86b7e79be33d6b3a)。另外，可以使用[Sketchfab plugin for Unreal Engine](https://github.com/sketchfab/unreal-plugin)一键导入Sketchfab模型，省去下载fbx模型，再导入UE的麻烦。
![](https://i.loli.net/2021/05/23/oHcbakdUCElxRLJ.jpg)

1. 在内容浏览器中点击右键，再点击**Add/Import —> Import to /Game/[Path]/**将飞机模型导入到内容浏览器中。您可以在**Static Mesh Editor**中检查模型：
![](https://i.loli.net/2021/05/23/qguaY1PwNsHB86Q.png)

2. 右键单击**Content Browser**的空白区域，然后选择**Blueprint Class**。当提示您选择父类时，选择**Actor**。将类命名为**BP_Aircraft**（BP代表Blueprint蓝图）。该类将包含使飞机沿着样条线轨迹移动的逻辑。

3. 双击新创建的**BP_Aircraft**蓝图，打开蓝图编辑器。单击左上角绿色的**Add Component**按钮，然后搜索**Static Mesh**。将其添加到组件列表中，并将其命名为**AircraftMesh**。
![](https://i.loli.net/2021/05/23/FWH1p47sDygULQ3.png)

4. 选中此新组件后，在蓝图编辑器右侧找到**Details**面板。找到**Static Mesh**属性，然后在下拉菜单中找到并选择您先前导入的飞机网格体。

5. 单击蓝图编辑器顶部的**Event Graph**选项卡，打开**Event Graph**。单击右键**Event Graph**中的任意位置，然后搜索**Custom Event**节点。将此自定义事件命名为**MoveAircraft**。

6. 在**Event Graph**中再次单击右键，然后搜索**Add Timeline**节点。**Timeline**节点将用于随着时间移动飞机。
![](https://i.loli.net/2021/05/23/OTBUyIqbv8S3Zwx.png)

7. 双击**Timeline**节点以打开**Timeline Editor**。通过单击编辑器左上角的**Add Float Track**按钮来创建浮点数曲线，并为其命名。在本教程中，浮点数曲线被命名为**Alpha**。右键单击曲线，选择**Add key to Curve**，给时间轴添加关键帧。最终曲线如下图所示：
![](https://i.loli.net/2021/05/23/4PGHbWRwp1izVal.png)

第一个关键帧时间= 0，值= 0，而第二个关键帧时间= 1，值=1。要为关键点分配更精确的值，请选中它并在左上角输入值：
![](https://i.loli.net/2021/05/23/Gb4x31IcLRYfUBH.png)

选中**Use Last Keyframe**旁边的复选框。如果您希望动画在结束后立即循环播放，也可以勾选**Loop**复选框。

回到**Event Graph**，右键单击时间轴节点的**Alpha**输出引脚，选择**Promote to variable**菜单，将其提升为变量。这将在左侧面板的**Components**中添加一个新变量：
![](https://i.loli.net/2021/05/23/tsXDrQ8iW7GeCUY.png)

8. 点击**My Blueprint**面板中绿色的**Add New**按钮，给**BP_Aircraft**蓝图添加一个名为**Duration**的变量。该变量用于确定飞机沿轨迹飞行需要多长时间。将他的类型设置为浮点数**float**，然后单击它旁边的眼睛符号，以使其公开，并在虚幻引擎主编辑器中进行编辑。

同样，将下列变量添加到**BP_Aircraft**蓝图类中：

* AircraftStartOffset：类型float；可见性为public；用于确定航班在时间轴上的何处开始。由于时间线的**Alpha**值在0和1之间，**Slider Range**和**Value Range**应该设置在0和1之间。可以在蓝图编辑器的细节面板中给这些变量重新赋值。
* PlaneTrack：类型为PlaneTrack的引用; 可见性为public；用于保存PlaneTrack对象的引用，从样条线上获取位置。
![](https://i.loli.net/2021/05/23/eQ6lqVuk1PrFN5X.png)

最终的组件列表如下所示：
![](https://i.loli.net/2021/05/23/cuvjyzRwFxtglqI.png)

9. 按下图完成**Move Aircraft**自定义事件：
![](https://i.loli.net/2021/05/23/3w4GoXed617aJPD.png)

要使用变量，可以将它拖放到**Event Graph**中，或右键单击图中的任何位置，然后搜索变量的名称。要调用变量的函数，可以从变量节点拉出新连接，然后搜索该函数的名称。

编译蓝图。

10. 接下来，添加逻辑以将**PlaneTrack**样条线连接到**Move Aircraft**方法，并使用线性插值的方法从该样条线获取飞机的位置。还是在当前**Event Graph**中，在**Move Aircraft**下创建如下节点拓扑图：
![](https://i.loli.net/2021/05/23/f4HwEIgkG96p5ZL.png)

11. 最后，用**Set Actor Transform**将两个**蓝图**拓扑连接在一起：
![](https://i.loli.net/2021/05/23/W9a7dHkqFx2j1vy.png)

编译蓝图。

12. 回到主编辑器。要么从**Content Browser**中拖拽**BP_Aircraft**蓝图到场景中，要么在**Place Actor**面板中搜索**BP_Aircraft**并将**BP_Aircraft**蓝图添加到场景中。

13. 有几种触发**Move Aircraft**事件的方法。在本教程中，我们使用键盘事件来触发它。返回到**Level Blueprint.**。在**Event Graph**中，添加**Keyboard**节点（此处使用M键）。将此键盘节点连接到**Move Aircraft**事件，如下图所示：
![](https://i.loli.net/2021/05/23/7KSRDE2hoIQwtOe.png)

编译蓝图。

14. 选中**BP_Aircraft** Actor，在**Details**面板中初始化公共变量**Duration**，**PlaneTrack**和**AirplaneOffset**。请注意，**Duration**的值越大，飞机沿轨迹飞行的时间就越长。最好是将**Duration**值设置为100,000。可以修改**AirplaneOffset**变量，让飞机在轨迹的某个中间位置开始飞行。比如，0.0是航班的起始位置，1.0是航班的终点，因此将**AirplaneOffset**设置为0.9的话，可以让飞机从靠近终点的位置开始飞行。
![](https://i.loli.net/2021/05/23/hGXATnJCEZ3HU9B.png)

将当前视口对准飞机，点击**Play**按钮，然后按M键（或者任意您选择的按键）开始飞行。
![](https://i.loli.net/2021/05/23/jIov8Bs57PKkgfZ.gif)
> 译者注：其实此时运行工程的话，镜头不会跟着飞机一起移动，必须手动操作FloatingPawn，要不然飞机一会儿就没影了。挑战一下自己，看看能不能跟上飞机的节奏。

## 在不同的镜头视角之间切换（可选）
您将实现镜头切换功能，以便从不同的角度观察飞行情况。这一步是可选的，但是可以为您的项目添加很棒的效果。

1. 使用**Place Actor**面板，将两个新的**Camera** Actor添加到场景中。在右侧的面板中，将**Camera** Actor拖放到**BP_Aircraft** Actor上，让**Camera**成为**BP_Aircraft**的孩子节点：
![](https://i.loli.net/2021/05/23/fy9DQbVvdTGZKq2.png)

当飞机移动时，镜头也将随之移动。调整镜头，使其中一个对准飞机顶部，另外一个从侧面看：
![](https://i.loli.net/2021/05/23/sEeKkJbZjCocBTd.png)
![](https://i.loli.net/2021/05/23/ux5zRCtNQXGpMyi.png)

2. 定位好镜头后，打开关卡蓝图。为侧面和顶部镜头添加自定义键盘事件：
![](https://i.loli.net/2021/05/23/zRfZrHlhBmupC81.png)

编译蓝图，然后返回主编辑器，点击**Play**，您可以用在**关卡蓝图**中指定的键盘按键来测试新的镜头切换功能。

## 完整源码
这是本教程的完整源代码：

**PlaneTrack.h**：
```C++
// Copyright 2020-2021 CesiumGS, Inc. and Contributors

#pragma once

#include "CoreMinimal.h"
#include "GameFramework/Actor.h"
#include "Components/SplineComponent.h"
#include "CesiumGeoreference.h"
#include "Engine/DataTable.h"
#include <glm/vec3.hpp>
#include "CesiumGeospatial/Ellipsoid.h"
#include "CesiumGeospatial/Cartographic.h"
#include "PlaneTrack.generated.h"

USTRUCT(BlueprintType)
struct FAircraftRawData : public FTableRowBase
{
  GENERATED_USTRUCT_BODY()

public:
  FAircraftRawData()
    : Longitude(0.0)
    , Latitude(0.0)
    , Height(0.0)
  {}

  UPROPERTY(EditAnywhere, BlueprintReadWrite, Category = "FlightTracker")
    float Longitude;
  UPROPERTY(EditAnywhere, BlueprintReadWrite, Category = "FlightTracker")
    float Latitude;
  UPROPERTY(EditAnywhere, BlueprintReadWrite, Category = "FlightTracker")
    float Height;
};

UCLASS()
class CESIUMUNREAL_API APlaneTrack : public AActor
{
  GENERATED_BODY()
  
public:  
  // 设置默认值
  APlaneTrack();

  // 代表航班轨迹的样条线成员变量
  UPROPERTY(BlueprintReadOnly, Category = "FlightTracker")
    USplineComponent* SplineTrack;

  // Cesium工具类，包含很多有用的坐标转换相关的函数
  UPROPERTY(EditAnywhere, Category = "FlightTracker")
    ACesiumGeoreference* CesiumGeoreference;

  // 用于保存航班数据的虚幻引擎数据表
  UPROPERTY(EditAnywhere, Category = "FlightTracker")
    UDataTable* AircraftsRawDataTable;

protected:
  // 游戏开始时或者此Actor被创建时执行
  virtual void BeginPlay() override;

public:  
  // 每帧执行
  virtual void Tick(float DeltaTime) override;

  // 解析数据表并创建样条线轨迹的方法
  UFUNCTION(BlueprintCallable, Category = "FlightTracker")
    void LoadSplineTrackPoints();
};
```
**PlaneTrack.cpp**：
```C++
// Copyright 2020-2021 CesiumGS, Inc. and Contributors

#include "PlaneTrack.h"

// 设置默认值
APlaneTrack::APlaneTrack()
{
  // 让该Actor每帧都执行Tick()方法，如果需要可以设置成false以提高性能
  PrimaryActorTick.bCanEverTick = true;

  // 初始化轨迹
  SplineTrack = CreateDefaultSubobject<USplineComponent>(TEXT("SplineTrack"));
  // 让样条线在运行模式下可见
  SplineTrack->SetDrawDebug(true);
  // 设置样条线的颜色
  SplineTrack->SetUnselectedSplineSegmentColor(FLinearColor(1.f, 0.f, 0.f));
  // 设置样条线的粗细或者宽度
  SplineTrack->ScaleVisualizationWidth = 70.f;
}

// 游戏开始时或者此Actor被创建时执行
void APlaneTrack::BeginPlay()
{
  Super::BeginPlay();
}

// 每帧执行
void APlaneTrack::Tick(float DeltaTime)
{
  Super::Tick(DeltaTime);
}

void APlaneTrack::LoadSplineTrackPoints()
{
  if (this->AircraftsRawDataTable != nullptr && this->CesiumGeoreference != nullptr)
  {
    int32 PointIndex = 0;
    for (auto& row : this->AircraftsRawDataTable->GetRowMap())
    {
      FAircraftRawData* Point = (FAircraftRawData*)row.Value;
      // 获取经度/维度/高度值，转换成UE4坐标
      float PointLatitude = Point->Latitude;
      float PointLongitude = Point->Longitude;
      float PointHeight = Point->Height;

      // 计算UE里的坐标
      glm::dvec3 UECoords = this->CesiumGeoreference->TransformLongitudeLatitudeHeightToUe(glm::dvec3(PointLongitude, PointLatitude, PointHeight));
      FVector SplinePointPosition = FVector(UECoords.x, UECoords.y, UECoords.z);
      this->SplineTrack->AddSplinePointAtIndex(SplinePointPosition, PointIndex, ESplineCoordinateSpace::World, false);

      // 获取飞机的向上方向
      const CesiumGeospatial::Ellipsoid& Ellipsoid = CesiumGeospatial::Ellipsoid::WGS84;
      glm::dvec3 upVector = Ellipsoid.geodeticSurfaceNormal(CesiumGeospatial::Cartographic(FMath::DegreesToRadians(PointLongitude), FMath::DegreesToRadians(PointLatitude), FMath::DegreesToRadians(PointHeight)));
      // 计算飞机的UE4向上方向
      glm::dvec4 ecefUp(
        upVector,
        0.0
      );
      const glm::dmat4& ecefToUnreal = this->CesiumGeoreference->GetEllipsoidCenteredToUnrealWorldTransform();
      glm::dvec4 unrealUp = ecefToUnreal * ecefUp;
      this->SplineTrack->SetUpVectorAtSplinePoint(PointIndex, FVector(unrealUp.x, unrealUp.y, unrealUp.z), ESplineCoordinateSpace::World, false);

      PointIndex++;
    }
    this->SplineTrack->UpdateSpline();
  }
}
```
## 下一步
当前，飞机的速度在整个轨迹上都是固定的。如果您的数据集包含速度或加速度，则可以使用它来根据飞机在样条线轨迹上的位置调整飞机的速度。同时，您也可以使用实际数据调整飞机的航向、偏航角和俯仰角。

现在，您已经完成了**Cesium for Unreal**系列教程，请访问[社区论坛](https://community.cesium.com/c/cesium-for-unreal)，以分享您对**Cesium for Unreal**和教程的反馈，并向全世界展示您的作品。

都看到这里了，加个技术交流群一起组队研究呗^^

![](https://i.loli.net/2021/05/09/HzUyekM3QNoblKv.png)
