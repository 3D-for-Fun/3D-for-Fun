---
title: (四) Object3D
date: 2021-04-23
author: 'ue007'
lang: 'zh-CN'
sidebar: 'auto'
categories:
 - Blog
 - ThreeJS
---

# 1. 概述

本文主要介绍以下内容：

> 1. 了解三维对象 Object3D
> 2. 了解三维岁对象层次结构 Object3D Hierarchy
> 3. **理解：三维世界 = 物体 + 关系**

专栏代码地址：https://github.com/ue007/three.ts

本文代码地址：https://github.com/ue007/three.ts/tree/main/05-Object3D

# 2. Object3D

首先，来介绍下什么是Object3D？

Three.Object3D是threejs中的基类，是一切的三维空间的基础，就是一个抽象概念，表示着一个可以在三维空间中自由移动、自由旋转、自由缩放，可以控制显示隐藏的物体，这个Object3D可以是你自己，可以是电脑、鼠标、房子、飞机、笔等等。所以，Object3D最主要是具有下面四点特性：

> - Rotation 旋转
> - Position 位置
> - Scale 缩放
> - Visiblity 可见性

然而在三维世界中，如何用数学的方式，来有效控制Position、Rotation、Scale等等空间的事情，就会产生一门学科，叫线性代数，其中矩阵变换是最为重要的手段，详细可以参考数据**[《3D.Math.Primer.for.Graphics.and.Game.Development》](https://book.douban.com/subject/2028710/)。**也可以参考Game101课程笔记**：**[计算机图形学一：基础变换矩阵总结(缩放，旋转，位移)](https://zhuanlan.zhihu.com/p/144323332)。

当然讲的最好的，还是**[3blue1brown的线代本质](https://link.zhihu.com/?target=https%3A//www.bilibili.com/video/BV1Ys411k7yQ%3Ffrom%3Dsearch%26seid%3D15562968547395149083)。对数学感兴趣的可以深入研究，不研究的话，也就只需要知道，用数学矩阵可以快速计算物体的一切在空间中发生的变化。**

在Three.js中，如下所有的Class，都是继承了Object3D：

- [Scene](https://threejs.org/docs/#api/en/scenes/Scene)
- [Mesh](https://threejs.org/docs/#api/en/objects/Mesh)

- - [InstancedMesh](https://threejs.org/docs/#api/en/objects/InstancedMesh)
  - [SkinnedMesh](https://threejs.org/docs/#api/en/objects/SkinnedMesh)

- [Camera](https://threejs.org/docs/#api/en/cameras/Camera)

- - [OrthographicCamera](https://threejs.org/docs/#api/en/cameras/OrthographicCamera)
  - [PerspectiveCamera](https://threejs.org/docs/#api/en/cameras/PerspectiveCamera)

- [CubeCamera](https://threejs.org/docs/#api/en/cameras/CubeCamera)
- [Group](https://threejs.org/docs/#api/en/objects/Group)
- [Sprite](https://threejs.org/docs/#api/en/objects/Sprite)
- [LOD](https://threejs.org/docs/#api/en/objects/LOD)
- [Bone](https://threejs.org/docs/#api/en/objects/Bone)
- [Line](https://threejs.org/docs/#api/en/objects/Line)

- - [LineLoop](https://threejs.org/docs/#api/en/objects/LineLoop)
  - [LineSegments](https://threejs.org/docs/#api/en/objects/LineSegments)

- [Points](https://threejs.org/docs/#api/en/objects/Points)
- [Light](https://threejs.org/docs/#api/en/lights/Light)

- - [AmbientLight](https://threejs.org/docs/#api/en/lights/AmbientLight)
  - [DirectionalLight](https://threejs.org/docs/#api/en/lights/DirectionalLight)
  - [HemisphereLight](https://threejs.org/docs/#api/en/lights/HemisphereLight)
  - [PointLight](https://threejs.org/docs/#api/en/lights/PointLight)
  - [RectAreaLight](https://threejs.org/docs/#api/en/lights/RectAreaLight)
  - [SpotLight](https://threejs.org/docs/#api/en/lights/SpotLight)

- [AudioListener](https://threejs.org/docs/#api/en/audio/AudioListener)
- [Audio](https://threejs.org/docs/#api/en/audio/Audio)

- - [PositionalAudio](https://threejs.org/docs/#api/en/audio/PositionalAudio)

- [ImmediateRenderObject](https://threejs.org/docs/#api/en/extras/objects/ImmediateRenderObject)
- [SpotLightHelper](https://threejs.org/docs/#api/en/helpers/SpotLightHelper)
- [HemisphereLightHelper](https://threejs.org/docs/#api/en/helpers/HemisphereLightHelper)
- [DirectionalLightHelper](https://threejs.org/docs/#api/en/helpers/DirectionalLightHelper)
- [ArrowHelper](https://threejs.org/docs/#api/en/helpers/ArrowHelper)



接下来，我们使用three.js 以及GUI面板，对Object3D的position、scale、rotation进行调试，看看具体的效果。

## 2.1 GUI控制Position

在client.ts中加入控制Position的代码：

```javascript
const cubeFolder = gui.addFolder('Cube');
const cubePositionFolder = cubeFolder.addFolder('Position');
cubePositionFolder.add(cube.position, 'x', -10, 10);
cubePositionFolder.add(cube.position, 'y', -10, 10);
cubePositionFolder.add(cube.position, 'z', -10, 10);
cubeFolder.open();
```



![chrome_X4Dau45u1S.png](https://cdn.nlark.com/yuque/0/2021/png/244017/1619083645194-e5dc23f1-8de5-49fd-a383-b37828362e3e.png)



运行代码，调试下参数试试，尝试理解下基础的概念即可。

## 2.2 GUI控制Rotation

在client.ts中加入控制Rotation的代码：

```javascript
const cubeFolder = gui.addFolder('Cube');
const cubeRotationFolder = cubeFolder.addFolder('Rotation');
cubeRotationFolder.add(cube.rotation, 'x', 0, Math.PI * 2, 0.01);
cubeRotationFolder.add(cube.rotation, 'y', 0, Math.PI * 2, 0.01);
cubeRotationFolder.add(cube.rotation, 'z', 0, Math.PI * 2, 0.01);
cubeFolder.open();
```

![chrome_kCc82pXX0D.png](https://cdn.nlark.com/yuque/0/2021/png/244017/1619083537425-5f2f6e18-d86e-4eac-9be1-dc2c389654eb.png)



## 2.3 GUI控制Scale

在client.ts中加入控制Scale的代码：

```javascript
const cubeScaleFolder = cubeFolder.addFolder('Scale');
cubeScaleFolder.add(cube.scale, 'x', -5, 5, 0.1);
cubeScaleFolder.add(cube.scale, 'y', -5, 5, 0.1);
cubeScaleFolder.add(cube.scale, 'z', -5, 5, 0.1);
cubeFolder.add(cube, 'visible', true);
```

![chrome_8SkWsIY7Xi.png](https://cdn.nlark.com/yuque/0/2021/png/244017/1619083697099-e9b69d2d-aa5e-4130-b957-f71987ebb918.png)

## 2.4 GUI控制Visible

在client.ts中加入控制visible的代码：

```javascript
cubeFolder.add(cube, 'visible', true);
```

![chrome_nythnam0Pg.png](https://cdn.nlark.com/yuque/0/2021/png/244017/1619083748024-f75162d8-3b88-4802-9660-e8f08cd7fd3c.png)



## 2.5 完整代码

```javascript
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import Stats from 'three/examples/jsm/libs/stats.module';
import { GUI } from 'three/examples/jsm/libs/dat.gui.module';

const scene: THREE.Scene = new THREE.Scene();

const camera: THREE.PerspectiveCamera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

const renderer: THREE.WebGLRenderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const controls = new OrbitControls(camera, renderer.domElement);

const geometry: THREE.BoxGeometry = new THREE.BoxGeometry();
const material: THREE.MeshBasicMaterial = new THREE.MeshBasicMaterial({
  color: 0x00ff00,
  wireframe: true,
});

const cube: THREE.Mesh = new THREE.Mesh(geometry, material);
scene.add(cube);

camera.position.z = 2;

window.addEventListener('resize', onWindowResize, false);
function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
  render();
}

const stats = Stats();
document.body.appendChild(stats.dom);

const gui = new GUI();

const cubeFolder = gui.addFolder('Cube');
const cubeRotationFolder = cubeFolder.addFolder('Rotation');
cubeRotationFolder.add(cube.rotation, 'x', 0, Math.PI * 2, 0.01);
cubeRotationFolder.add(cube.rotation, 'y', 0, Math.PI * 2, 0.01);
cubeRotationFolder.add(cube.rotation, 'z', 0, Math.PI * 2, 0.01);
const cubePositionFolder = cubeFolder.addFolder('Position');
cubePositionFolder.add(cube.position, 'x', -10, 10);
cubePositionFolder.add(cube.position, 'y', -10, 10);
cubePositionFolder.add(cube.position, 'z', -10, 10);
const cubeScaleFolder = cubeFolder.addFolder('Scale');
cubeScaleFolder.add(cube.scale, 'x', -5, 5, 0.1);
cubeScaleFolder.add(cube.scale, 'y', -5, 5, 0.1);
cubeScaleFolder.add(cube.scale, 'z', -5, 5, 0.1);
cubeFolder.add(cube, 'visible', true);
cubeFolder.open();

const cameraFolder = gui.addFolder('Camera');
cameraFolder.add(camera.position, 'z', 0, 10, 0.01);
cameraFolder.open();

var animate = function () {
  requestAnimationFrame(animate);

  controls.update();

  render();

  stats.update();
};

function render() {
  renderer.render(scene, camera);
}
animate();
```

![chrome_uI8wojM6iR.png](https://cdn.nlark.com/yuque/0/2021/png/244017/1619083773338-216cb8f9-c818-421b-bd35-8514df4f6297.png?x-oss-process=image%2Fresize%2Cw_1500)

# 3. Object3D Hierarchy

上一章，只在空间中创建了一个立方体，然而真实的世界中，是存在各种奇形怪状、关联关系复杂的物体的，换言之，世界是包罗万象、参差不齐、错综复杂、千丝万缕，即：

```
三维世界 = 物体 + 关系
```

基类Object3D，除了定义物体的空间信息之外，还得记录物体与物体之间的关系，比如父子关系，也是最简单的关系；

## 3.1 Scene类

Scene类，表示整个世界，我们通过add的方式，添加各种物体,表示物体与空间之间的关系：

```javascript
Scene.add(object3d);
```

## 3.2 Add方法

物体与物体之间的关系，也可以通过add方法添加，最终会形成一个关系层次结构图：

```bash
scene
    |--ObjectA 
             |--Object B
                       |--Object C
```

## 3.3 示例

下面，我们通过示例，来理解物体之间的关系。

在空间中，创建三个球，颜色分别为：red、green、blue，分别代表父亲（father）、自己（myself）、儿子（son）;

> 1. **改变父亲的空间信息，会影响到我自己的空间信息，以及影响儿子的空间信息；**
> 2. **改变我的空间信息，不会影响父亲的空间信息，但是会影响儿子的空间信息；**
> 3. **改变儿子的空间信息，不会影响父亲和我自己的信息；**

创建三个物体，分别表示父亲、我、儿子：

```javascript
// father
const father = new THREE.Mesh(
  new THREE.SphereBufferGeometry(),
  new THREE.MeshPhongMaterial({ color: 0xff0000 })
);
father.position.set(0, 0, 0);
scene.add(father);
father.add(new THREE.AxesHelper(5));

// myself
const myself = new THREE.Mesh(
  new THREE.SphereBufferGeometry(),
  new THREE.MeshPhongMaterial({ color: 0x00ff00 })
);
myself.position.set(4, 0, 0);
father.add(myself);
myself.add(new THREE.AxesHelper(5));

// son
const son = new THREE.Mesh(
  new THREE.SphereBufferGeometry(),
  new THREE.MeshPhongMaterial({ color: 0x0000ff })
);
son.position.set(4, 0, 0);
myself.add(son);
son.add(new THREE.AxesHelper(5));
```

GUI面板中添加控制参数：

```javascript
// gui
const gui = new GUI();
const fatherFolder = gui.addFolder('父亲');
fatherFolder.add(father.position, 'x', 0, 10, 0.01).name('X Position');
fatherFolder.add(father.rotation, 'x', 0, Math.PI * 2, 0.01).name('X Rotation');
fatherFolder.add(father.scale, 'x', 0, 2, 0.01).name('X Scale');
fatherFolder.open();
const myselfFolder = gui.addFolder('我');
myselfFolder.add(myself.position, 'x', 0, 10, 0.01).name('X Position');
myselfFolder.add(myself.rotation, 'x', 0, Math.PI * 2, 0.01).name('X Rotation');
myselfFolder.add(myself.scale, 'x', 0, 2, 0.01).name('X Scale');
myselfFolder.open();
const sonFolder = gui.addFolder('儿子');
sonFolder.add(son.position, 'x', 0, 10, 0.01).name('X Position');
sonFolder.add(son.rotation, 'x', 0, Math.PI * 2, 0.01).name('X Rotation');
sonFolder.add(son.scale, 'x', 0, 2, 0.01).name('X Scale');
sonFolder.open();
```

执行命令：

```bash
npm run dev
```

浏览器中打开localhost:8080，运行结果如下：

![chrome_oDEbW0kjme.png](https://cdn.nlark.com/yuque/0/2021/png/244017/1619085313229-0337ec9d-accc-4bd1-b374-f25a580a444c.png?x-oss-process=image%2Fresize%2Cw_1500)

调整父亲空间信息，围绕x轴旋转，发现三个物体，一起发生了旋转：

![chrome_Pc6ftsy8nj.png](https://cdn.nlark.com/yuque/0/2021/png/244017/1619085467552-07e1f446-2caf-4fa3-a778-a5830deed193.png?x-oss-process=image%2Fresize%2Cw_1500)

再调整Green（我自己）球体，平移一定距离，发现我和儿子一起发生了变化，父亲不变：

![chrome_s59lnW0PQI.png](https://cdn.nlark.com/yuque/0/2021/png/244017/1619085573041-510541ac-343a-4959-9431-9e41bcf78a31.png?x-oss-process=image%2Fresize%2Cw_1500)



再调整Blue（儿子）球体，旋转一定角度，发现只有儿子发生了变化，我和父亲都不变：

![chrome_R9N4WEQEbv.png](https://cdn.nlark.com/yuque/0/2021/png/244017/1619085645642-581651ea-aad3-4b5c-b4fa-7deb4401af9a.png?x-oss-process=image%2Fresize%2Cw_1500)







# 4. 总结

**三维世界 = 物体 + 关系**