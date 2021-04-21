---
title: (三) Threejs And WebPack
date: 2021-04-22
author: 'ue007'
lang: 'zh-CN'
sidebar: 'auto'
categories:
 - Blog
 - ThreeJS
---

# 1. 概述

本文主要介绍以下内容：

> 1. 了解主流模块规范
> 2. 了解Relative Import References（相对路径引入）
> 3. 了解Module Resolution（模块解析）
> 4. 了解Hot Module Replacement（热模块替换）
> 5. 使用Threejs TypeScript Webpack Boilerplate模板

专栏代码地址：https://github.com/ue007/three.ts

本文代码地址：https://github.com/ue007/three.ts/tree/main/04-Threejs-And-WebPack

# 2. **主流的模块规范**

**目前主流的模块规范**

- UMD
- CommonJs
- ES6 Module

## 2.1 UMD模块（通用模块）

```javascript
(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define(factory) :
    (global.libName = factory());
}(this, (function () { 'use strict';})));
```

如果你在js文件头部看到这样的代码，那么这个文件使用的就是 UMD 规范。实际上就是 amd + commonjs + 全局变量 这三种风格的结合。这段代码就是对当前运行环境的判断，如果是 Node 环境 就是使用 CommonJs 规范， 如果不是就判断是否为 AMD 环境， 最后导出全局变量。有了 UMD 后我们的代码和同时运行在 Node 和 浏览器上。所以现在前端大多数的库最后打包都使用的是 UMD 规范。

## 2.2  CommonJS

Nodejs 环境所使用的模块系统就是基于CommonJs规范实现的，我们现在所说的CommonJs规范也大多是指Node的模块系统。

### 模块导出

关键字：`module.exports` `exports`

```javascript
// foo.js

//一个一个 导出
module.exports.age = 1
module.exports.foo = function(){}
exports.a = 'hello'

//整体导出
module.exports = { age: 1, a: 'hello', foo:function(){} }

//整体导出不能用`exports` 用exports不能在导入的时候使用
exports = { age: 1, a: 'hello', foo:function(){} }
```

这里需要注意 `exports` 不能被赋值，可以理解为在模块开始前`exports = module.exports`， 因为赋值之后`exports`失去了 对`module.exports`的引用，成为了一个模块内的局部变量

### 模块导入

关键字：`require`

```javascript
const foo = require('./foo.js')
console.log(foo.age) //1
```

**模块导入规则：**

假设以下目录为 `src/app/index.js` 的文件 调用 `require()`

##### **`./moduleA` 相对路径开头**

在没有指定后缀名的情况下

先去寻找同级目录同级目录：`src/app/`

- `src/app/moduleA` 无后缀名文件 按照`javascript`解析
- `src/app/moduleA.js` js文件 按照`javascript`解析
- `src/app/moduleA.json` json文件 按照`json`解析
- `src/app/moduleA.node` node文件 按照加载的编译插件模块dlopen

同级目录没有 `moduleA` **文件**会去找同级的 `moduleA`**目录**：`src/app/moduleA`

- `src/app/moduleA/package.json` 判断该目录是否有`package.json`文件， 如果有 找到`main`字段定义的文件返回， 如果 `main` 字段指向文件不存在 或 `main`字段不存在 或 `package.json`文件不存在向下执行
- `src/app/moduleA/index.js`
- `src/app/moduleA/index.json`
- `src/app/moduleA/index.node`



##### **`/module/moduleA` 绝对路径开头**

直接在`/module/moduleA`目录中寻找 规则同上



## 2.3 ES6 Module

```javascript
ES6` 之前 `javascript` 一直没有属于自己的模块规范，所以社区制定了 `CommonJs`规范， `Node` 从 `Commonjs` 规范中借鉴了思想于是有了 `Node` 的 `module`，而 `AMD 异步模块` 也同样脱胎于 `Commonjs` 规范，之后有了运行在浏览器上的 `require.js
```

`es6 module` 基本语法：

### export

