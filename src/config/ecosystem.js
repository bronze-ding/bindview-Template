import pkg from "../../package.json"
import versionsFile from "./versions.json"

/**
 * 展示页数据源
 * ----------------------------------------------------------------------------
 * 这里是「内容」与「视图」的分界线：页面结构写在 src/App.jsx，
 * 而站点要展示的四个库、核心特性、快速开始代码都集中在本文件，
 * 之后新增 / 调整内容只需要改这一处。
 *
 * 四个库各自都有两套入口：
 *   - docs：在线文档（rongwu.xyz 文档站，按项目分成四个分区）
 *   - repo：GitHub 源码仓库
 */

/** 页面标题：由 App 在生命周期里写进 document.title（不在 webpack 里写死） */
export const SITE_TITLE = "Bindview · 前端 UI 构建库"

/** 文档站地址（四个库的文档都挂在同一个站点下，用 hash 路由分区分发） */
export const DOC_SITE = "http://rongwu.xyz/"

/**
 * 各生态项目的版本号（兜底值）
 * ----------------------------------------------------------------------------
 * 页面是在浏览器里**实时**向 npm registry 查询最新版本的
 * （见 src/tools/npmVersions.js，由 App 在 life.created 里发起），
 * 下面这组值只在「还没返回」或「查不到」时使用，保证页面始终有版本可显示。
 *
 * versions.json 是这份兜底值的「可刷新快照」：`npm run versions` 会按 npm 当前
 * 最新版本更新它，让首次加载 / 断网时显示的版本不至于太旧。
 * 它只影响兜底值，页面运行时不读它，构建也不依赖网络。
 */
const fallbackVersions = (versionsFile && versionsFile.versions) || {}

/** 内置兜底版本：核心库优先读模板 package.json，其余为随源码提供的版本 */
const BUILT_IN_VERSIONS = {
  bindview: String(pkg.dependencies["bindview"] || "").replace("^", "") || "3.2.1",
  "bindview-router": "1.2.0",
  "bindview-store": "1.0.0",
  "bindview-component": "1.2.0"
}

/** 对外使用的兜底版本表：versions.json 快照 > 内置值 */
export const versions = Object.keys(BUILT_IN_VERSIONS).reduce((acc, name) => {
  acc[name] = String(fallbackVersions[name] || BUILT_IN_VERSIONS[name] || "")
  return acc
}, {})

/** 核心库版本（顶栏 / 首屏用） */
export const bindviewVersion = versions.bindview

/** GitHub 组织下的仓库地址 */
const REPO = "https://github.com/bronze-ding"

/**
 * 生态项目：展示页的主角
 * name      —— 包名
 * tagline   —— 一句话定位
 * version   —— 版本号（bindview 读自 package.json）
 * desc      —— 详细介绍
 * docs/repo —— 文档站与源码仓库入口
 * install   —— 安装命令
 * highlights—— 能力要点（卡片上的小标签）
 */
export const projects = [
  {
    name: "bindview",
    tagline: "核心库",
    version: versions["bindview"],
    desc: "使用虚拟 DOM 创建真实 DOM，并提供数据响应式的 JavaScript 前端 UI 构建库。render 返回虚拟 DOM，更新时做差量对比（diff）。",
    docs: DOC_SITE,
    repo: REPO + "/bindview.git",
    install: "npm i bindview",
    highlights: [
      "虚拟 DOM → 真实 DOM",
      "Vue3 式 Proxy 响应式",
      "微任务批处理更新",
      "函数插槽保持响应式",
      "linkage 联动开关",
      "插件与原型方法扩展"
    ]
  },
  {
    name: "bindview-router",
    tagline: "路由库",
    version: versions["bindview-router"],
    desc: "适用于 bindview 的路由组件库，提供 hash 与 history 两种路由模式，Link / Switch / 路由表 / 路由守卫 / 异步组件一应俱全。",
    docs: DOC_SITE + "#/router/install",
    repo: REPO + "/bindview-router.git",
    install: "npm i bindview-router",
    highlights: [
      "hash / history 双模式",
      "Link 与 Switch 组件",
      "CreateRouterTable 路由表",
      "路由守卫",
      "异步组件",
      "DevTools 路由上报"
    ]
  },
  {
    name: "bindview-store",
    tagline: "状态管理",
    version: versions["bindview-store"],
    desc: "一份 state 多组件订阅，更新语义完全交给框架调度器：Set 去重、微任务批处理、$nextTick 时间语义与 data 响应式完全一致。",
    docs: DOC_SITE + "#/store/intro",
    repo: REPO + "/bindview-store.git",
    install: "npm i bindview-store",
    highlights: [
      "精确依赖收集",
      "getters 惰性求值",
      "modules + namespaced",
      "strict 只读约束",
      "subscribe 与插件体系",
      "DevTools 集成"
    ]
  },
  {
    name: "bindview-component",
    tagline: "组件库",
    version: versions["bindview-component"],
    desc: "56 个组件 + 5 个函数式服务：反馈弹层、表单控件、数据展示、布局导航，支持一行代码全局注册，也支持按需导入。",
    docs: DOC_SITE + "#/component/intro",
    repo: REPO + "/bindview-component.git",
    install: "npm i bindview-component",
    highlights: [
      "BvMessageF / BvModalF 等服务",
      "表单控件与校验",
      "BvTable 虚拟滚动",
      "布局与导航组件",
      "Less 类名隔离",
      "按需联动 linkage"
    ]
  }
]

