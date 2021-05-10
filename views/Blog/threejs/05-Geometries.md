---
title: (五) Geometries
date: 2021-04-24
author: 'ue007'
lang: 'zh-CN'
sidebar: 'auto'
categories:
 - Blog
 - ThreeJS
---

## 1. 概述

本文主要介绍以下内容：

> 1. 了解Mesh概念
> 2. 学习使用几何体Geometry
> 3. 学习使用three.js内置的几何体（Geometry）
> 4. 学习使用BufferGeometry
> 5. 了解BufferGeometry和Geometry的区别
> 6. 了解几何体数据的制作，来源和使用

专栏代码地址：https://github.com/ue007/three.ts

本文代码地址：https://github.com/ue007/three.ts/tree/main/06-Geometries



## 2. Mesh

在three.js概念里，mesh是由几何体Geometry和材质Material组成的，在源码Mesh.js可以看到之间的关系：

```
function Mesh( geometry = new BufferGeometry(), material = new MeshBasicMaterial() ) {

    Object3D.call( this );

    this.type = 'Mesh';

    this.geometry = geometry;
    this.material = material;

    this.updateMorphTargets();

}
```

Mesh  = Geometry + Material

为什么会有Mesh三角网的概念呢？

首先我们要回顾下图形渲染管线了。


