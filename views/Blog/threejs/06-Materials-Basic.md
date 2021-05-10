---
title: (六) Materials-Basic
date: 2021-04-25
author: 'ue007'
lang: 'zh-CN'
sidebar: 'auto'
categories:
 - Blog
 - ThreeJS
---

## 1. 概述

本文主要介绍以下内容：

> 1. Materials有哪些?
> 2. 了解Material在渲染管线中的位置
> 3. 为什么要分出来那么多材质，一个材质不香吗？
> 4. 学习使用Material;
> 5. 学会使用Spector.js进行调试

专栏代码地址：https://github.com/ue007/three.ts

本文代码地址：https://github.com/ue007/three.ts/tree/main/07-Materials-BasicMaterial



## 2. Materials有哪些？

### 2.1 为什么要分那么多材质？

有媳妇的，应该都知道，睡觉前，卸妆之后的媳妇，没有白天化妆之后的好看。为什么呢？这就是材质Material的作用。

**Material 材质，就是一个三维物体的门面，不带有Material的物体，如同一个卸了妆的女人，能看但一定不好看。所以，我们需要给女人化妆，什么粉底、遮瑕、散粉、画眉、眼影（AO），增加立体感，还有修容、高光、腮红、口红等等步骤。**

**说材质为什么比较难学，就在于它很类似于化妆品种类太多，试问，有几个大老爷们，能看懂女人化妆的步骤的，更何况咱们IT男同胞们呢。**

**作为男同胞，谁都不想看卸了妆的老婆，但也不喜欢经历老婆化妆的过程，等待的煎熬，实在是痛苦。**

**所以，材质的意义，就在于让物体看上去更好看，更适合整个场景需求，迎合今晚聚会氛围，是Party，还是KTV，还是YD。**

**真实场景做真实（PBR）处理，非真实场景，做NBR处理，后期特殊处理，做IBR处理等等，大老爷们变身美少女，啥都不是事。
**

**还是男人好，化妆品，不论春夏秋冬，只有一瓶，大宝SOD蜜。**

### 2.2 材质有哪些？

材质有哪些，就像女朋友问题，这只口红是什么颜色一样烦人。我的世界里只有红橙黄绿青蓝紫，你非要我区分色号，分不清还生气，实在让人无奈。

请问下面口红分别是什么颜色的？