/** 核心特性：bindview 本身的看点 */
export const features = [
  {
    title: "虚拟 DOM → 真实 DOM",
    desc: "render 返回虚拟 DOM 描述，框架负责创建真实节点；更新时做差量对比，只改变化的部分。"
  },
  {
    title: "Proxy 数据响应式",
    desc: "data 通过 Proxy 代理，对象、数组、嵌套结构甚至 delete 都能触发视图更新。"
  },
  {
    title: "微任务批处理",
    desc: "同一任务内的多次写入被合并成一次 render + diff，$nextTick / $flush 用来对齐时机。"
  },
  {
    title: "函数插槽",
    desc: "普通插槽适合一次性内容，函数插槽还能拿到子组件抛出的参数并保持响应式。"
  },
  {
    title: "linkage 联动",
    desc: "父组件更新默认级联后代；纯展示组件可用 linkage: false 关掉这条通道，省一次 diff。"
  },
  {
    title: "ref 与生命周期",
    desc: "ref 直接拿到真实 DOM；beforeInit / created / updated / beforeDestroy 覆盖完整生命周期。"
  },
  {
    title: "表单处理",
    desc: "内置 send() 双向绑定与 propsType 类型约束，表单取值、校验、回写都很直接。"
  },
  {
    title: "插件机制",
    desc: "Bindview.use() 安装插件，路由、状态管理、组件库都以插件形式接入，互不耦合。"
  }
]

/** 快速开始：三段可复制的代码 */
export const quickStart = {
  install: `# 1. 安装依赖
npm i bindview
# 需要路由 / 状态管理 / 组件库时再按需追加
npm i bindview-router bindview-store bindview-component`,

  main: `// 2. src/main.js —— 创建应用并安装插件
import Bindview from "bindview"
import { hash } from "bindview-router"
import { createStore } from "bindview-store"
import Components from "bindview-component"
import App from "./App"

const store = createStore({
  state: () => ({ count: 0 }),
  mutations: {
    increment(state) { state.count++ }
  }
})

Bindview.use([hash, store, Components])

new Bindview({
  el: "#Root",
  render: () => (<App />),
  components: { App }
})`,

  component: `// 3. src/App.jsx —— 组件就是一个「返回配置对象的函数」
export default function App() {
  return {
    name: "App",
    render() {
      const { data: _, methods: f } = this
      return (
        <div>
          <h1>Hello Bindview：{_.count}</h1>
          <button onClick={f.add}>+1</button>
        </div>
      )
    },
    data: () => ({ count: 0 }),
    methods: {
      add() { this.data.count++ }
    }
  }
}`
}

/** 模板自带命令：展示页里给使用者的操作提示 */
export const scripts = [
  { cmd: "npm i", desc: "安装模板依赖" },
  { cmd: "npm run serve", desc: "启动开发服务器（hash 路由模式）" },
  { cmd: "npm run history", desc: "以 history 路由模式启动" },
  { cmd: "npm run build", desc: "打包生产版本到 dist/" }
]