![语雀_Hqd1ChddUi.png](https://i.loli.net/2021/05/10/61BD4LRhkFetw2u.png)

所以，从上图可以理解：

> **Geometry: 就是在准备顶点数据，对应****Vertex处理过程；**
>
> **Mesh: 就是对应的Triangle三角面处理过程；**
>
> **Material：对应Fragment片元处理过程，对每个三角面片进行着色、贴图等等处理；**

## 3. Geometry

几何体，就是在准备一堆顶点数据，主要包括顶点数据、颜色数据、UV贴图数据、法向量数据等等；简单的说，几何体就是数据源，如果你对如何通过三角面片拼接成几何体非常了解，完全可以自己组织数据，不幸的是，这样操作不仅麻烦，而且也是非常困难的事情。所以，three.js内置常用的几何体，供大家直接使用，然后控制Position、Scale、Rotation、visible等空间属性，来操控物体。

Three.js一共有 22 种内置的图元。

| 图元种类(按英文首字母排序)   | 图元构造函数                                     |
| ---------------------------- | ------------------------------------------------ |
| 盒子(Box)                    | BoxBufferGeometry、BoxGeometry                   |
| 平面圆(Circle)               | CircleBufferGeometry、CircleGeometry             |
| 锥形(Cone)                   | ConeBufferGeometry、ConeGeometry                 |
| 圆柱(Cylinder)               | CylinderBufferGeometry、CylinderGeometry         |
| 十二面体(Dodecahedron)       | DodecahedronBufferGeometry、DodecahedronGeometry |
| 受挤压的2D形状(Extrude)      | ExtrudeBufferGeometry、ExtrudeGeometry           |
| 二十面体(Icosahedron)        | IcosahedronBufferGeometry、IcosahedronGeometry   |
| 由线旋转形成的形状(Lathe)    | LatheBufferGeometry、LatheGeometry               |
| 八面体(Octahedron)           | OctahedronBufferGeometry、OctahedronGeometry     |
| 由函数生成的形状(Parametric) | ParametricBufferGeometry、ParametriceGeometry    |
| 2D平面矩形(Plane)            | PlaneBufferGeometry、PlaneGeometry               |
| 多面体(Polyhedron)           | PolyhedronBufferGeometry、PolyhedronGeometry     |
| 环形/孔形(Ring)              | RingBufferGeometry、RingGeometry                 |
| 2D形状(Shape)                | ShapeBufferGeometry、ShapeGeometry               |
| 球体(Sphere)                 | SphereBufferGeometry、SphereGeometry             |
| 四面体(Tetrahedron)          | TetrahedronBufferGeometry、TetrahedronGeometry   |
| 3D文字(Text)                 | TextBufferGeometry、TextGeometry                 |
| 环形体(Torus)                | TorusBufferGeometry、TorusGeometry               |
| 环形结(TorusKnot)            | TorusKnotBufferGeometry、TorusKnotGeometry       |
| 管道/管状(Tube)              | TubeBufferGeometry、TubeGeometry                 |
| 几何体的所有边缘(Edges)      | EdgesGeometry                                    |
| 线框图(Wireframe)            | WireframeGeometry                                |



简单整个例子，了解下使用流程，其他几何体触类旁通，参考three.js官网即可。

参考代码：

```
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import Stats from 'three/examples/jsm/libs/stats.module';
import { GUI } from 'three/examples/jsm/libs/dat.gui.module';

const scene: THREE.Scene = new THREE.Scene();
const axesHelper = new THREE.AxesHelper(5);
scene.add(axesHelper);

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
//controls.addEventListener('change', render)

const boxGeometry: THREE.BoxGeometry = new THREE.BoxGeometry();
const sphereGeometry: THREE.SphereGeometry = new THREE.SphereGeometry();
const icosahedronGeometry: THREE.IcosahedronGeometry = new THREE.IcosahedronGeometry();

//console.dir(geometry)
const material: THREE.MeshBasicMaterial = new THREE.MeshBasicMaterial({
  color: 0x00ff00,
  wireframe: true,
});

const cube: THREE.Mesh = new THREE.Mesh(boxGeometry, material);
cube.position.x = 5;
scene.add(cube);

const sphere: THREE.Mesh = new THREE.Mesh(sphereGeometry, material);
sphere.position.x = -5;
scene.add(sphere);

const icosahedron: THREE.Mesh = new THREE.Mesh(icosahedronGeometry, material);
scene.add(icosahedron);

camera.position.z = 5;

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
cubeScaleFolder
  .add(cube.scale, 'x', -5, 5, 0.1)
  .onFinishChange(() => console.dir(cube.geometry));
cubeScaleFolder.add(cube.scale, 'y', -5, 5, 0.1);
cubeScaleFolder.add(cube.scale, 'z', -5, 5, 0.1);
cubeFolder.add(cube, 'visible', true);
cubeFolder.open();

var cubeData = {
  width: 1,
  height: 1,
  depth: 1,
  widthSegments: 1,
  heightSegments: 1,
  depthSegments: 1,
};
const cubePropertiesFolder = cubeFolder.addFolder('Properties');
cubePropertiesFolder
  .add(cubeData, 'width', 1, 30)
  .onChange(regenerateBoxGeometry)
  .onFinishChange(() => console.dir(cube.geometry));
cubePropertiesFolder
  .add(cubeData, 'height', 1, 30)
  .onChange(regenerateBoxGeometry);
cubePropertiesFolder
  .add(cubeData, 'depth', 1, 30)
  .onChange(regenerateBoxGeometry);
cubePropertiesFolder
  .add(cubeData, 'widthSegments', 1, 30)
  .onChange(regenerateBoxGeometry);
cubePropertiesFolder
  .add(cubeData, 'heightSegments', 1, 30)
  .onChange(regenerateBoxGeometry);
cubePropertiesFolder
  .add(cubeData, 'depthSegments', 1, 30)
  .onChange(regenerateBoxGeometry);

function regenerateBoxGeometry() {
  let newGeometry = new THREE.BoxGeometry(
    cubeData.width,
    cubeData.height,
    cubeData.depth,
    cubeData.widthSegments,
    cubeData.heightSegments,
    cubeData.depthSegments
  );
  cube.geometry.dispose();
  cube.geometry = newGeometry;
}

var sphereData = {
  radius: 1,
  widthSegments: 8,
  heightSegments: 6,
  phiStart: 0,
  phiLength: Math.PI * 2,
  thetaStart: 0,
  thetaLength: Math.PI,
};
const sphereFolder = gui.addFolder('Sphere');
const spherePropertiesFolder = sphereFolder.addFolder('Properties');
spherePropertiesFolder
  .add(sphereData, 'radius', 0.1, 30)
  .onChange(regenerateSphereGeometry);
spherePropertiesFolder
  .add(sphereData, 'widthSegments', 1, 32)
  .onChange(regenerateSphereGeometry);
spherePropertiesFolder
  .add(sphereData, 'heightSegments', 1, 16)
  .onChange(regenerateSphereGeometry);
spherePropertiesFolder
  .add(sphereData, 'phiStart', 0, Math.PI * 2)
  .onChange(regenerateSphereGeometry);
spherePropertiesFolder
  .add(sphereData, 'phiLength', 0, Math.PI * 2)
  .onChange(regenerateSphereGeometry);
spherePropertiesFolder
  .add(sphereData, 'thetaStart', 0, Math.PI)
  .onChange(regenerateSphereGeometry);
spherePropertiesFolder
  .add(sphereData, 'thetaLength', 0, Math.PI)
  .onChange(regenerateSphereGeometry);

function regenerateSphereGeometry() {
  let newGeometry = new THREE.SphereGeometry(
    sphereData.radius,
    sphereData.widthSegments,
    sphereData.heightSegments,
    sphereData.phiStart,
    sphereData.phiLength,
    sphereData.thetaStart,
    sphereData.thetaLength
  );
  sphere.geometry.dispose();
  sphere.geometry = newGeometry;
}

var icosahedronData = {
  radius: 1,
  detail: 0,
};
const icosahedronFolder = gui.addFolder('Icosahedron');
const icosahedronPropertiesFolder = icosahedronFolder.addFolder('Properties');
icosahedronPropertiesFolder
  .add(icosahedronData, 'radius', 0.1, 10)
  .onChange(regenerateIcosahedronGeometry);
icosahedronPropertiesFolder
  .add(icosahedronData, 'detail', 0, 5)
  .step(1)
  .onChange(regenerateIcosahedronGeometry);

function regenerateIcosahedronGeometry() {
  let newGeometry = new THREE.IcosahedronGeometry(
    icosahedronData.radius,
    icosahedronData.detail
  );
  icosahedron.geometry.dispose();
  icosahedron.geometry = newGeometry;
}

var animate = function () {
  requestAnimationFrame(animate);

  //cube.rotation.x += 0.01;
  //cube.rotation.y += 0.01;

  render();

  (document.getElementById('debug1') as HTMLDivElement).innerText =
    'Matrix\n' + cube.matrix.elements.toString().replace(/,/g, '\n');

  stats.update();
};

function render() {
  renderer.render(scene, camera);
}
//render()
animate();
```

执行命令：

```
npm run dev
```
![chrome_Z4gMM2ZZrx.png](https://i.loli.net/2021/04/22/Rb1WhwUxX7fjvg6.png)
## 4. BufferGeometry

### 4.1 Line

```
// create line by buffergeometry
const points = [];
points.push(new THREE.Vector3(-5, 2, -5));
points.push(new THREE.Vector3(5, 2, 5));
let geometry = new THREE.BufferGeometry().setFromPoints(points);
let line = new THREE.Line(
  geometry,
  new THREE.LineBasicMaterial({ color: 0xff00ff })
);
scene.add(line);
```

运行后，场景中多一个Line。

![chrome_6w1pMSQ0mG.png](https://i.loli.net/2021/04/22/tnEeZQKxHFjr4DT.png)

### 4.2 Tetrahedron

```
const material2 = new THREE.MeshNormalMaterial();
let geometry2 = new THREE.BufferGeometry();
const points2 = [
  new THREE.Vector3(-1, 1, -1), //c
  new THREE.Vector3(-1, -1, 1), //b
  new THREE.Vector3(1, 1, 1), //a

  new THREE.Vector3(1, 1, 1), //a
  new THREE.Vector3(1, -1, -1), //d
  new THREE.Vector3(-1, 1, -1), //c

  new THREE.Vector3(-1, -1, 1), //b
  new THREE.Vector3(1, -1, -1), //d
  new THREE.Vector3(1, 1, 1), //a

  new THREE.Vector3(-1, 1, -1), //c
  new THREE.Vector3(1, -1, -1), //d
  new THREE.Vector3(-1, -1, 1), //b
];

geometry2.setFromPoints(points2);
geometry2.computeVertexNormals();

const mesh2 = new THREE.Mesh(geometry2, material2);
mesh2.position.x = -5;
mesh2.position.y = 2;
mesh2.position.z = -5;
scene.add(mesh2);
```

运行后，多出一个三角锥：

![chrome_EMObkqIfvs.png](https://i.loli.net/2021/04/22/lJAykfZPMwo4quh.png)

## 5. BufferGeometry和Geometry的区别

为什么即存在Geometry，又存在BufferGeometry?

**说白了，Geometry更适合于人来理解，自定义的地方比较多，但性能比较低一些；**

**BufferGeometry更适合计算机来理解，自定义的地方很少，适合对图形学非常了解的人使用，但是性能很高。**

## 6. 3D模型数据源

内置的几何体，都是一些非常基础的模型，可以使用这些基础模型组装成，搭积木的方式，组成非常复杂的场景。

目前国内，数字产业化搞得如火如荼，各个行业都要数字化，所以数据的来源也是非常复杂的，多种多样的，比如：BIM行业的Revit数据模型、CAD图纸，GIS行业的各种数据要素、倾斜摄影、tiles，可以参考CesiumLab的数据转换这张图。

![ShareX_spfDiaCvWG.png](https://i.loli.net/2021/05/10/4UTPdWBZ8eVnv6L.png)


最终都会将各行各业的数据进行转换，轻量化，瓦片化等等技术手段，传输给Three.js的BufferGeometry，进行渲染；

或者将数据通过Datasmith的插件，转换数据转换成Unreal Engine的资产进行渲染。

![chrome_pGLnFund5x.png](https://i.loli.net/2021/04/22/HX6nCmxlVzPBRSc.png)

后期会针对熟悉的行业数据进行一一分析，探讨应用场景。

## 7.总结

图形学分为三大部分，几何、渲染、动画。

> 1. 几何，涉及到数据源的处理，和各个行业的数据格式非常密切。
> 2. 渲染，涉及到渲染引擎的优化，主流three.js、babylon.js、cesium.js等
> 3. 动画，物理引擎。


## 8. 参考资料

1. [Three.js教程](http://www.webgl3d.cn/Three.js/)
2. https://www.wjceo.com/ 暮志未晚
3. https://github.com/puxiao/threejs-tutorial