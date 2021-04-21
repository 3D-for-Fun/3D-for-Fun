---
title: (二) Stats Panel And Dat GUI
date: 2021-04-21
author: 'ue007'
lang: 'zh-CN'
sidebar: 'auto'
categories:
 - Blog
 - ThreeJS
---

# 1. 概述

本文主要介绍以下内容：

> 1. 添加OrbitControls监听事件
> 2. 添加onWindowResize监听事件
> 3. 添加Stats面板
> 4. 添加Dat GUI面板



专栏代码地址：https://github.com/ue007/three.ts

本文代码地址：https://github.com/ue007/three.ts/tree/main/03-Stats-GUI

# 2. 添加OrbitControls监听事件

添加OrbitControl，用于鼠标交互的时候，刷新页面。

核心代码如下：

```typescript
// 添加orbitControl
const controls = new OrbitControls(camera, renderer.domElement)
controls.addEventListener('change', render)

// render 
function render() {
    renderer.render(scene, camera)
}
```



# 3. 添加OnWindowResize监听事件

监听窗口的Resize变化，动态更改Camera的aspect和渲染的视口大小：

```typescript
window.addEventListener('resize', onWindowResize, false)
function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()
    renderer.setSize(window.innerWidth, window.innerHeight)
    render()
}
```



# 4. 添加Stats面板

使用Stats面板，用于展示FPS等性能数据，便于后期调试分析问题，Stats.js地址：https://www.npmjs.com/package/stats-js

