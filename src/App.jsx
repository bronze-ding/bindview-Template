import "./App.css"

import logo from "./assets/logo.png"
import {
  SITE_TITLE,
  DOC_SITE,
  bindviewVersion,
  projects,
  features,
  quickStart,
  scripts
} from "./config/ecosystem"
import { fetchLatestVersions } from "./tools/npmVersions"
import CodeBlock from "./Components/CodeBlock"
import EcosystemCard from "./Components/EcosystemCard"
import HelloWorld from "./Components/HelloWorld"

/** 顶栏导航：全部是页内锚点，点击平滑滚动 */
const navLinks = [
  { href: "#ecosystem", text: "生态项目" },
  { href: "#features", text: "核心特性" },
  { href: "#demo", text: "在线演示" },
  { href: "#start", text: "快速开始" }
]

/** 顶栏与页脚共用的「bindview 核心库」仓库地址 */
const CORE_REPO = "https://github.com/bronze-ding/bindview.git"

/**
 * Bindview 生态展示页
 * ----------------------------------------------------------------------------
 * 这是 bindview-Template 的默认页面：把一个用 bindview 写成的「官网式落地页」
 * 直接放在模板里，作为新工程的起点 —— 克隆 / bvcli create 之后 npm run serve
 * 就能看到它，改内容只需动 src/config/ecosystem.js。
 *
 * 页面结构（自上而下）：
 *   顶栏  →  首屏 Hero  →  生态项目（bindview / router / store / component）
 *         →  核心特性  →  在线演示（真跑一个 bindview 组件）  →  快速开始  →  页脚
 *
 * 用到的框架能力（可以当成范例来读）：
 *   - 组件是「返回配置对象的函数」，用 components 注册后即可在模板里当标签用；
 *   - 列表用 map 渲染并给 key，diff 会按 key 对齐；
 *   - 子组件（CodeBlock / EcosystemCard / HelloWorld）各自维护内部状态。
 */