```javascript
export * from 'module'; //重定向导出 不包括 module内的default
export { name1, name2, ..., nameN } from 'module'; // 重定向命名导出
export { import1 as name1, import2 as name2, ..., nameN } from 'module'; // 重定向重命名导出

export { name1, name2, …, nameN }; // 与之前声明的变量名绑定 命名导出
export { variable1 as name1, variable2 as name2, …, nameN }; // 重命名导出

export let name1 = 'name1'; // 声明命名导出 或者 var, const，function， function*, class

export default expression; // 默认导出
export default function () { ... } // 或者 function*, class
export default function name1() { ... } // 或者 function*, class
export { name1 as default, ... }; // 重命名为默认导出
```

**`export` 规则**

- `export * from ''` 或者 `export {} from ''`，重定向导出，重定向的命名并不能在本模块使用，只是搭建一个桥梁，例如：这个`a`并不能在本模块内使用
- `export {}`， 与变量名绑定，命名导出
- `export Declaration`，声明的同时，命名导出， [Declaration](http://www.ecma-international.org/ecma-262/6.0/#sec-statements)就是： `var`, `let`, `const`, `function`, `function*`, `class` 这一类的声明语句
- `export default AssignmentExpression`，默认导出， [AssignmentExpression](http://www.ecma-international.org/ecma-262/6.0/#sec-expressions)的 范围很广，可以大致理解 为除了声明`Declaration`（其实两者是有交叉的），`a=2`,`i++`,`i/4`,`a===b`,`obj[name]`,`name in obj`,`func()`,`new P()`,`[1,2,3]`,`function(){}`等等很多

### import

```javascript
// 命名导出 module.js
let a = 1,b = 2
export { a, b }
export let c = 3

// 命名导入 main.js
import { a, b, c } from 'module'; // a: 1  b: 2  c: 3
import { a as newA, b, c as newC } from 'module'; // newA: 1  b: 2  newC: 3


// 默认导出 module.js
export default 1

// 默认导入 main.js
import defaultExport from 'module'; // defaultExport: 1


// 混合导出 module.js
let a = 1
export { a }
const b = 2
export { b }
export let c = 3
export default [1, 2, 3]

// 混合导入 main.js
import defaultExport, { a, b, c as newC} from 'module'; //defaultExport: [1, 2, 3]  a: 1  b: 2  newC: 3
import defaultExport, * as name from 'module'; //defaultExport: [1, 2, 3]  name: { a: 1, b: 2, c: 3 }
import * as name from 'module'; // name: { a: 1, b: 2, c: 3, default: [1, 2, 3] }


// module.js
Array.prototype.remove = function(){}

//副作用 只运行一个模块
import 'module'; // 执行module 不导出值  多次调用module.js只运行一次

//动态导入(异步导入)
var promise = import('module');
```

**`import`** **规则**

- `import { } from 'module'`， 导入`module.js`的**命名导出**
- `import defaultExport from 'module'`， 导入`module.js`的**默认导出**
- `import * as name from 'module'`， 将`module.js的`的**所有导出**合并为`name`的对象，`key`为导出的命名，默认导出的`key`为`default`
- `import 'module'`，副作用，只是运行`module`，不为了导出内容例如 polyfill，多次调用次语句只能执行一次
- `import('module')`，动态导入返回一个 `Promise`，`TC39`的`stage-3`阶段被提出 [tc39 import](https://github.com/tc39/proposal-dynamic-import/#import)

## 2.4 CommonJs 和 ES6 Module 的区别

其实上面我们已经说到了一些区别

- `CommonJs`导出的是变量的一份拷贝，`ES6 Module`导出的是变量的绑定（`export default` 是特殊的）
- `CommonJs`是单个值导出，`ES6 Module`可以导出多个
- `CommonJs`是动态语法可以写在判断里，`ES6 Module`静态语法只能写在顶层
- `CommonJs`的 `this` 是当前模块，`ES6 Module`的 `this` 是 `undefined`


# 3. Relative Import References

到目前为止，我通常使用相对路径URL，将特定的模块引入到client.ts模块中，然后配置client目录下的tsconfig.json来配置绝对路径，告知TypeScript编译器应该使用哪个类型说明文件（d.ts），然后引入对应的模块。这种方式，我们称之为相对路径引入。

```
import * as THREE from '/build/three.module.js';
import { OrbitControls } from '/jsm/controls/OrbitControls';
```

# 4. Module Resolution

然而，市面上主流js项目，包括Three.js，都会使用模块解析方式进行引入模块，这种方式非常容易理解，但也会存在一定的问题。

下面，我们将改进之前的代码，按照模块解析方式，引入代码。

为了使用Module Resolution，我们尝试 将相对路径改成模块引入：

```javascript
// 相对路径
import * as THREE from '/build/three.module.js';

// es6 module
import * as THREE from 'three'
```

执行命令：npm run dev 编译运行之后，发现浏览器中报错：

```bash
Uncaught TypeError: Failed to resolve module specifier "three". Relative references must start with either "/", "./", or "../".
```

![image](https://i.loli.net/2021/04/21/HQdYiWSyk8D5zo1.png)


## 4.1 为什么这样呢？

当引入模块时，指明模块位置的部分被称为 Module specifiers，也叫做 import specifier 。在项目中，tsconfig.json中有个配置：`moduleResolution: "node"`,这个参数将告知编译器该环境为node环境，仅对node环境支持，然后会对node_modules进行扫描。

然而在浏览器中打开的时候，浏览器对模块的引入有一些严格的限制，裸模块目前是不支持的，这样是为了在将来为裸模块添加特定的意义，如下面这些做法是不行的：

```typescript
// Not supported (yet):
import {shout} from 'jquery';
import {shout} from 'lib.mjs';
import {shout} from 'modules/lib.mjs';
```

下面这些的用法则都是支持的

```typescript
// Supported:
import {shout} from './lib.mjs';
import {shout} from '../lib.mjs';
import {shout} from '/modules/lib.mjs';
import {shout} from 'https://simple.example/modules/lib.mjs';
```

总的来说，目前模块引入路径要求必须是完整的URLs，或者是以`/`,`./`,`../`开头的相对URLs。

Module Specifiers依赖于模块解析遍历策略。默认情况下，这在浏览器中不起作用，因为浏览器不能直接访问服务器上的文件系统，以遍历所有文件夹并尝试在模块解析过程中所涉及的引用的所有方法。如果从浏览器运行，它将在客户机中触发许多404错误，因为它将尝试寻找引用的所有可能规则。你可以在[TypeScript Module Resolution](https://www.typescriptlang.org/docs/handbook/module-resolution.html)上阅读更多关于模块解析策略的内容。



## 4.2 怎么解决呢？

在浏览器中解决这个问题，最常用的手段就是将所需要的文件打包至一个js文件中，并将所有模块的命名空间写入内存中，以便调用。

通常我们项目中使用到的打包工具有Webpack、Parcel、Rollup、Browserify等等。在编写本文档时，最常见的模块打包工具是Webpack。

接下来所以我将演示如何设置Webpack。

当在编译时绑定所有的代码和导入时，浏览器将不需要为了让模块说明符工作而支持模块解析策略。客户端需要的所有代码应该已经在内存中排序，以便在页面下载时引用。



# 5. Hot Module Replacement

模块热替换(HMR - hot module replacement)功能会在应用程序运行过程中，替换、添加或删除 模块，而无需重新加载整个页面。主要是通过以下几种方式，来显著加快开发速度：

- 保留在完全重新加载页面期间丢失的应用程序状态。
- 只更新变更内容，以节省宝贵的开发时间。
- 在源代码中 CSS/JS 产生修改时，会立刻在浏览器中进行更新，这几乎相当于在浏览器 devtools 直接更改样式。



# 6.Threejs-TypeScript-Webpack模板

直接下载代码：https://github.com/ue007/three.ts/tree/main/04-Threejs-And-WebPack

详细的配置也可以参考之前的文章：[前端工程化](https://webgpu.info/views/Blog/web/01-FrontEnd-Engineering.html#tech-stack)

![image](https://cdn.nlark.com/yuque/0/2021/png/244017/1619012867729-b527d751-6743-4c2d-b0e5-14630205e4d5.png)

# 7. 参考文献

1. [深入 CommonJs 与 ES6 Module](https://segmentfault.com/a/1190000017878394)
2. [Module Resolution](https://www.typescriptlang.org/docs/handbook/module-resolution.html)
3. [模块热替换(hot module replacement)](https://webpack.docschina.org/concepts/hot-module-replacement/)
4. [前端工程化](https://webgpu.info/views/Blog/web/01-FrontEnd-Engineering.html#tech-stack)