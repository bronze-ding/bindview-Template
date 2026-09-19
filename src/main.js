import Bindview from "bindview"

// 展示页根组件：页面内容全部由组件渲染
// （内容配置在 src/config/ecosystem.js，页面结构在 src/App.jsx）
import App from "./App"

/**
 * 应用入口
 * ----------------------------------------------------------------------------
 * 需要路由 / 状态管理 / 组件库时，在这里用 Bindview.use(...) 安装插件即可，例如：
 *
 *   import { hash } from "bindview-router"
 *   import { createStore } from "bindview-store"
 *   import Components from "bindview-component"
 *
 *   Bindview.use([hash, createStore({ state: () => ({ count: 0 }) }), Components])
 *
 * 插件装好之后，组件里就能直接通过 this.$store / <Switch> / <BvButton> 使用。
 */
new Bindview({
  el: "#Root",
  render: () => (<App />),
  components: { App }
})
