import readValue from "../../tools/readValue"

/**
 * 生态项目卡片
 * ----------------------------------------------------------------------------
 * props:
 *  - item:    projects 里的一条数据（静态数据，直接传值即可）
 *  - version: 版本号「函数取值器」，指向父组件从 npm 实时取到的版本表
 *
 * 卡片上的两个入口分别指向：
 *  - 「阅读文档」→ rongwu.xyz 文档站的对应分区
 *  - 「源码仓库」→ GitHub 仓库
 *
 * 为什么版本号要用函数传：
 *   bindview 的 props 只在组件实例创建时传入一次，父组件重新渲染不会刷新子组件的 props。
 *   传函数则不同 —— 父组件数据变化会经 linkage 联动本组件重渲染，此时在 render 里
 *   重新调用该函数，就能读到父组件最新的数据（版本号来自 npm，是异步到达的）。
 */
export default function EcosystemCard(props) {
  const item = readValue(props.item) || {}
  const version = props.version

  return {
    name: "EcosystemCard",
    render() {
      // 取值器优先（npm 实时结果），拿不到时回退到内置版本
      const current = readValue(version) || item.version

      return (
        <article class="bp-card">
          <header class="bp-card-head">
            <h3 class="bp-card-name">{item.name}</h3>
            <span class="bp-chip">v{current}</span>
          </header>

          <p class="bp-card-tagline">{item.tagline}</p>
          <p class="bp-card-desc">{item.desc}</p>

          <ul class="bp-card-tags">
            {(item.highlights || []).map((text) => (
              <li class="bp-tag" key={text}>{text}</li>
            ))}
          </ul>

          <code class="bp-card-install">{item.install}</code>

          <footer class="bp-card-actions">
            <a
              class="bp-card-link"
              href={item.docs}
              target="_blank"
              rel="noreferrer"
            >阅读文档 →</a>
            <a
              class="bp-card-link"
              href={item.repo}
              target="_blank"
              rel="noreferrer"
            >源码仓库 →</a>
          </footer>
        </article>
      )
    }
  }
}
