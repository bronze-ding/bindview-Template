# bindview-Template

基于 **bindview.js** + **webpack** 的开发模板环境。默认页面是一套「Bindview 生态展示页」，
克隆（或 `bvcli create`）之后 `npm run serve` 就能看到，直接把它当成自己项目的起点即可。

## 展示页里有什么

| 区块 | 内容 |
| --- | --- |
| 顶栏 | 站点名 + 页内导航 + 文档站 / GitHub 入口，随页面滚动吸顶 |
| 首屏 Hero | 项目介绍、快速开始按钮，以及四个生态项目的版本徽标（点击直达文档） |
| 生态项目 | 四张卡片：bindview / bindview-router / bindview-store / bindview-component，各带文档与源码入口 |
| 核心特性 | 虚拟 DOM、Proxy 响应式、微任务批处理、函数插槽、linkage、ref、表单、插件 |
| 在线演示 | 一个真跑的 bindview 组件：响应式计数、微任务批处理、`$nextTick` 读 DOM |
| 快速开始 | 安装命令 + `main.js` / `App.jsx` 代码块（带一键复制），以及模板命令表 |
| 页脚 | 四个库的「文档 / 源码」双列链接 |

## 生态项目

| 项目 | 说明 | 文档 | 源码 |
| --- | --- | --- | --- |
| bindview | 核心库：虚拟 DOM、数据响应式、微任务批处理 | <http://rongwu.xyz/> | <https://github.com/bronze-ding/bindview.git> |
| bindview-router | 路由库：hash / history 两种模式 | <http://rongwu.xyz/#/router/install> | <https://github.com/bronze-ding/bindview-router.git> |
| bindview-store | 状态管理插件 | <http://rongwu.xyz/#/store/intro> | <https://github.com/bronze-ding/bindview-store.git> |
| bindview-component | 组件库：56 个组件 + 5 个函数式服务 | <http://rongwu.xyz/#/component/intro> | <https://github.com/bronze-ding/bindview-component.git> |

## 目录结构

```
src/
├── main.js                     # 应用入口：Bindview 实例 + 插件安装位置
├── App.jsx                     # 展示页根组件（页面结构 / 各区块）
├── App.css                     # 全局样式（普通 CSS，类名统一 bp- 前缀）
├── config/
│   ├── ecosystem.js            # 展示内容数据源：四个库 / 特性 / 快速开始 / 模板命令
│   └── versions.json           # 各库版本的兜底快照（npm run versions 更新）
├── tools/
│   ├── readValue.js            # 兼容「函数取值器」与「直接取值」两种 props
│   └── npmVersions.js          # 浏览器端向 npm registry 实时查询最新版本
└── Components/
    ├── CodeBlock/              # 代码块 + 一键复制（演示 data / methods / life）
    ├── EcosystemCard/          # 生态项目卡片
    └── HelloWorld/             # 在线演示组件（Less 模块样式 + $nextTick + ref）

scripts/
└── fetch-versions.js           # 可选：刷新 versions.json 里的兜底版本
```

> 改内容只需要动 `src/config/ecosystem.js`：新增一个库、调整特性文案、改快速开始代码片段，
> 页面（含首屏徽标、生态卡片、页脚链接）都会跟着变。

## 版本号来自 npm（网页实时获取）

展示页上的四个版本号（首屏徽标、生态卡片）不是写死的：**进入页面时**由
[`src/tools/npmVersions.js`](src/tools/npmVersions.js) 在浏览器里请求一次 npm registry
（刷新页面即重新获取），拿到结果写进组件自己的 `data`，靠 bindview 的响应式静默刷新视图 ——
页面上不显示任何「获取中 / 已获取」之类的提示文案。

- 自动触发点：`App` 的 `life.created` 调用 `methods.refreshVersions()`（只调一次）；
- 查询顺序：`registry.npmmirror.com` → `registry.npmjs.org`，任一成功即采用
  （两者都返回 `Access-Control-Allow-Origin: *`，浏览器可直接跨域请求）；
- 请求带 6 秒超时，离线 / 被拦截时**回退到内置版本**，不报错、不打断页面。

> 版本号是用**函数取值器**传给卡片的（`version={() => ...}`）：bindview 的 `props` 只在组件
> 实例创建时传入一次（见 `bindview/src/core/createComponentExample.js`），父组件更新不会刷新
> 字符串类型的 props，但**函数会在子组件每次 render 时重新调用**，因此异步到达的版本号
> 才能显示到卡片上；父组件更新时默认的 `linkage` 会联动子组件重渲染，正好触发这次调用。

`src/config/versions.json` 只是这份内置兜底值的「可刷新快照」，可选地手动更新一次，
让首次加载（或断网）时显示的版本不至于太旧 —— 构建本身**不依赖网络**：

```
npm run versions      # 可选：按 npm 当前最新版本刷新 versions.json 里的兜底值
```

## 使用

### 使用 git 下载

```
git clone https://github.com/debfig/bindview-Template.git
```

### 安装依赖

```
npm i
```

### 安装最新的 bindview.js

```
npm i bindview
```

### 按需追加生态插件

```
npm i bindview-router bindview-store bindview-component
```

安装后按需在 `src/main.js` 里注册，例如：

```js
import Bindview from "bindview"
import { hash } from "bindview-router"
import Components from "bindview-component"

Bindview.use([hash, Components])
```

### 运行

```
npm run serve
```

### history 路由模式运行

```
npm run history
```

### 打包

```
npm run build
```

## 说明

- 模板已配置 **webpack 5 + Babel**（`syntax-jsx` / `transform-jsx`）与 **Less**，
  JSX 会被编译成 bindview 需要的虚拟 DOM 对象，无需任何 pragma 或额外 import；
- 组件样式建议用 Less 模块（`import style from "./index.less"`，类名自动哈希隔离），
  页面级样式写在 `src/App.css`；
- 需要调试组件树 / 响应式数据 / 路由时，可配合 **bindview-devtools** 浏览器插件使用。