![image](https://cdn.nlark.com/yuque/0/2021/png/244017/1618980832778-cf7f7f56-e05f-4cc2-9d0a-321d92686648.png)![image](https://cdn.nlark.com/yuque/0/2021/png/244017/1618980837428-df9fbcb7-77d3-44e6-aaa7-17e1b8253809.png)![image](https://cdn.nlark.com/yuque/0/2021/png/244017/1618980840852-0c92271f-14b5-49de-a31f-775566d10873.png)![image](https://cdn.nlark.com/yuque/0/2021/png/244017/1618980844165-2d180542-c831-4ca8-a29c-2260bfbfc533.png)



> - **FPS** Frames rendered in the last second. The higher the number the better. 帧率信息
> - **MS** Milliseconds needed to render a frame. The lower the number the better. 渲染一帧的时间
> - **MB** MBytes of allocated memory. (Run Chrome with `--enable-precise-memory-info`) 所需内存的大小
> - **CUSTOM** User-defined panel support. // 定制面板

在**./src/client/client.ts文件中添加如下代码：**

```typescript
import * as THREE from '/build/three.module.js'
import { OrbitControls } from '/jsm/controls/OrbitControls'
import Stats from '/jsm/libs/stats.module'

const scene: THREE.Scene = new THREE.Scene()

const camera: THREE.PerspectiveCamera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)

const renderer: THREE.WebGLRenderer = new THREE.WebGLRenderer()
renderer.setSize(window.innerWidth, window.innerHeight)
document.body.appendChild(renderer.domElement)

const controls = new OrbitControls(camera, renderer.domElement)
controls.addEventListener('change', render) 

const geometry: THREE.BoxGeometry = new THREE.BoxGeometry()
const material: THREE.MeshBasicMaterial = new THREE.MeshBasicMaterial({ color: 0x00ff00, wireframe: true })

const cube: THREE.Mesh = new THREE.Mesh(geometry, material)
scene.add(cube)

camera.position.z = 2

window.addEventListener('resize', onWindowResize, false)
function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()
    renderer.setSize(window.innerWidth, window.innerHeight)
    render()
}

const stats = Stats()
document.body.appendChild(stats.dom)

var animate = function () {
    requestAnimationFrame(animate)

    // cube.rotation.x += 0.01;
    // cube.rotation.y += 0.01;

    render()

    stats.update()
};

function render() {
    stats.begin()
    renderer.render(scene, camera)
    stats.end()
}
render()
//animate();
```



**./src/server/server.ts文件中添加如下代码：**

```typescript
import http from "http"
import path from "path"
import express from "express"

const port: number = 3000

class App {
    private server: http.Server
    private port: number

    constructor(port: number) {
        this.port = port
        const app = express()
        app.use(express.static(path.join(__dirname, '../client')))
        app.use('/build/three.module.js', express.static(path.join(__dirname, '../../node_modules/three/build/three.module.js')))
        app.use('/jsm/controls/OrbitControls', express.static(path.join(__dirname, '../../node_modules/three/examples/jsm/controls/OrbitControls.js')))
        app.use('/jsm/libs/stats.module', express.static(path.join(__dirname, '../../node_modules/three/examples/jsm/libs/stats.module.js')))
        this.server = new http.Server(app);
    }

    public Start() {
        this.server.listen(this.port, () => {
            console.log(`Server listening on Port ${this.port}.`)
        })
    }
}

new App(port).Start()
```

这样，就会在页面的左上角显示State面板。

![image.png](https://cdn.nlark.com/yuque/0/2021/png/244017/1618981121642-4cb1e6a9-e944-417f-8b84-0191a91bb887.png?x-oss-process=image%2Fresize%2Cw_1500)

# 5. 添加Dat GUI面板

另外一个比较实用的空间dat.gui，也是开发的时候，经常使用的工具库，仓库地址：https://www.npmjs.com/package/dat.gui

three.js的仓库中有了data .gui.module.js代码，所以可以直接使用，但是@types/three中没有data.gui.module.js的类型说明文件。

![image.png](https://cdn.nlark.com/yuque/0/2021/png/244017/1618981395909-2a117539-c344-4a30-b323-899dbad6d33d.png)

因此需要手动安装类型说明文件，执行命令：

```bash
npm install @types/dat.gui --save-dev
```

安装的类型定义文件还不会自动链接到Three.js库文件夹中的data .gui.module.js。还需要配置下/src/client/tsconfig.json文件。

在tsconfig.json文件中添加一句：

```json
"/jsm/libs/dat.gui.module": ["../../node_modules/@types/dat.gui"]
```

完整配置：

```typescript
{
    "compilerOptions": {
        "target": "ES6",
        "module": "ES6",
        "outDir": "../../dist/client",
        "baseUrl": ".",
        "paths": {
            "/build/three.module.js": ["../../node_modules/@types/three"],
            "/jsm/*": ["../../node_modules/@types/three/examples/jsm/*"],
            "/jsm/libs/dat.gui.module": ["../../node_modules/@types/dat.gui"]
        },
        "moduleResolution": "node"
    },
    "include": [
        "**/*.ts"
    ]
}
```

在**./src/client/client.ts文件中添加如下代码：**

```typescript
// gui
const gui = new GUI();
const cubeFolder = gui.addFolder('Cube');
cubeFolder.add(cube.rotation, 'x', 0, Math.PI * 2, 0.01);
cubeFolder.add(cube.rotation, 'y', 0, Math.PI * 2, 0.01);
cubeFolder.add(cube.rotation, 'z', 0, Math.PI * 2, 0.01);
cubeFolder.open();
const cameraFolder = gui.addFolder('Camera');
cameraFolder.add(camera.position, 'z', 0, 10, 0.01);
cameraFolder.open();
```

完整代码：

```typescript
import * as THREE from '/build/three.module.js';
import { OrbitControls } from '/jsm/controls/OrbitControls';
import Stats from '/jsm/libs/stats.module';
import { GUI } from '/jsm/libs/dat.gui.module';

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
controls.addEventListener('change', render);

const geometry: THREE.BoxGeometry = new THREE.BoxGeometry();
const material: THREE.MeshBasicMaterial = new THREE.MeshBasicMaterial({
  color: 0xff0000,
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

// stats
const stats = Stats();
document.body.appendChild(stats.dom);

// gui
const gui = new GUI();
const cubeFolder = gui.addFolder('Cube');
cubeFolder.add(cube.rotation, 'x', 0, Math.PI * 2, 0.01);
cubeFolder.add(cube.rotation, 'y', 0, Math.PI * 2, 0.01);
cubeFolder.add(cube.rotation, 'z', 0, Math.PI * 2, 0.01);
cubeFolder.open();
const cameraFolder = gui.addFolder('Camera');
cameraFolder.add(camera.position, 'z', 0, 10, 0.01);
cameraFolder.open();

var animate = function () {
  requestAnimationFrame(animate);
//   cube.rotation.x += 0.01;
//   cube.rotation.y += 0.01;
  controls.update();
  renderer.render(scene, camera);
  stats.update();
};

animate();

function render() {
  stats.begin();
  renderer.render(scene, camera);
  stats.end();
}
// render();
```

在**./src/client/server.ts文件中添加如下代码：**

```typescript
 app.use('/jsm/libs/dat.gui.module', express.static(path.join(__dirname, '../../node_modules/three/examples/jsm/libs/dat.gui.module.js')))
```

完整代码：

```typescript
import express from "express"
import path from "path"
import http from "http"

const port: number = 3000

class App {
    private server: http.Server
    private port: number

    constructor(port: number) {
        this.port = port
        const app = express();
        console.log('watching')
        app.use(express.static(path.join(__dirname, '../client')))
        app.use('/build/three.module.js', express.static(path.join(__dirname, '../../node_modules/three/build/three.module.js')))
        app.use('/jsm/controls/OrbitControls', express.static(path.join(__dirname, '../../node_modules/three/examples/jsm/controls/OrbitControls.js')))
        app.use('/jsm/libs/stats.module', express.static(path.join(__dirname, '../../node_modules/three/examples/jsm/libs/stats.module.js')))
        app.use('/jsm/libs/dat.gui.module', express.static(path.join(__dirname, '../../node_modules/three/examples/jsm/libs/dat.gui.module.js')))
       
        this.server = new http.Server(app);
    }

    public Start() {
        this.server.listen(this.port, () => {
            console.log( `Server listening on port ${this.port}.` )
        })
    }
}

new App(port).Start()
```

# 6. 预览效果

这里，重新配置了下执行命令：

```json
"scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "dev:client": "tsc -p ./src/client -w", // 编译client代码
    "dev:server": "concurrently -k \"tsc -p ./src/server -w\" \"nodemon ./dist/server/server.js\"",// 编译并启动server
    "dev": "tsc -p ./src/client && concurrently -k \"tsc -p ./src/server -w\" \"nodemon ./dist/server/server.js\""// 一键发布
  },
```

执行命令：

```bash
npm run dev
```

并在浏览器中打开localhost:3000

![image.png](https://cdn.nlark.com/yuque/0/2021/png/244017/1618981782093-9a80d1ca-8b78-4fd6-adc5-8cce95d9ab93.png?x-oss-process=image%2Fresize%2Cw_1500)