export default function App() {
  return {
    name: "App",
    render() {
      const { data: _ } = this

      // 版本号：npm 实时结果优先，未取到时回退到内置版本
      const versionOf = (item) => _.versions[item.name] || item.version

      return (
        <div id="App">
          <header class="bp-header">
            <div class="bp-container bp-header-inner">
              <a class="bp-brand" href="#top">
                <img class="bp-brand-logo" src={logo} alt="Bindview logo" />
                <span class="bp-brand-name">Bindview</span>
                <span class="bp-chip bp-chip-sm">v{bindviewVersion}</span>
              </a>

              <nav class="bp-nav">
                {navLinks.map((link) => (
                  <a class="bp-nav-link" href={link.href} key={link.href}>{link.text}</a>
                ))}
              </nav>

              <div class="bp-header-actions">
                <a class="bp-header-link" href={DOC_SITE} target="_blank" rel="noreferrer">文档站</a>
                <a class="bp-header-link" href={CORE_REPO} target="_blank" rel="noreferrer">GitHub</a>
              </div>
            </div>
          </header>

          <main class="bp-main" id="top">
            <section class="bp-hero">
              <div class="bp-container bp-hero-inner">
                <img class="bp-hero-logo" src={logo} alt="Bindview logo" />
                <h1 class="bp-hero-title">Bindview</h1>
                <p class="bp-hero-sub">
                  一个使用虚拟 DOM 创建真实 DOM、并提供数据响应式的 JavaScript 前端 UI 构建库。
                  核心库之外，还有路由、状态管理、组件库三个配套项目，四套文档都在同一个站点里。
                </p>

                <div class="bp-hero-actions">
                  <a class="bp-btn bp-btn-lg" href="#start">快速开始</a>
                  <a class="bp-btn bp-btn-lg bp-btn-ghost" href={DOC_SITE} target="_blank" rel="noreferrer">浏览文档</a>
                </div>

                <ul class="bp-hero-chips">
                  {projects.map((item) => (
                    <li key={item.name}>
                      <a class="bp-chip bp-chip-link" href={item.docs} target="_blank" rel="noreferrer">
                        {item.name} v{versionOf(item)}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </section>

            <section class="bp-section" id="ecosystem">
              <div class="bp-container">
                <h2 class="bp-section-title">生态项目</h2>
                <p class="bp-section-desc">
                  四个项目各司其职，都可以独立安装；文档站按项目分成四个分区，每张卡片都能直达对应的文档与源码。
                  卡片上的版本号由浏览器实时向 npm registry 查询，取不到时回退为内置版本。
                </p>

                <div class="bp-grid">
                  {projects.map((item) => (
                    <EcosystemCard
                      item={item}
                      key={item.name}
                      version={() => versionOf(item)}
                    />
                  ))}
                </div>
              </div>
            </section>

            <section class="bp-section bp-section-alt" id="features">
              <div class="bp-container">
                <h2 class="bp-section-title">bindview 核心特性</h2>
                <p class="bp-section-desc">
                  这些能力全部构建在核心库之上：路由、状态管理、组件库都只是「插件 + 组件」，没有另起一套更新机制。
                </p>

                <div class="bp-feature-grid">
                  {features.map((item) => (
                    <div class="bp-feature" key={item.title}>
                      <h3 class="bp-feature-title">{item.title}</h3>
                      <p class="bp-feature-desc">{item.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            <section class="bp-section" id="demo">
              <div class="bp-container bp-demo-layout">
                <div class="bp-demo-copy">
                  <h2 class="bp-section-title">在线演示：数据一改，视图就变</h2>
                  <p class="bp-section-desc">
                    右边这个组件就是模板里的一个普通组件（<code>src/Components/HelloWorld</code>）。
                    它的 data 由 Proxy 代理，直接赋值就会触发更新；同一任务里的多次写入会被合并成一次渲染。
                  </p>
                  <ul class="bp-list">
                    <li>点 <strong>- 1</strong> / <strong>+ 1</strong>：最基础的响应式更新；</li>
                    <li>点 <strong>连续 +3</strong>：三次写入合并成一次 render + diff；</li>
                    <li>点 <strong>重置</strong>：在 <code>$nextTick</code> 之后再读 DOM，验证时机语义。</li>
                  </ul>
                  <p class="bp-hint">
                    想更细地观察更新过程，可以配合 bindview-devtools 浏览器插件查看组件树与事件时间线。
                  </p>
                </div>

                <HelloWorld />
              </div>
            </section>

            <section class="bp-section bp-section-alt" id="start">
              <div class="bp-container">
                <h2 class="bp-section-title">快速开始</h2>
                <p class="bp-section-desc">
                  模板已经配置好 webpack + Babel（JSX）与 Less，克隆下来装好依赖即可开发；
                  需要路由 / 状态管理 / 组件库时，再用 bindview 的插件机制按需接入。
                </p>

                <CodeBlock lang="bash" title="terminal" code={quickStart.install} />
                <CodeBlock lang="js" title="src/main.js" code={quickStart.main} />
                <CodeBlock lang="jsx" title="src/App.jsx" code={quickStart.component} />

                <h3 class="bp-subtitle">模板自带命令</h3>
                <div class="bp-table-wrap">
                  <table class="bp-table">
                    <thead>
                      <tr>
                        <th>命令</th>
                        <th>说明</th>
                      </tr>
                    </thead>
                    <tbody>
                      {scripts.map((row) => (
                        <tr key={row.cmd}>
                          <td><code>{row.cmd}</code></td>
                          <td>{row.desc}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </section>
          </main>

          <footer class="bp-footer">
            <div class="bp-container bp-footer-inner">
              <div class="bp-footer-about">
                <div class="bp-footer-brand">
                  <img class="bp-footer-logo" src={logo} alt="Bindview logo" />
                  <strong>Bindview</strong>
                </div>
                <p class="bp-footer-desc">
                  使用虚拟 DOM 创建真实 DOM，并提供数据响应式的前端 UI 构建库。MIT License。
                </p>
              </div>

              <div class="bp-footer-cols">
                <div class="bp-footer-col">
                  <span class="bp-footer-col-title">在线文档</span>
                  {projects.map((item) => (
                    <a class="bp-footer-link" href={item.docs} target="_blank" rel="noreferrer" key={item.name}>
                      {item.name}
                    </a>
                  ))}
                </div>
                <div class="bp-footer-col">
                  <span class="bp-footer-col-title">源码仓库</span>
                  {projects.map((item) => (
                    <a class="bp-footer-link" href={item.repo} target="_blank" rel="noreferrer" key={item.name}>
                      {item.name}
                    </a>
                  ))}
                </div>
              </div>
            </div>

            <div class="bp-container bp-footer-bottom">
              <span>Bindview · 前端 UI 构建库 · 由 bindview 驱动</span>
              <a class="bp-footer-link" href={DOC_SITE} target="_blank" rel="noreferrer">rongwu.xyz</a>
            </div>
          </footer>
        </div>
      )
    },
    data: () => ({
      /* 从 npm 实时获取到的版本号：{ [包名]: 版本 }，拿到后视图自动刷新 */
      versions: {}
    }),
    life: {
      created() {
        /* 页面标题在生命周期里设置：index.html 里先用工程目录名兜底，
           挂载完成后换成配置好的站点标题（配置见 src/config/ecosystem.js 的 SITE_TITLE）。 */
        document.title = SITE_TITLE

        /* 版本号：进入页面自动获取一次（刷新页面会再调一次），页面上不显示任何提示。
           方法不在实例上，而在 this.methods 上（框架内部以 vm 作为 this 调用）。 */
        this.methods.refreshVersions()
      }
    },
    methods: {
      /**
       * 实时从 npm registry 拉取四个项目的最新版本
       * ----------------------------------------------------------------------
       * 进入页面（life.created）自动执行一次，静默更新版本号。
       * 写入 this.data.versions 后本组件会重新渲染（DataProxy 任意 set 都会
       * queueJob），卡片通过「函数取值器」prop 读取同一份数据，并被默认的
       * linkage 联动重渲染 —— 因此卡片的版本号也会跟着更新，全程无需提示文案。
       * （注意：props 本身不会被刷新，只有函数取值器会在每次 render 时重新调用，
       *   所以版本号必须用函数传，而不能直接传字符串。）
       */
      async refreshVersions() {
        const versions = await fetchLatestVersions(projects.map((item) => item.name))

        if (Object.keys(versions).length > 0) {
          this.data.versions = Object.assign({}, this.data.versions, versions)
        }
      }
    },
    components: { CodeBlock, EcosystemCard, HelloWorld }
  }
}
