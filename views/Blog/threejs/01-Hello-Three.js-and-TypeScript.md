---
title: (一) Hello Three.js and TypeScript
date: 2021-04-19
author: 'ue007'
lang: 'zh-CN'
sidebar: 'auto'
categories:
 - Blog
 - ThreeJS
---

## 1. 概述

本文主要介绍以下三个部分：

- 配置开发环境（vs code, git and nodejs）
- TypeScript快速入门
- 初始化Three.js项目工程

本文代码仓库地址：[https://github.com/ue007/three.ts](https://link.zhihu.com/?target=https%3A//github.com/ue007/three.ts)

## 2. 配置开发环境

- 代码编辑器：[VSCode](https://link.zhihu.com/?target=https%3A//code.visualstudio.com/)
- 代码版本管理：[Git for Windows (Optional)](https://link.zhihu.com/?target=https%3A//gitforwindows.org/)
- 运行时环境：[NodeJS](https://link.zhihu.com/?target=https%3A//nodejs.org/en/download/)

## 3. TypeScript快速入门

代码地址：[https://github.com/ue007/three.ts/tree/main/01-HelloTypeScript](https://link.zhihu.com/?target=https%3A//github.com/ue007/three.ts/tree/main/01-HelloTypeScript)

## 3.1 TypeScript介绍

TypeScript 是 JavaScript 的一个超集，支持 ECMAScript 6 标准（ES6 教程）。

TypeScript 由微软开发的自由和开源的编程语言。

TypeScript 设计目标是开发大型应用，它可以编译成纯 JavaScript，编译出来的 JavaScript 可以运行在任何浏览器上。

### 3.1.1 JavaScript 与 TypeScript 的区别

TypeScript 是 JavaScript 的超集，扩展了 JavaScript 的语法，因此现有的 JavaScript 代码可与 TypeScript 一起工作无需任何修改，TypeScript 通过类型注解提供编译时的静态类型检查。

TypeScript 可处理已有的 JavaScript 代码，并只对其中的 TypeScript 代码进行编译。

![img](https://pic1.zhimg.com/80/v2-1d702ac43ea2018c85d4d29ba2a88300_720w.jpg)

![img](https://pic3.zhimg.com/80/v2-9a9a808363290151ac540688975d761e_720w.jpg)

### 3.1.2 为什么选择TypeScript?

开发者选择使用TypeScript语言至少有以下几点原因：

> 能够更早地发现代码中的错误。
> 能够帮助提高生产力。
> 支持JavaScript语言的最新特性并且使用了与JavaScript语言相同的语法和语义。

## 3.2 安装TypeScript

打开终端，全局安装typescript:

```bash
npm install -g typescript
```

查看typescript版本

```bash
tsc -v
```

## 3.3 创建foo.js文件

代码地址：[https://github.com/ue007/three.ts](https://link.zhihu.com/?target=https%3A//github.com/ue007/three.ts)/[01-HelloThree](https://link.zhihu.com/?target=https%3A//github.com/ue007/three.ts/tree/main/01-HelloThree)

创建foo.js文件，并输入代码:

```js
function foo(bar) {
    return "Hello, " + bar;
}

let baz = "ThreeJs With TypeScript";

console.log(foo(baz));
```

直接在Node环境下执行，在控制台输入:

```bash
node foo.js
```

输出内容：

```text
Hello, ThreeJs With TypeScript
```

## 3.4 创建foo.ts文件

下面使用ts方式，等效输出foo.js文件。

![img](https://pic2.zhimg.com/80/v2-5d5e02d8b8fa4bb32afa3120405386fd_720w.jpg)

首先，将foo.js文件重命名为foo.ts。

其次，在控制台，输入如下命令：

```text
tsc foo.ts
```

编译完成之后，会对应生成foo.js文件，并在node环境下执行命令：

```text
node foo.js
```

同样输出如下结果：

```text
Hello, ThreeJs With TypeScript
```

## 3.5 Interfaces介绍

在TypeScript中，接口（Interfaces）和类型声明（Type Declarations）提供了几乎完全相同的功能。接口/类型是用于类型检查的结构。接口/类型定义了对象可以拥有的属性和类型。

替换foo.ts文件中代码如下：

```ts
interface Quux {
  quuz: string;
  corge: number;
}

function foo(bar: Quux) {
  return 'Hello, ' + bar.quuz + ' ' + bar.corge;
}

let baz: Quux = {
  quuz: 'ABC',
  corge: 123,
};

console.log(foo(baz));
 
```

执行命令：

```bash
tsc foo.ts
node foo.js
```

在Node环境中执行结果：

```text
Hello, ABC 123
```

## 3.6 Classes介绍

类（Classes），本质上是对象在实现时应该是什么样的蓝图。一个类可以有初始化的属性和方法来帮助创建和修改对象。

定义一个Grault类，代码如下：

```text
class Grault {
  private garply: string;

  constructor(quux: Quux, waldo: number[]) {
    this.garply = quux.quuz + ' ' + quux.corge + ' ' + waldo;
  }

  public getGarply() {
    return this.garply;
  }
}

interface Quux {
  quuz: string;
  corge: number;
}

let baz = { quuz: 'ABC', corge: 123 };

let fred: Grault = new Grault(baz, [1, 2, 3]);

console.log(fred.getGarply());
```

执行命令：

```text
tsc foo.ts
node foo.js
```

在Node环境中执行结果：

```text
ABC 123 1,2,3
```

## 3.7 在浏览器中运行

创建foo.html文件，并写入如下代码：

```html
<!DOCTYPE html>
<html>

<head>
    <title>TypeScript Crash Course</title>
</head>

<body>
    <script src="foo.js"></script>
</body>

</html>
```

在foo.ts文件中添加如下代码：

```ts
class Grault {
  private garply: string;

  constructor(quux: Quux, waldo: number[]) {
    this.garply = quux.quuz + ' ' + quux.corge + ' ' + waldo;
  }

  public getGarply() {
    return this.garply;
  }
}

interface Quux {
  quuz: string;
  corge: number;
}

let baz = { quuz: 'ABC', corge: 123 };

let fred: Grault = new Grault(baz, [1, 2, 3]);

console.log(fred.getGarply());

try {
  document.body.innerHTML = fred.getGarply();
} catch (e) {}
```

使用vscode编辑器打开Live Server服务器，在浏览器中查看foo.html页面，效果如下：

![img](https://pic4.zhimg.com/80/v2-a6d2b32b83d049ad4f1434c0045fa257_720w.jpg)

## 4. 初始化Three.js项目

接下来，我们将创建Three.js项目模板。代码地址：[https://github.com/ue007/three.ts/tree/main/02-HelloThreeTS](https://link.zhihu.com/?target=https%3A//github.com/ue007/three.ts/tree/main/02-HelloThreeTS)

## 4.1 创建工程目录

```text
mkdir 02-HelloThreeTS
```

## 4.2 初始化工程

使用npm进行初始化

```text
npm init
```

一直回车，直至初始化完成，在目录下会生成package.json文件。

## 4.3 安装Three.js依赖库

执行命令：

```text
cnpm install @types/three --save-dev // 具有类型生命的three版本
```

## 4.4 创建目录结构

按照如下目录结构，创建文件和目录:

```text
|-- Three.js-TypeScript-Tutorial
    |-- dist
        |-- client
            |-- index.html
        |-- server
    |-- node_modules
        |-- three
            |-- (Several extra files and folders containing the Three.js source code)
    |-- src
        |-- client
        |-- server
    |-- package.json
    |-- package-lock.json
```

其中dist/client/index.html文件内容如下：

```html
<!DOCTYPE html>
<html>

<head>
    <title>Three.js TypeScript Tutorials</title>
</head>

<body>
    <script type="module" src="client.js"></script>
</body>

</html>
```

## 4.5 添加初始化代码

### 4.5.1 client.ts

在src/client.ts文件中，添加如下代码：

```ts
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

const geometry: THREE.BoxGeometry = new THREE.BoxGeometry();
const material: THREE.MeshBasicMaterial = new THREE.MeshBasicMaterial({
  color: 0x00ff00,
  wireframe: true,
});

const cube: THREE.Mesh = new THREE.Mesh(geometry, material);
scene.add(cube);

camera.position.z = 2;

var animate = function () {
  requestAnimationFrame(animate);

  cube.rotation.x += 0.01;
  cube.rotation.y += 0.01;

  renderer.render(scene, camera);
};

animate();
```

在src/client文件夹中，创建tsconfig.json文件，并插入如下代码：

```json
{
    "compilerOptions": {
        "target": "ES6",
        "module": "ES6",
        "outDir": "../../dist/client",
        "moduleResolution": "node"
    },
    "include": [
        "**/*.ts"
    ]
}
```

### 4.5.2 server.ts

在src/server目录下，创建server.ts文件，并插入如下代码：

```ts
const port: number = 3000

class App {
    private server: http.Server
    private port: number

    constructor(port: number) {
        this.port = port
        const app = express()
        app.use(express.static(path.join(__dirname, '../client')))

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

在src/server文件夹中，创建tsconfig.json文件，并插入如下代码：

```json
{
    "compilerOptions": {
        "target": "ES2019",
        "module": "commonjs",
        "outDir": "../../dist/server",
        "sourceMap": true,
        "esModuleInterop": true
    },
    "include": [
        "**/*.ts"
    ]
}
```

### 4.5.3 目录结构

创建完成之后的目录结构如下：

```bash
|-- Three.js-TypeScript-Tutorial
    |-- dist
        |-- client
            |-- index.html
        |-- server
    |-- node_modules
        |-- three
            |-- (Several extra files and folders containing the Three.js source code)
    |-- src
        |-- client
            |-- client.ts
            |-- tsconfig.json
        |-- server
            |-- server.ts
            |-- tsconfig.json
    |-- package.json
    |-- package-lock.json
```

## 4.6 引入依赖

上面代码，我们会发现，在编辑器中会提示错误，如不能找到对应的namespace等等，这是因为还没有引入对应的依赖。

### 4.6.1 client side

创建client.ts文件，代码如下：

```ts
import * as THREE from '/build/three.module.js'
import { OrbitControls } from '/jsm/controls/OrbitControls'

const scene: THREE.Scene = new THREE.Scene()

const camera: THREE.PerspectiveCamera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)

const renderer: THREE.WebGLRenderer = new THREE.WebGLRenderer()
renderer.setSize(window.innerWidth, window.innerHeight)
document.body.appendChild(renderer.domElement)

const controls = new OrbitControls(camera, renderer.domElement)

const geometry: THREE.BoxGeometry = new THREE.BoxGeometry()
const material: THREE.MeshBasicMaterial = new THREE.MeshBasicMaterial({ color: 0x00ff00, wireframe: true })

const cube: THREE.Mesh = new THREE.Mesh(geometry, material)
scene.add(cube)

camera.position.z = 2

var animate = function () {

    requestAnimationFrame(animate)

    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;

    controls.update()

    renderer.render(scene, camera)

}; 

animate(); 
```

创建tsconfig.json文件，代码如下：

```json
{
    "compilerOptions": {
        "target": "ES6",
        "module": "ES6",
        "outDir": "../../dist/client",
        "baseUrl": ".",
        "paths": {
            "/build/three.module.js": ["../../node_modules/@types/three"],
            "/jsm/*": ["../../node_modules/@types/three/examples/jsm/*"],
        },
        "moduleResolution": "node"
    },
    "include": [
        "**/*.ts"
    ]
}
```

执行编译脚本：

```bash
tsc -p .\src\client\
```

### 4.6.2 server side

在server.ts文件开头，引入如下代码：

```ts
import express from "express"
import path from "path"
import http from "http"
```

安装依赖：

```bash
cnpm install @types/node --save-dev
cnpm install @types/express --save-dev
cnpm install express --save-dev
```

完整代码如下：

```ts
import express from "express"
import path from "path"
import http from "http"

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

编译server.ts文件，命令如下：

```text
tsc -p ./src/server
```

对应会在dist/server目录下，生成server.js文件和server.js.map文件。

执行脚本，启动服务器：

```text
node .\dist\server\server.js 
```

在浏览器中，打开地址：localhost:3000



![img](https://pic3.zhimg.com/80/v2-6cb4820af6480468fb29dd375718ddf6_720w.jpg)

## 4.7 配置TSC Watch

继续配置项目，使得源代码在发生任何更改的时候，重新编译， 添加-w表示watch状态。

```text
tsc -p src/server/ -w 
```

## 4.8 配置Nodemon

nodemon nodemon是一种工具,可以自动检测到目录中的文件更改时通过重新启动应用程序来调试基于node.js的应用程序。

安装nodemon:

```bash
npm install --save-dev nodemon
```

启动服务：

```text
npx nodemon dist/server/server.js
```

## 4.9 一键启动

我们可以创建一个命令来同时启动两个进程，而不是一直输入这些compile和nodemon命令。

安装concurrently：

```text
npm install --save-dev concurrently
```

在package.json文件中添加脚本：

```json
"dev" : "concurrently -k \"tsc -p ./src/server -w\" \"nodemon ./dist/server/server.js\"",
```

执行命令：

```text
npm run dev
```

打开浏览器，输入地址：localhost:3000，效果如下：

![img](https://pic4.zhimg.com/80/v2-542587433d0a5993e453b48a3c6cfcc7_720w.jpg)