![chrome_a1NibaiKaY.png](https://i.loli.net/2021/04/25/vmU1Q2ePiRoOMZ9.png)

我相信，99%男性的回答是：红色的！！！

好吧，Three.js源码中，材质包含下面多种材质，先不管它是啥，看名字一大堆，就统一理解为，化妆品吧。后面再一一分析，每个化妆品的作用，好坏。

```
export { ShadowMaterial } from './ShadowMaterial.js';
export { SpriteMaterial } from './SpriteMaterial.js';
export { RawShaderMaterial } from './RawShaderMaterial.js';
export { ShaderMaterial } from './ShaderMaterial.js';
export { PointsMaterial } from './PointsMaterial.js';
export { MeshPhysicalMaterial } from './MeshPhysicalMaterial.js';
export { MeshStandardMaterial } from './MeshStandardMaterial.js';
export { MeshPhongMaterial } from './MeshPhongMaterial.js';
export { MeshToonMaterial } from './MeshToonMaterial.js';
export { MeshNormalMaterial } from './MeshNormalMaterial.js';
export { MeshLambertMaterial } from './MeshLambertMaterial.js';
export { MeshDepthMaterial } from './MeshDepthMaterial.js';
export { MeshDistanceMaterial } from './MeshDistanceMaterial.js';
export { MeshBasicMaterial } from './MeshBasicMaterial.js';
export { MeshMatcapMaterial } from './MeshMatcapMaterial.js';
export { LineDashedMaterial } from './LineDashedMaterial.js';
export { LineBasicMaterial } from './LineBasicMaterial.js';
export { Material } from './Material.js';
```



## 3. Material在渲染管线中的位置

学习图形学，时刻不能忘记的，就是渲染管线。如同做人，时刻不能忘记的礼节、法制一样。

记住渲染管线，每一步做了哪些事情，每一步如何做，才能最优。实际生活中，我们会有一种说法，把一件事情的每一步骤做到极致，最终的结果就是最好的。但是在渲染管线里，可不是完全这样，这就是管线的意义。

优化图形的性能问题，就像一个通下水道马桶的过程，要保证整体是通畅的，最后才能达到通畅。话题扯远了，后期会整理性能优化的问题。

![QQPCRealTimeSpeedup_4lgrDfBlMq.png](https://i.loli.net/2021/04/25/KR5PgtfFEekoLrb.png)

**
**

**Material在渲染管线中哪个位置呢？其实就是对应管线中Fragment片元处理的过程，就像拿起一直画笔，读取Material设置的参数变量（化妆品），一一涂抹的过程。**

**下面这个图，是我自己整理的：**

![chrome_4ZCu9Fv6Yj.png](https://i.loli.net/2021/04/25/63FqKEhT5t7fUpS.png)

### 3.1 Material

一个Material，需要考虑哪些东西？

先来看看three.js里面Material.js构造函数中的定义：

```
function Material() {

    Object.defineProperty( this, 'id', { value: materialId ++ } );

    this.uuid = MathUtils.generateUUID();

    this.name = '';
    this.type = 'Material';

    this.fog = true;

    this.blending = NormalBlending;
    this.side = FrontSide;
    this.vertexColors = false;

    this.opacity = 1;
    this.transparent = false;

    this.blendSrc = SrcAlphaFactor;
    this.blendDst = OneMinusSrcAlphaFactor;
    this.blendEquation = AddEquation;
    this.blendSrcAlpha = null;
    this.blendDstAlpha = null;
    this.blendEquationAlpha = null;

    this.depthFunc = LessEqualDepth;
    this.depthTest = true;
    this.depthWrite = true;

    this.stencilWriteMask = 0xff;
    this.stencilFunc = AlwaysStencilFunc;
    this.stencilRef = 0;
    this.stencilFuncMask = 0xff;
    this.stencilFail = KeepStencilOp;
    this.stencilZFail = KeepStencilOp;
    this.stencilZPass = KeepStencilOp;
    this.stencilWrite = false;

    this.clippingPlanes = null;
    this.clipIntersection = false;
    this.clipShadows = false;

    this.shadowSide = null;

    this.colorWrite = true;

    this.precision = null; // override the renderer's default precision for this material

    this.polygonOffset = false;
    this.polygonOffsetFactor = 0;
    this.polygonOffsetUnits = 0;

    this.dithering = false;

    this.alphaTest = 0;
    this.alphaToCoverage = false;
    this.premultipliedAlpha = false;

    this.visible = true;

    this.toneMapped = true;

    this.userData = {};

    this.version = 0;

}
```

这些参数的控制，主要都是直接面向控制硬件的，可以归结为如下几点：

1. 透明度控制：transparent是否启用透明度开关、opacity 透明度的值
2. Buffer测试：Scissor测试、Stencil测试、Depth测试
3. Blend融合：控制最终融合的参数;可以参考[WebGL绘制详解之七：Blend](http://www.jiazhengblog.com/blog/2017/01/04/2989/)
4. visible: 可见性
5. side: 绘制的side控制，顺时针绘制，逆时针绘制，还是双面都绘制。
6. 其他控制参数：clip裁剪、polygonoffset控制等等

![QQPCRealTimeSpeedup_kNJJKEytTZ.png](https://i.loli.net/2021/04/25/tOf2i1doZJquEUn.png)


这些参数，对应[WebGLRenderingContext](https://developer.mozilla.org/zh-CN/docs/Web/API/WebGLRenderingContext)下的状态信息：

[`WebGLRenderingContext.activeTexture()`](https://developer.mozilla.org/zh-CN/docs/Web/API/WebGLRenderingContext/activeTexture)选择要激活的纹理单元。

[`WebGLRenderingContext.blendColor()`](https://developer.mozilla.org/zh-CN/docs/Web/API/WebGLRenderingContext/blendColor)设置源和目标的混和因子。

[`WebGLRenderingContext.blendEquation()`](https://developer.mozilla.org/zh-CN/docs/Web/API/WebGLRenderingContext/blendEquation)用同一个表达式设置 RGB 混和表达式和 alpha 混和表达式。[`WebGLRenderingContext.blendEquationSeparate()`](https://developer.mozilla.org/zh-CN/docs/Web/API/WebGLRenderingContext/blendEquationSeparate)分开设置 RGB 混和表达式和 alpha 混和表达式。

[`WebGLRenderingContext.blendFunc()`](https://developer.mozilla.org/zh-CN/docs/Web/API/WebGLRenderingContext/blendFunc)定义用于像素混合算法的函数。

[`WebGLRenderingContext.blendFuncSeparate()` (en-US)](https://developer.mozilla.org/en-US/docs/Web/API/WebGLRenderingContext/blendFuncSeparate)分别定义混合像素RGB通道和透明通道的函数。

[`WebGLRenderingContext.clearColor()`](https://developer.mozilla.org/zh-CN/docs/Web/API/WebGLRenderingContext/clearColor)设置用于清空用的颜色。

[`WebGLRenderingContext.clearDepth()`](https://developer.mozilla.org/zh-CN/docs/Web/API/WebGLRenderingContext/clearDepth)设置清除深度缓存时的深度值。

[`WebGLRenderingContext.clearStencil()` (en-US)](https://developer.mozilla.org/en-US/docs/Web/API/WebGLRenderingContext/clearStencil)设置清除模板缓冲区时的模板值。

[`WebGLRenderingContext.colorMask()` (en-US)](https://developer.mozilla.org/en-US/docs/Web/API/WebGLRenderingContext/colorMask)设置在绘制或渲染[`WebGLFramebuffer`](https://developer.mozilla.org/zh-CN/docs/Web/API/WebGLFramebuffer)时要开启或关闭的颜色分量。[`WebGLRenderingContext.cullFace()`](https://developer.mozilla.org/zh-CN/docs/Web/API/WebGLRenderingContext/cullFace)设置多边形的正面和/或反面是否要被排除。

[`WebGLRenderingContext.depthFunc()`](https://developer.mozilla.org/zh-CN/docs/Web/API/WebGLRenderingContext/depthFunc)设置比较输入像素深度和深度缓存值得函数。

[`WebGLRenderingContext.depthMask()`](https://developer.mozilla.org/zh-CN/docs/Web/API/WebGLRenderingContext/depthMask)设置是否写入深度缓存。

[`WebGLRenderingContext.depthRange()` (en-US)](https://developer.mozilla.org/en-US/docs/Web/API/WebGLRenderingContext/depthRange)设置从规范化设备坐标映射到窗口或视口坐标时的深度范围。

[`WebGLRenderingContext.disable()`](https://developer.mozilla.org/zh-CN/docs/Web/API/WebGLRenderingContext/disable)禁用这个上下文的WebGL功能。

[`WebGLRenderingContext.enable()`](https://developer.mozilla.org/zh-CN/docs/Web/API/WebGLRenderingContext/enable)启用这个上下文的WebGL功能。

[`WebGLRenderingContext.frontFace()` (en-US)](https://developer.mozilla.org/en-US/docs/Web/API/WebGLRenderingContext/frontFace)设置多边形的正面使用顺时针还是逆时针绘制表示。

[`WebGLRenderingContext.getParameter()`](https://developer.mozilla.org/zh-CN/docs/Web/API/WebGLRenderingContext/getParameter)返回给入参数名的值。

[`WebGLRenderingContext.getError()` (en-US)](https://developer.mozilla.org/en-US/docs/Web/API/WebGLRenderingContext/getError)返回错误信息。

[`WebGLRenderingContext.hint()` (en-US)](https://developer.mozilla.org/en-US/docs/Web/API/WebGLRenderingContext/hint)给某些行为设置建议使用的模式。具体建议需要看执行的情况。

[`WebGLRenderingContext.isEnabled()`](https://developer.mozilla.org/zh-CN/docs/Web/API/WebGLRenderingContext/isEnabled)测试这个上下文的WebGL功能是否开启。

[`WebGLRenderingContext.lineWidth()` (en-US)](https://developer.mozilla.org/en-US/docs/Web/API/WebGLRenderingContext/lineWidth)设置线宽。

[`WebGLRenderingContext.pixelStorei()`](https://developer.mozilla.org/zh-CN/docs/Web/API/WebGLRenderingContext/pixelStorei)设置像素存储模式。

[`WebGLRenderingContext.polygonOffset()`](https://developer.mozilla.org/zh-CN/docs/Web/API/WebGLRenderingContext/polygonOffset)设置多边形偏移的比例和单位，从而计算深度值。（补充：解决深度冲突）[`WebGLRenderingContext.sampleCoverage()` (en-US)](https://developer.mozilla.org/en-US/docs/Web/API/WebGLRenderingContext/sampleCoverage)为抗锯齿效果设置多重取样覆盖参数。

[`WebGLRenderingContext.stencilFunc()` (en-US)](https://developer.mozilla.org/en-US/docs/Web/API/WebGLRenderingContext/stencilFunc)同时设置前面和背面的模板测试函数，及其引用值。[`WebGLRenderingContext.stencilFuncSeparate()` (en-US)](https://developer.mozilla.org/en-US/docs/Web/API/WebGLRenderingContext/stencilFuncSeparate)可分开设置前面或背面的模板测试函数，及其引用值。[`WebGLRenderingContext.stencilMask()` (en-US)](https://developer.mozilla.org/en-US/docs/Web/API/WebGLRenderingContext/stencilMask)同时启用或禁用，前面和背面的模板测试掩码。[`WebGLRenderingContext.stencilMaskSeparate()` (en-US)](https://developer.mozilla.org/en-US/docs/Web/API/WebGLRenderingContext/stencilMaskSeparate)可分开启用或禁用，前面和背面的模板测试掩码。

[`WebGLRenderingContext.stencilOp()` (en-US)](https://developer.mozilla.org/en-US/docs/Web/API/WebGLRenderingContext/stencilOp)同时设置，在前面和背面的模板缓冲区上执行的操作。[`WebGLRenderingContext.stencilOpSeparate()` (en-US)](https://developer.mozilla.org/en-US/docs/Web/API/WebGLRenderingContext/stencilOpSeparate)可分开设置，在前面和背面的模板缓冲区上执行的操作。

## 4. BasicMaterial

基本材质有哪些东西需要考虑？

看看MeshBasicMaterial的构造函数定义:

```
constructor( parameters ) {

        super();

        this.type = 'MeshBasicMaterial';

        this.color = new Color( 0xffffff ); // emissive

        this.map = null;

        this.lightMap = null;
        this.lightMapIntensity = 1.0;

        this.aoMap = null;
        this.aoMapIntensity = 1.0;

        this.specularMap = null;

        this.alphaMap = null;

        this.envMap = null;
        this.combine = MultiplyOperation;
        this.reflectivity = 1;
        this.refractionRatio = 0.98;

        this.wireframe = false;
        this.wireframeLinewidth = 1;
        this.wireframeLinecap = 'round';
        this.wireframeLinejoin = 'round';

        this.skinning = false;
        this.morphTargets = false;

        this.setValues( parameters );

    }
```

对应主要参数理解为：

1. type: 材质的类型，穿着布料的类型
2. color: 材质的颜色，穿着布料的基本颜色
3. map:  材质的贴图，穿着布料上的图片，花纹
4. lightmap: 灯光贴图，物体的不同部分对光有不同反映
5. aomap：环境光遮蔽体贴，就像画眼影，在一些细节支出，增加立体效果
6. specularMap：高光贴图，就是一种特殊的贴图而已，打光
7. envMap：环境贴图，就是整个环境在人身上的映射
8. combine：就是环境光贴图与灯光之间计算的方式，有三种：add, mix，multiply，计算方式不同，最终输出结果自然不同

```
if ( parameters.envMap ) {

        switch ( parameters.combine ) {

            case MultiplyOperation:
                envMapBlendingDefine = 'ENVMAP_BLENDING_MULTIPLY';
                break;

            case MixOperation:
                envMapBlendingDefine = 'ENVMAP_BLENDING_MIX';
                break;

            case AddOperation:
                envMapBlendingDefine = 'ENVMAP_BLENDING_ADD';
                break;
        }
    }
```

对应shader代码：

```
#ifdef ENVMAP_BLENDING_MULTIPLY
            outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
            #elif defined( ENVMAP_BLENDING_MIX )
            outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
            #elif defined( ENVMAP_BLENDING_ADD )
            outgoingLight += envColor.xyz * specularStrength * reflectivity;
        #endif
```

来段代码试试效果，在client.ts中加入代码：

```
import * as THREE from 'three';
import { Geometry } from 'three/examples/jsm/deprecated/Geometry';
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
const icosahedronGeometry: THREE.IcosahedronGeometry = new THREE.IcosahedronGeometry(
  1,
  0
);
const planeGeometry: THREE.PlaneGeometry = new THREE.PlaneGeometry();
const torusKnotGeometry: THREE.TorusKnotGeometry = new THREE.TorusKnotGeometry();

const material: THREE.MeshBasicMaterial = new THREE.MeshBasicMaterial(); //{ color: 0x00ff00, wireframe: true })

const texture = new THREE.TextureLoader().load('images/grid_25.jpg');
material.map = texture;

const envTexture = new THREE.CubeTextureLoader().load([
  'images/px_25.jpg',
  'images/nx_25.jpg',
  'images/py_25.jpg',
  'images/ny_25.jpg',
  'images/pz_25.jpg',
  'images/nz_25.jpg',
]);
//envTexture.mapping = THREE.CubeReflectionMapping
envTexture.mapping = THREE.CubeRefractionMapping;
material.envMap = envTexture;

const cube: THREE.Mesh = new THREE.Mesh(boxGeometry, material);
cube.position.x = 5;
scene.add(cube);

const sphere: THREE.Mesh = new THREE.Mesh(sphereGeometry, material);
sphere.position.x = 3;
scene.add(sphere);

const icosahedron: THREE.Mesh = new THREE.Mesh(icosahedronGeometry, material);
icosahedron.position.x = 0;
scene.add(icosahedron);

const plane: THREE.Mesh = new THREE.Mesh(planeGeometry, material);
plane.position.x = -2;
scene.add(plane);

const torusKnot: THREE.Mesh = new THREE.Mesh(torusKnotGeometry, material);
torusKnot.position.x = -5;
scene.add(torusKnot);

camera.position.z = 3;

window.addEventListener('resize', onWindowResize, false);
function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
  render();
}

const stats = Stats();
document.body.appendChild(stats.dom);

var options = {
  side: {
    FrontSide: THREE.FrontSide,
    BackSide: THREE.BackSide,
    DoubleSide: THREE.DoubleSide,
  },
  combine: {
    MultiplyOperation: THREE.MultiplyOperation,
    MixOperation: THREE.MixOperation,
    AddOperation: THREE.AddOperation,
  },
};
const gui = new GUI();

const materialFolder = gui.addFolder('THREE.Material');
materialFolder.add(material, 'transparent');
materialFolder.add(material, 'opacity', 0, 1, 0.01);
materialFolder.add(material, 'depthTest');
materialFolder.add(material, 'depthWrite');
materialFolder
  .add(material, 'alphaTest', 0, 1, 0.01)
  .onChange(() => updateMaterial());
materialFolder.add(material, 'visible');
materialFolder
  .add(material, 'side', options.side)
  .onChange(() => updateMaterial());
materialFolder.open();

var data = {
  color: material.color.getHex(),
};

var meshBasicMaterialFolder = gui.addFolder('THREE.MeshBasicMaterial');
meshBasicMaterialFolder.addColor(data, 'color').onChange(() => {
  material.color.setHex(Number(data.color.toString().replace('#', '0x')));
});
meshBasicMaterialFolder.add(material, 'wireframe');
//meshBasicMaterialFolder.add(material, 'wireframeLinewidth', 0, 10);
meshBasicMaterialFolder
  .add(material, 'combine', options.combine)
  .onChange(() => updateMaterial());
meshBasicMaterialFolder.add(material, 'reflectivity', 0, 1);
meshBasicMaterialFolder.add(material, 'refractionRatio', 0, 1);
meshBasicMaterialFolder.open();

function updateMaterial() {
  material.side = Number(material.side);
  material.combine = Number(material.combine);
  material.needsUpdate = true;
}

var animate = function () {
  requestAnimationFrame(animate);
  render();
  stats.update();
};

function render() {
  renderer.render(scene, camera);
}
animate();
```

执行脚本：

```
npm run dev
```

![chrome_wXHQblqRip.png](https://i.loli.net/2021/04/25/rhuvJOlxiB4gMXL.png)

## 5. SpectorJS调试

我们来使用babylon的inspector.js工具，分析一下，材质最终在shader里的流程。

首先，安装一下SpectorJS这个插件，用于chrome上的webgl调试，github地址：https://github.com/BabylonJS/Spector.js/blob/master/readme.md



使用Spector工具，获取调试信息如图：

### 5.1 Information信息

![chrome_pXlbCVQIqi.png](https://i.loli.net/2021/04/25/TDylfjFUbkdVc8w.png)

主要信息有：

1. Canvas信息：介绍Canvas的尺寸，浏览器属性；

```
width: 1920
height: 519
clientWidth: 1920
clientHeight: 519
browserAgent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/89.0.4389.114 Safari/537.36
```

1. Context信息：介绍WebGLRenderContext的属性信息

```
Context
version: 2
Context Attributes
alpha: false
antialias: false
depth: true
failIfMajorPerformanceCaveat: false
powerPreference: default
premultipliedAlpha: true
preserveDrawingBuffer: false
stencil: true
desynchronized: false
xrCompatible: false
Capabilities
RENDERER: WebKit WebGL
VENDOR: WebKit
VERSION: WebGL 2.0 (OpenGL ES 3.0 Chromium)
SHADING_LANGUAGE_VERSION: WebGL GLSL ES 3.00 (OpenGL ES GLSL ES 3.0 Chromium)
SAMPLES: 0
SAMPLE_BUFFERS: 0
RED_BITS: 8
GREEN_BITS: 8
BLUE_BITS: 8
ALPHA_BITS: 0
DEPTH_BITS: 24
STENCIL_BITS: 8
SUBPIXEL_BITS: 4
LINE_WIDTH: 1
ALIASED_LINE_WIDTH_RANGE: 1, 1
ALIASED_POINT_SIZE_RANGE: 1, 1024
IMPLEMENTATION_COLOR_READ_FORMAT: RGBA
IMPLEMENTATION_COLOR_READ_TYPE: UNSIGNED_BYTE
MAX_COMBINED_TEXTURE_IMAGE_UNITS: 32
MAX_CUBE_MAP_TEXTURE_SIZE: 16384
MAX_FRAGMENT_UNIFORM_VECTORS: 1024
MAX_RENDERBUFFER_SIZE: 16384
MAX_TEXTURE_IMAGE_UNITS: 16
MAX_TEXTURE_SIZE: 16384
MAX_VARYING_VECTORS: 30
MAX_VERTEX_ATTRIBS: 16
MAX_VERTEX_TEXTURE_IMAGE_UNITS: 16
MAX_VERTEX_UNIFORM_VECTORS: 4096
MAX_VIEWPORT_DIMS: 32767, 32767
MAX_TEXTURE_MAX_ANISOTROPY_EXT: 16
MAX_COLOR_ATTACHMENTS_WEBGL: Extension WEBGL_draw_buffers is unavailble.
MAX_DRAW_BUFFERS_WEBGL: Extension WEBGL_draw_buffers is unavailble.
MAX_3D_TEXTURE_SIZE: 2048
MAX_ARRAY_TEXTURE_LAYERS: 2048
MAX_CLIENT_WAIT_TIMEOUT_WEBGL: 0
MAX_COLOR_ATTACHMENTS: 8
MAX_COMBINED_FRAGMENT_UNIFORM_COMPONENTS: 200704
MAX_COMBINED_UNIFORM_BLOCKS: 24
MAX_COMBINED_VERTEX_UNIFORM_COMPONENTS: 212992
MAX_DRAW_BUFFERS: 8
MAX_ELEMENT_INDEX: 4294967294
MAX_ELEMENTS_INDICES: 2147483647
MAX_ELEMENTS_VERTICES: 2147483647
MAX_FRAGMENT_INPUT_COMPONENTS: 120
MAX_FRAGMENT_UNIFORM_BLOCKS: 12
MAX_FRAGMENT_UNIFORM_COMPONENTS: 4096
MAX_PROGRAM_TEXEL_OFFSET: 7
MAX_SAMPLES: 16
MAX_SERVER_WAIT_TIMEOUT: 0
MAX_TEXTURE_LOD_BIAS: 2
MAX_TRANSFORM_FEEDBACK_INTERLEAVED_COMPONENTS: 120
MAX_TRANSFORM_FEEDBACK_SEPARATE_ATTRIBS: 4
MAX_TRANSFORM_FEEDBACK_SEPARATE_COMPONENTS: 4
MAX_UNIFORM_BLOCK_SIZE: 65536
MAX_UNIFORM_BUFFER_BINDINGS: 24
MAX_VARYING_COMPONENTS: 120
MAX_VERTEX_OUTPUT_COMPONENTS: 120
MAX_VERTEX_UNIFORM_BLOCKS: 12
MAX_VERTEX_UNIFORM_COMPONENTS: 16384
MIN_PROGRAM_TEXEL_OFFSET: -8
Extensions
EXT_color_buffer_float: true
EXT_disjoint_timer_query: false
EXT_disjoint_timer_query_webgl2: true
EXT_texture_filter_anisotropic: true
OES_texture_float_linear: true
WEBGL_compressed_texture_astc: false
WEBGL_compressed_texture_atc: false
WEBGL_compressed_texture_etc: false
WEBGL_compressed_texture_etc1: false
WEBGL_compressed_texture_pvrtc: false
WEBGL_compressed_texture_s3tc: true
Compressed Textures
COMPRESSED_TEXTURE_FORMATS: COMPRESSED_RGB_S3TC_DXT1_EXT, COMPRESSED_RGBA_S3TC_DXT1_EXT, COMPRESSED_RGBA_S3TC_DXT3_EXT, COMPRESSED_RGBA_S3TC_DXT5_EXT
```

1. Commands信息:主要调用drawElement接口的次数、切换program的次数、clear的次数、激活贴图activeTexture的次数，绑定顶点数据VAO的次数，传输uniform的次数,在分析性能的时候，这些次数的调用很有帮助，一言以蔽之，就是减少drawCall，而这些数量，就是drawCall息息相关。

```
Commands
uniformMatrix4fv: 10
bindVertexArray: 6
drawElements: 4
activeTexture: 2
drawArrays: 2
useProgram: 2
clear: 1
Commands Summary
total: 27
draw: 6
clear: 1
```



1. Primitives：绘制点、线、面的数量，一般是性能高低的重要指标。

```
Primitives
total: 3420
triangles: 3414
triangleStrip: 0
triangleFan: 0
lines: 6
lineStrip: 0
lineLoop: 0
points: 0
```

1. Memory: 使用Memory的相关信息，各种Buffer的使用情况；

```
Frame Memory Changes
Buffer: 0
Renderbuffer: 0
Texture2d: 0
Texture3d: 0
Program: 0
Total Memory (Seconds Since Application Start: Bytes)
Buffer
0: 23696
7: 30404
Texture2d
0: 28
8: 6113308
Program
0: 25926
7: 52207
```



### 5.2 Init State

![chrome_YkByk3Svon.png](https://i.loli.net/2021/04/25/PiAMTzqVXkN9DId.png)

初始化的一些状态标志；

### 5.3 End State

![chrome_4lxMUydbip.png](https://i.loli.net/2021/04/25/ZNB7HEw56ork2W4.png)

结束状态标志。

### 5.4 Commands

![chrome_VwT9MpL8oJ.png](https://i.loli.net/2021/04/25/ZXehup5YF6wr4nH.png)

重点就是Commands的信息，可以查看一共调用了哪些指令，每个指令对应的参数是什么，传入的attribute、uniform、Texture等数据。

![chrome_sCPC7Eb8Jk.png](https://i.loli.net/2021/04/25/T3Z6a7e8hcQOtnl.png)

点击这里的材质，可以查看到具体的Vertex Shader和Fragment Shader。

### 5.5 Vertex Shader

```
#version 300 es
#define attribute in
#define varying out
#define texture2D texture
precision highp float;
precision highp int;
#define HIGH_PRECISION
#define SHADER_NAME MeshBasicMaterial
#define VERTEX_TEXTURES
#define GAMMA_FACTOR 2
#define MAX_BONES 0
#define USE_MAP
#define USE_ENVMAP
#define ENVMAP_MODE_REFRACTION
#define USE_UV
#define BONE_TEXTURE
uniform mat4 modelMatrix;
uniform mat4 modelViewMatrix;
uniform mat4 projectionMatrix;
uniform mat4 viewMatrix;
uniform mat3 normalMatrix;
uniform vec3 cameraPosition;
uniform bool isOrthographic;
#ifdef USE_INSTANCING
    attribute mat4 instanceMatrix;
#endif
#ifdef USE_INSTANCING_COLOR
    attribute vec3 instanceColor;
#endif
attribute vec3 position;
attribute vec3 normal;
attribute vec2 uv;
#ifdef USE_TANGENT
    attribute vec4 tangent;
#endif
#ifdef USE_COLOR
    attribute vec3 color;
#endif
#ifdef USE_MORPHTARGETS
    attribute vec3 morphTarget0;
    attribute vec3 morphTarget1;
    attribute vec3 morphTarget2;
    attribute vec3 morphTarget3;
    #ifdef USE_MORPHNORMALS
        attribute vec3 morphNormal0;
        attribute vec3 morphNormal1;
        attribute vec3 morphNormal2;
        attribute vec3 morphNormal3;
    #else
        attribute vec3 morphTarget4;
        attribute vec3 morphTarget5;
        attribute vec3 morphTarget6;
        attribute vec3 morphTarget7;
    #endif
#endif
#ifdef USE_SKINNING
    attribute vec4 skinIndex;
    attribute vec4 skinWeight;
#endif

#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
    #define saturate(a) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement(a) ( 1.0 - saturate( a ) )
float pow2( const in float x ) {
    return x*x;
}
float pow3( const in float x ) {
    return x*x*x;
}
float pow4( const in float x ) {
    float x2 = x*x;
    return x2*x2;
}
float average( const in vec3 color ) {
    return dot( color, vec3( 0.3333 ) );
}
highp float rand( const in vec2 uv ) {
    const highp float a = 12.9898, b = 78.233, c = 43758.5453;
    highp float dt = dot( uv.xy, vec2( a, b ) ), sn = mod( dt, PI );
    return fract(sin(sn) * c);
}
#ifdef HIGH_PRECISION
    float precisionSafeLength( vec3 v ) {
        return length( v );
    }
#else
    float max3( vec3 v ) {
        return max( max( v.x, v.y ), v.z );
    }
    float precisionSafeLength( vec3 v ) {
        float maxComponent = max3( abs( v ) );
        return length( v / maxComponent ) * maxComponent;
    }
#endif
struct IncidentLight {
    vec3 color;
    vec3 direction;
    bool visible;
};
struct ReflectedLight {
    vec3 directDiffuse;
    vec3 directSpecular;
    vec3 indirectDiffuse;
    vec3 indirectSpecular;
};
struct GeometricContext {
    vec3 position;
    vec3 normal;
    vec3 viewDir;
    #ifdef CLEARCOAT
        vec3 clearcoatNormal;
    #endif
};
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
    return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
vec3 inverseTransformDirection( in vec3 dir, in mat4 matrix ) {
    return normalize( ( vec4( dir, 0.0 ) * matrix ).xyz );
}
vec3 projectOnPlane(in vec3 point, in vec3 pointOnPlane, in vec3 planeNormal ) {
    float distance = dot( planeNormal, point - pointOnPlane );
    return - distance * planeNormal + point;
}
float sideOfPlane( in vec3 point, in vec3 pointOnPlane, in vec3 planeNormal ) {
    return sign( dot( point - pointOnPlane, planeNormal ) );
}
vec3 linePlaneIntersect( in vec3 pointOnLine, in vec3 lineDirection, in vec3 pointOnPlane, in vec3 planeNormal ) {
    return lineDirection * ( dot( planeNormal, pointOnPlane - pointOnLine ) / dot( planeNormal, lineDirection ) ) + pointOnLine;
}
mat3 transposeMat3( const in mat3 m ) {
    mat3 tmp;
    tmp[ 0 ] = vec3( m[ 0 ].x, m[ 1 ].x, m[ 2 ].x );
    tmp[ 1 ] = vec3( m[ 0 ].y, m[ 1 ].y, m[ 2 ].y );
    tmp[ 2 ] = vec3( m[ 0 ].z, m[ 1 ].z, m[ 2 ].z );
    return tmp;
}
float linearToRelativeLuminance( const in vec3 color ) {
    vec3 weights = vec3( 0.2126, 0.7152, 0.0722 );
    return dot( weights, color.rgb );
}
bool isPerspectiveMatrix( mat4 m ) {
    return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
    float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
    float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
    return vec2( u, v );
}
#ifdef USE_UV
    #ifdef UVS_VERTEX_ONLY
        vec2 vUv;
    #else
        varying vec2 vUv;
    #endif
    uniform mat3 uvTransform;
#endif
#if defined( USE_LIGHTMAP ) || defined( USE_AOMAP )
    attribute vec2 uv2;
    varying vec2 vUv2;
    uniform mat3 uv2Transform;
#endif
#ifdef USE_ENVMAP
    #if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) ||defined( PHONG )
        #define ENV_WORLDPOS
    #endif
    #ifdef ENV_WORLDPOS
        
        varying vec3 vWorldPosition;
    #else
        varying vec3 vReflect;
        uniform float refractionRatio;
    #endif
#endif
#if defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR )
    varying vec3 vColor;
#endif
#ifdef USE_FOG
    varying float fogDepth;
#endif
#ifdef USE_MORPHTARGETS
    uniform float morphTargetBaseInfluence;
    #ifndef USE_MORPHNORMALS
        uniform float morphTargetInfluences[ 8 ];
    #else
        uniform float morphTargetInfluences[ 4 ];
    #endif
#endif
#ifdef USE_SKINNING
    uniform mat4 bindMatrix;
    uniform mat4 bindMatrixInverse;
    #ifdef BONE_TEXTURE
        uniform highp sampler2D boneTexture;
        uniform int boneTextureSize;
        mat4 getBoneMatrix( const in float i ) {
            float j = i * 4.0;
            float x = mod( j, float( boneTextureSize ) );
            float y = floor( j / float( boneTextureSize ) );
            float dx = 1.0 / float( boneTextureSize );
            float dy = 1.0 / float( boneTextureSize );
            y = dy * ( y + 0.5 );
            vec4 v1 = texture2D( boneTexture, vec2( dx * ( x + 0.5 ), y ) );
            vec4 v2 = texture2D( boneTexture, vec2( dx * ( x + 1.5 ), y ) );
            vec4 v3 = texture2D( boneTexture, vec2( dx * ( x + 2.5 ), y ) );
            vec4 v4 = texture2D( boneTexture, vec2( dx * ( x + 3.5 ), y ) );
            mat4 bone = mat4( v1, v2, v3, v4 );
            return bone;
        }
    #else
        uniform mat4 boneMatrices[ MAX_BONES ];
        mat4 getBoneMatrix( const in float i ) {
            mat4 bone = boneMatrices[ int(i) ];
            return bone;
        }
    #endif
#endif
#ifdef USE_LOGDEPTHBUF
    #ifdef USE_LOGDEPTHBUF_EXT
        varying float vFragDepth;
        varying float vIsPerspective;
    #else
        uniform float logDepthBufFC;
    #endif
#endif
#if 0 > 0
    varying vec3 vClipPosition;
#endif
void main() {
    #ifdef USE_UV
        vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
    #endif
    #if defined( USE_LIGHTMAP ) || defined( USE_AOMAP )
        vUv2 = ( uv2Transform * vec3( uv2, 1 ) ).xy;
    #endif
    #if defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR )
        vColor = vec3( 1.0 );
    #endif
    #ifdef USE_COLOR
        vColor.xyz *= color.xyz;
    #endif
    #ifdef USE_INSTANCING_COLOR
        vColor.xyz *= instanceColor.xyz;
    #endif
    #ifdef USE_SKINNING
        mat4 boneMatX = getBoneMatrix( skinIndex.x );
        mat4 boneMatY = getBoneMatrix( skinIndex.y );
        mat4 boneMatZ = getBoneMatrix( skinIndex.z );
        mat4 boneMatW = getBoneMatrix( skinIndex.w );
    #endif
    #ifdef USE_ENVMAP
        vec3 objectNormal = vec3( normal );
        #ifdef USE_TANGENT
            vec3 objectTangent = vec3( tangent.xyz );
        #endif
        #ifdef USE_MORPHNORMALS
            objectNormal *= morphTargetBaseInfluence;
            objectNormal += morphNormal0 * morphTargetInfluences[ 0 ];
            objectNormal += morphNormal1 * morphTargetInfluences[ 1 ];
            objectNormal += morphNormal2 * morphTargetInfluences[ 2 ];
            objectNormal += morphNormal3 * morphTargetInfluences[ 3 ];
        #endif
        #ifdef USE_SKINNING
            mat4 skinMatrix = mat4( 0.0 );
            skinMatrix += skinWeight.x * boneMatX;
            skinMatrix += skinWeight.y * boneMatY;
            skinMatrix += skinWeight.z * boneMatZ;
            skinMatrix += skinWeight.w * boneMatW;
            skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
            objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
            #ifdef USE_TANGENT
                objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
            #endif
        #endif
        vec3 transformedNormal = objectNormal;
        #ifdef USE_INSTANCING
            mat3 m = mat3( instanceMatrix );
            transformedNormal /= vec3( dot( m[ 0 ], m[ 0 ] ), dot( m[ 1 ], m[ 1 ] ), dot( m[ 2 ], m[ 2 ] ) );
            transformedNormal = m * transformedNormal;
        #endif
        transformedNormal = normalMatrix * transformedNormal;
        #ifdef FLIP_SIDED
            transformedNormal = - transformedNormal;
        #endif
        #ifdef USE_TANGENT
            vec3 transformedTangent = ( modelViewMatrix * vec4( objectTangent, 0.0 ) ).xyz;
            #ifdef FLIP_SIDED
                transformedTangent = - transformedTangent;
            #endif
        #endif
    #endif
    vec3 transformed = vec3( position );
    #ifdef USE_MORPHTARGETS
        transformed *= morphTargetBaseInfluence;
        transformed += morphTarget0 * morphTargetInfluences[ 0 ];
        transformed += morphTarget1 * morphTargetInfluences[ 1 ];
        transformed += morphTarget2 * morphTargetInfluences[ 2 ];
        transformed += morphTarget3 * morphTargetInfluences[ 3 ];
        #ifndef USE_MORPHNORMALS
            transformed += morphTarget4 * morphTargetInfluences[ 4 ];
            transformed += morphTarget5 * morphTargetInfluences[ 5 ];
            transformed += morphTarget6 * morphTargetInfluences[ 6 ];
            transformed += morphTarget7 * morphTargetInfluences[ 7 ];
        #endif
    #endif
    #ifdef USE_SKINNING
        vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
        vec4 skinned = vec4( 0.0 );
        skinned += boneMatX * skinVertex * skinWeight.x;
        skinned += boneMatY * skinVertex * skinWeight.y;
        skinned += boneMatZ * skinVertex * skinWeight.z;
        skinned += boneMatW * skinVertex * skinWeight.w;
        transformed = ( bindMatrixInverse * skinned ).xyz;
    #endif
    vec4 mvPosition = vec4( transformed, 1.0 );
    #ifdef USE_INSTANCING
        mvPosition = instanceMatrix * mvPosition;
    #endif
    mvPosition = modelViewMatrix * mvPosition;
    gl_Position = projectionMatrix * mvPosition;
    #ifdef USE_LOGDEPTHBUF
        #ifdef USE_LOGDEPTHBUF_EXT
            vFragDepth = 1.0 + gl_Position.w;
            vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
        #else
            if ( isPerspectiveMatrix( projectionMatrix ) ) {
                gl_Position.z = log2( max( EPSILON, gl_Position.w + 1.0 ) ) * logDepthBufFC - 1.0;
                gl_Position.z *= gl_Position.w;
            }
        #endif
    #endif
    #if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP )
        vec4 worldPosition = vec4( transformed, 1.0 );
        #ifdef USE_INSTANCING
            worldPosition = instanceMatrix * worldPosition;
        #endif
        worldPosition = modelMatrix * worldPosition;
    #endif
    #if 0 > 0
        vClipPosition = - mvPosition.xyz;
    #endif
    #ifdef USE_ENVMAP
        #ifdef ENV_WORLDPOS
            vWorldPosition = worldPosition.xyz;
        #else
            vec3 cameraToVertex;
            if ( isOrthographic ) {
                cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
            }
            else {
                cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
            }
            vec3 worldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
            #ifdef ENVMAP_MODE_REFLECTION
                vReflect = reflect( cameraToVertex, worldNormal );
            #else
                vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
            #endif
        #endif
    #endif
    #ifdef USE_FOG
        fogDepth = - mvPosition.z;
    #endif
}
```



### 5.6 Fragment Shader

```
#version 300 es
#define varying in
out highp vec4 pc_fragColor;
#define gl_FragColor pc_fragColor
#define gl_FragDepthEXT gl_FragDepth
#define texture2D texture
#define textureCube texture
#define texture2DProj textureProj
#define texture2DLodEXT textureLod
#define texture2DProjLodEXT textureProjLod
#define textureCubeLodEXT textureLod
#define texture2DGradEXT textureGrad
#define texture2DProjGradEXT textureProjGrad
#define textureCubeGradEXT textureGrad
precision highp float;
precision highp int;
#define HIGH_PRECISION
#define SHADER_NAME MeshBasicMaterial
#define GAMMA_FACTOR 2
#define USE_MAP
#define USE_ENVMAP
#define ENVMAP_TYPE_CUBE
#define ENVMAP_MODE_REFRACTION
#define ENVMAP_BLENDING_MULTIPLY
#define USE_UV
#define TEXTURE_LOD_EXT
uniform mat4 viewMatrix;
uniform vec3 cameraPosition;
uniform bool isOrthographic;
vec4 LinearToLinear( in vec4 value ) {
    return value;
}
vec4 GammaToLinear( in vec4 value, in float gammaFactor ) {
    return vec4( pow( value.rgb, vec3( gammaFactor ) ), value.a );
}
vec4 LinearToGamma( in vec4 value, in float gammaFactor ) {
    return vec4( pow( value.rgb, vec3( 1.0 / gammaFactor ) ), value.a );
}
vec4 sRGBToLinear( in vec4 value ) {
    return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 LinearTosRGB( in vec4 value ) {
    return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}
vec4 RGBEToLinear( in vec4 value ) {
    return vec4( value.rgb * exp2( value.a * 255.0 - 128.0 ), 1.0 );
}
vec4 LinearToRGBE( in vec4 value ) {
    float maxComponent = max( max( value.r, value.g ), value.b );
    float fExp = clamp( ceil( log2( maxComponent ) ), -128.0, 127.0 );
    return vec4( value.rgb / exp2( fExp ), ( fExp + 128.0 ) / 255.0 );
}
vec4 RGBMToLinear( in vec4 value, in float maxRange ) {
    return vec4( value.rgb * value.a * maxRange, 1.0 );
}
vec4 LinearToRGBM( in vec4 value, in float maxRange ) {
    float maxRGB = max( value.r, max( value.g, value.b ) );
    float M = clamp( maxRGB / maxRange, 0.0, 1.0 );
    M = ceil( M * 255.0 ) / 255.0;
    return vec4( value.rgb / ( M * maxRange ), M );
}
vec4 RGBDToLinear( in vec4 value, in float maxRange ) {
    return vec4( value.rgb * ( ( maxRange / 255.0 ) / value.a ), 1.0 );
}
vec4 LinearToRGBD( in vec4 value, in float maxRange ) {
    float maxRGB = max( value.r, max( value.g, value.b ) );
    float D = max( maxRange / maxRGB, 1.0 );
    D = clamp( floor( D ) / 255.0, 0.0, 1.0 );
    return vec4( value.rgb * ( D * ( 255.0 / maxRange ) ), D );
}
const mat3 cLogLuvM = mat3( 0.2209, 0.3390, 0.4184, 0.1138, 0.6780, 0.7319, 0.0102, 0.1130, 0.2969 );
vec4 LinearToLogLuv( in vec4 value ) {
    vec3 Xp_Y_XYZp = cLogLuvM * value.rgb;
    Xp_Y_XYZp = max( Xp_Y_XYZp, vec3( 1e-6, 1e-6, 1e-6 ) );
    vec4 vResult;
    vResult.xy = Xp_Y_XYZp.xy / Xp_Y_XYZp.z;
    float Le = 2.0 * log2(Xp_Y_XYZp.y) + 127.0;
    vResult.w = fract( Le );
    vResult.z = ( Le - ( floor( vResult.w * 255.0 ) ) / 255.0 ) / 255.0;
    return vResult;
}
const mat3 cLogLuvInverseM = mat3( 6.0014, -2.7008, -1.7996, -1.3320, 3.1029, -5.7721, 0.3008, -1.0882, 5.6268 );
vec4 LogLuvToLinear( in vec4 value ) {
    float Le = value.z * 255.0 + value.w;
    vec3 Xp_Y_XYZp;
    Xp_Y_XYZp.y = exp2( ( Le - 127.0 ) / 2.0 );
    Xp_Y_XYZp.z = Xp_Y_XYZp.y / value.y;
    Xp_Y_XYZp.x = value.x * Xp_Y_XYZp.z;
    vec3 vRGB = cLogLuvInverseM * Xp_Y_XYZp.rgb;
    return vec4( max( vRGB, 0.0 ), 1.0 );
}
vec4 mapTexelToLinear( vec4 value ) {
    return LinearToLinear( value );
}
vec4 envMapTexelToLinear( vec4 value ) {
    return LinearToLinear( value );
}
vec4 linearToOutputTexel( vec4 value ) {
    return LinearToLinear( value );
}
uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
    varying vec3 vNormal;
#endif
#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
    #define saturate(a) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement(a) ( 1.0 - saturate( a ) )
float pow2( const in float x ) {
    return x*x;
}
float pow3( const in float x ) {
    return x*x*x;
}
float pow4( const in float x ) {
    float x2 = x*x;
    return x2*x2;
}
float average( const in vec3 color ) {
    return dot( color, vec3( 0.3333 ) );
}
highp float rand( const in vec2 uv ) {
    const highp float a = 12.9898, b = 78.233, c = 43758.5453;
    highp float dt = dot( uv.xy, vec2( a, b ) ), sn = mod( dt, PI );
    return fract(sin(sn) * c);
}
#ifdef HIGH_PRECISION
    float precisionSafeLength( vec3 v ) {
        return length( v );
    }
#else
    float max3( vec3 v ) {
        return max( max( v.x, v.y ), v.z );
    }
    float precisionSafeLength( vec3 v ) {
        float maxComponent = max3( abs( v ) );
        return length( v / maxComponent ) * maxComponent;
    }
#endif
struct IncidentLight {
    vec3 color;
    vec3 direction;
    bool visible;
};
struct ReflectedLight {
    vec3 directDiffuse;
    vec3 directSpecular;
    vec3 indirectDiffuse;
    vec3 indirectSpecular;
};
struct GeometricContext {
    vec3 position;
    vec3 normal;
    vec3 viewDir;
    #ifdef CLEARCOAT
        vec3 clearcoatNormal;
    #endif
};
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
    return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
vec3 inverseTransformDirection( in vec3 dir, in mat4 matrix ) {
    return normalize( ( vec4( dir, 0.0 ) * matrix ).xyz );
}
vec3 projectOnPlane(in vec3 point, in vec3 pointOnPlane, in vec3 planeNormal ) {
    float distance = dot( planeNormal, point - pointOnPlane );
    return - distance * planeNormal + point;
}
float sideOfPlane( in vec3 point, in vec3 pointOnPlane, in vec3 planeNormal ) {
    return sign( dot( point - pointOnPlane, planeNormal ) );
}
vec3 linePlaneIntersect( in vec3 pointOnLine, in vec3 lineDirection, in vec3 pointOnPlane, in vec3 planeNormal ) {
    return lineDirection * ( dot( planeNormal, pointOnPlane - pointOnLine ) / dot( planeNormal, lineDirection ) ) + pointOnLine;
}
mat3 transposeMat3( const in mat3 m ) {
    mat3 tmp;
    tmp[ 0 ] = vec3( m[ 0 ].x, m[ 1 ].x, m[ 2 ].x );
    tmp[ 1 ] = vec3( m[ 0 ].y, m[ 1 ].y, m[ 2 ].y );
    tmp[ 2 ] = vec3( m[ 0 ].z, m[ 1 ].z, m[ 2 ].z );
    return tmp;
}
float linearToRelativeLuminance( const in vec3 color ) {
    vec3 weights = vec3( 0.2126, 0.7152, 0.0722 );
    return dot( weights, color.rgb );
}
bool isPerspectiveMatrix( mat4 m ) {
    return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
    float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
    float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
    return vec2( u, v );
}
#ifdef DITHERING
    vec3 dithering( vec3 color ) {
        float grid_position = rand( gl_FragCoord.xy );
        vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
        dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
        return color + dither_shift_RGB;
    }
#endif
#ifdef USE_COLOR
    varying vec3 vColor;
#endif
#if ( defined( USE_UV ) && ! defined( UVS_VERTEX_ONLY ) )
    varying vec2 vUv;
#endif
#if defined( USE_LIGHTMAP ) || defined( USE_AOMAP )
    varying vec2 vUv2;
#endif
#ifdef USE_MAP
    uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
    uniform sampler2D alphaMap;
#endif
#ifdef USE_AOMAP
    uniform sampler2D aoMap;
    uniform float aoMapIntensity;
#endif
#ifdef USE_LIGHTMAP
    uniform sampler2D lightMap;
    uniform float lightMapIntensity;
#endif
#ifdef USE_ENVMAP
    uniform float envMapIntensity;
    uniform float flipEnvMap;
    uniform int maxMipLevel;
    #ifdef ENVMAP_TYPE_CUBE
        uniform samplerCube envMap;
    #else
        uniform sampler2D envMap;
    #endif
    
#endif
#ifdef USE_ENVMAP
    uniform float reflectivity;
    #if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG )
        #define ENV_WORLDPOS
    #endif
    #ifdef ENV_WORLDPOS
        varying vec3 vWorldPosition;
        uniform float refractionRatio;
    #else
        varying vec3 vReflect;
    #endif
#endif
#ifdef ENVMAP_TYPE_CUBE_UV
    #define cubeUV_maxMipLevel 8.0
    #define cubeUV_minMipLevel 4.0
    #define cubeUV_maxTileSize 256.0
    #define cubeUV_minTileSize 16.0
    float getFace( vec3 direction ) {
        vec3 absDirection = abs( direction );
        float face = - 1.0;
        if ( absDirection.x > absDirection.z ) {
            if ( absDirection.x > absDirection.y )
            face = direction.x > 0.0 ? 0.0 : 3.0;
            else
            face = direction.y > 0.0 ? 1.0 : 4.0;
        }
        else {
            if ( absDirection.z > absDirection.y )
            face = direction.z > 0.0 ? 2.0 : 5.0;
            else
            face = direction.y > 0.0 ? 1.0 : 4.0;
        }
        return face;
    }
    vec2 getUV( vec3 direction, float face ) {
        vec2 uv;
        if ( face == 0.0 ) {
            uv = vec2( direction.z, direction.y ) / abs( direction.x );
        }
        else if ( face == 1.0 ) {
            uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
        }
        else if ( face == 2.0 ) {
            uv = vec2( - direction.x, direction.y ) / abs( direction.z );
        }
        else if ( face == 3.0 ) {
            uv = vec2( - direction.z, direction.y ) / abs( direction.x );
        }
        else if ( face == 4.0 ) {
            uv = vec2( - direction.x, direction.z ) / abs( direction.y );
        }
        else {
            uv = vec2( direction.x, direction.y ) / abs( direction.z );
        }
        return 0.5 * ( uv + 1.0 );
    }
    vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
        float face = getFace( direction );
        float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
        mipInt = max( mipInt, cubeUV_minMipLevel );
        float faceSize = exp2( mipInt );
        float texelSize = 1.0 / ( 3.0 * cubeUV_maxTileSize );
        vec2 uv = getUV( direction, face ) * ( faceSize - 1.0 );
        vec2 f = fract( uv );
        uv += 0.5 - f;
        if ( face > 2.0 ) {
            uv.y += faceSize;
            face -= 3.0;
        }
        uv.x += face * faceSize;
        if ( mipInt < cubeUV_maxMipLevel ) {
            uv.y += 2.0 * cubeUV_maxTileSize;
        }
        uv.y += filterInt * 2.0 * cubeUV_minTileSize;
        uv.x += 3.0 * max( 0.0, cubeUV_maxTileSize - 2.0 * faceSize );
        uv *= texelSize;
        vec3 tl = envMapTexelToLinear( texture2D( envMap, uv ) ).rgb;
        uv.x += texelSize;
        vec3 tr = envMapTexelToLinear( texture2D( envMap, uv ) ).rgb;
        uv.y += texelSize;
        vec3 br = envMapTexelToLinear( texture2D( envMap, uv ) ).rgb;
        uv.x -= texelSize;
        vec3 bl = envMapTexelToLinear( texture2D( envMap, uv ) ).rgb;
        vec3 tm = mix( tl, tr, f.x );
        vec3 bm = mix( bl, br, f.x );
        return mix( tm, bm, f.y );
    }
    #define r0 1.0
    #define v0 0.339
    #define m0 - 2.0
    #define r1 0.8
    #define v1 0.276
    #define m1 - 1.0
    #define r4 0.4
    #define v4 0.046
    #define m4 2.0
    #define r5 0.305
    #define v5 0.016
    #define m5 3.0
    #define r6 0.21
    #define v6 0.0038
    #define m6 4.0
    float roughnessToMip( float roughness ) {
        float mip = 0.0;
        if ( roughness >= r1 ) {
            mip = ( r0 - roughness ) * ( m1 - m0 ) / ( r0 - r1 ) + m0;
        }
        else if ( roughness >= r4 ) {
            mip = ( r1 - roughness ) * ( m4 - m1 ) / ( r1 - r4 ) + m1;
        }
        else if ( roughness >= r5 ) {
            mip = ( r4 - roughness ) * ( m5 - m4 ) / ( r4 - r5 ) + m4;
        }
        else if ( roughness >= r6 ) {
            mip = ( r5 - roughness ) * ( m6 - m5 ) / ( r5 - r6 ) + m5;
        }
        else {
            mip = - 2.0 * log2( 1.16 * roughness );
        }
        return mip;
    }
    vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
        float mip = clamp( roughnessToMip( roughness ), m0, cubeUV_maxMipLevel );
        float mipF = fract( mip );
        float mipInt = floor( mip );
        vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
        if ( mipF == 0.0 ) {
            return vec4( color0, 1.0 );
        }
        else {
            vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
            return vec4( mix( color0, color1, mipF ), 1.0 );
        }
    
    }
#endif
#ifdef USE_FOG
    uniform vec3 fogColor;
    varying float fogDepth;
    #ifdef FOG_EXP2
        uniform float fogDensity;
    #else
        uniform float fogNear;
        uniform float fogFar;
    #endif
#endif
#ifdef USE_SPECULARMAP
    uniform sampler2D specularMap;
#endif
#if defined( USE_LOGDEPTHBUF ) && defined( USE_LOGDEPTHBUF_EXT )
    uniform float logDepthBufFC;
    varying float vFragDepth;
    varying float vIsPerspective;
#endif
#if 0 > 0
    varying vec3 vClipPosition;
    uniform vec4 clippingPlanes[ 0 ];
#endif
void main() {
    #if 0 > 0
        vec4 plane;
        #if 0 < 0
            bool clipped = true;
            if ( clipped ) discard;
        #endif
    #endif
    vec4 diffuseColor = vec4( diffuse, opacity );
    #if defined( USE_LOGDEPTHBUF ) && defined( USE_LOGDEPTHBUF_EXT )
        gl_FragDepthEXT = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
    #endif
    #ifdef USE_MAP
        vec4 texelColor = texture2D( map, vUv );
        texelColor = mapTexelToLinear( texelColor );
        diffuseColor *= texelColor;
    #endif
    #ifdef USE_COLOR
        diffuseColor.rgb *= vColor;
    #endif
    #ifdef USE_ALPHAMAP
        diffuseColor.a *= texture2D( alphaMap, vUv ).g;
    #endif
    #ifdef ALPHATEST
        if ( diffuseColor.a < ALPHATEST ) discard;
    #endif
    float specularStrength;
    #ifdef USE_SPECULARMAP
        vec4 texelSpecular = texture2D( specularMap, vUv );
        specularStrength = texelSpecular.r;
    #else
        specularStrength = 1.0;
    #endif
    ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
    #ifdef USE_LIGHTMAP
        
        vec4 lightMapTexel = texture2D( lightMap, vUv2 );
        reflectedLight.indirectDiffuse += lightMapTexelToLinear( lightMapTexel ).rgb * lightMapIntensity;
    #else
        reflectedLight.indirectDiffuse += vec3( 1.0 );
    #endif
    #ifdef USE_AOMAP
        float ambientOcclusion = ( texture2D( aoMap, vUv2 ).r - 1.0 ) * aoMapIntensity + 1.0;
        reflectedLight.indirectDiffuse *= ambientOcclusion;
        #if defined( USE_ENVMAP ) && defined( STANDARD )
            float dotNV = saturate( dot( geometry.normal, geometry.viewDir ) );
            reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.specularRoughness );
        #endif
    #endif
    reflectedLight.indirectDiffuse *= diffuseColor.rgb;
    vec3 outgoingLight = reflectedLight.indirectDiffuse;
    #ifdef USE_ENVMAP
        #ifdef ENV_WORLDPOS
            vec3 cameraToFrag;
            if ( isOrthographic ) {
                cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
            }
            else {
                cameraToFrag = normalize( vWorldPosition - cameraPosition );
            }
            vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
            #ifdef ENVMAP_MODE_REFLECTION
                vec3 reflectVec = reflect( cameraToFrag, worldNormal );
            #else
                vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
            #endif
        #else
            vec3 reflectVec = vReflect;
        #endif
        #ifdef ENVMAP_TYPE_CUBE
            vec4 envColor = textureCube( envMap, vec3( flipEnvMap * reflectVec.x, reflectVec.yz ) );
            #elif defined( ENVMAP_TYPE_CUBE_UV )
            vec4 envColor = textureCubeUV( envMap, reflectVec, 0.0 );
        #else
            vec4 envColor = vec4( 0.0 );
        #endif
        #ifndef ENVMAP_TYPE_CUBE_UV
            envColor = envMapTexelToLinear( envColor );
        #endif
        #ifdef ENVMAP_BLENDING_MULTIPLY
            outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
            #elif defined( ENVMAP_BLENDING_MIX )
            outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
            #elif defined( ENVMAP_BLENDING_ADD )
            outgoingLight += envColor.xyz * specularStrength * reflectivity;
        #endif
    #endif
    gl_FragColor = vec4( outgoingLight, diffuseColor.a );
    #if defined( TONE_MAPPING )
        gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
    #endif
    gl_FragColor = linearToOutputTexel( gl_FragColor );
    #ifdef USE_FOG
        #ifdef FOG_EXP2
            float fogFactor = 1.0 - exp( - fogDensity * fogDensity * fogDepth * fogDepth );
        #else
            float fogFactor = smoothstep( fogNear, fogFar, fogDepth );
        #endif
        gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
    #endif
    #ifdef PREMULTIPLIED_ALPHA
        gl_FragColor.rgb *= gl_FragColor.a;
    #endif
    #ifdef DITHERING
        gl_FragColor.rgb = dithering( gl_FragColor.rgb );
    #endif
}
```

来看看Material材质的变量，在shader是什么样子

- color: 材质的颜色，穿着布料的基本颜色， shader中color的定义和使用

```
// color的定义
#ifdef USE_COLOR
    attribute vec3 color;
#endif

// color的使用
#ifdef USE_COLOR
    vColor.xyz *= color.xyz;
```

- map:  材质的贴图，穿着布料上的图片，花纹

```
// map的定义
#ifdef USE_MAP
    uniform sampler2D map;
#endif

// map的使用
 #ifdef USE_MAP
     vec4 texelColor = texture2D( map, vUv );
     texelColor = mapTexelToLinear( texelColor );
     diffuseColor *= texelColor;
 #endif
```

- lightmap: 灯光贴图，物体的不同部分对光有不同反映
- aomap：环境光遮蔽体贴，就像画眼影，在一些细节支出，增加立体效果

```
// 定义
#if defined( USE_LIGHTMAP ) || defined( USE_AOMAP )
    attribute vec2 uv2;
    varying vec2 vUv2;
    uniform mat3 uv2Transform;
#endif


#if defined( USE_LIGHTMAP ) || defined( USE_AOMAP )
        vUv2 = ( uv2Transform * vec3( uv2, 1 ) ).xy;
#endif

// 使用
#ifdef USE_LIGHTMAP
        vec4 lightMapTexel = texture2D( lightMap, vUv2 );
        reflectedLight.indirectDiffuse += lightMapTexelToLinear( lightMapTexel ).rgb * lightMapIntensity;
    #else
        reflectedLight.indirectDiffuse += vec3( 1.0 );
    #endif
    #ifdef USE_AOMAP
        float ambientOcclusion = ( texture2D( aoMap, vUv2 ).r - 1.0 ) * aoMapIntensity + 1.0;
        reflectedLight.indirectDiffuse *= ambientOcclusion;
        #if defined( USE_ENVMAP ) && defined( STANDARD )
            float dotNV = saturate( dot( geometry.normal, geometry.viewDir ) );
            reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.specularRoughness );
        #endif
    #endif
```

- specularMap：高光贴图，就是一种特殊的贴图而已，打光

```
// 定义
#ifdef USE_SPECULARMAP
    uniform sampler2D specularMap;
#endif

// 
#ifdef USE_SPECULARMAP
        vec4 texelSpecular = texture2D( specularMap, vUv );
        specularStrength = texelSpecular.r;
    #else
        specularStrength = 1.0;
    #endif
    
 
```

- envMap：环境贴图，就是整个环境在人身上的映射
- combine：就是环境光贴图与灯光之间计算的方式，有三种：add, mix，multiply，计算方式不同，最终输出结果自然不同

```
   #ifdef ENVMAP_BLENDING_MULTIPLY
            outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
            #elif defined( ENVMAP_BLENDING_MIX )
            outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
            #elif defined( ENVMAP_BLENDING_ADD )
            outgoingLight += envColor.xyz * specularStrength * reflectivity;
        #endif
```



随便改改参数，试试效果

![chrome_0o0oZWluLs.png](https://i.loli.net/2021/04/25/MpzvNYQcmyX8h4k.png)