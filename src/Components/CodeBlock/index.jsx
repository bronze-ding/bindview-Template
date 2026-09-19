import readValue from "../../tools/readValue"

/**
 * 代码块（风格化外壳 + 一键复制）
 * ----------------------------------------------------------------------------
 * props:
 *  - code:  代码字符串（必填）
 *  - lang:  语言标记，显示在右上角标签处，默认 text
 *  - title: 自定义标签文案（优先于 lang）
 *
 * 顺便演示 bindview 的几个常规用法：
 *  - data 里的 copied 是响应式数据，赋值后视图自动更新（按钮文案「复制 → 已复制」）；
 *  - 组件工厂函数体内声明的 timer 是「每个实例一份」的普通变量，不进响应式系统；
 *  - 生命周期 life.beforeDestroy 里清理定时器，避免组件销毁后回调仍执行。
 */
export default function CodeBlock(props) {
  let timer = null

  const code = String(readValue(props.code) || "")
  const lang = readValue(props.lang) || "text"
  const title = readValue(props.title) || lang

  return {
    name: "CodeBlock",
    render() {
      const { data: _, methods: f } = this

      return (
        <div class="bp-code">
          <div class="bp-code-bar">
            <span class="bp-code-dots"><i></i><i></i><i></i></span>
            <span class="bp-code-lang">{title}</span>
            <button
              class={"bp-code-copy" + (_.copied ? " is-done" : "")}
              onClick={f.copy}
            >{_.copied ? "已复制" : "复制"}</button>
          </div>
          <pre class="bp-code-pre"><code class="bp-code-body">{code}</code></pre>
        </div>
      )
    },
    data: () => ({ copied: false }),
    methods: {
      copy() {
        const done = () => {
          this.data.copied = true
          if (timer) clearTimeout(timer)
          timer = setTimeout(() => {
            this.data.copied = false
          }, 1500)
        }

        const fallback = () => {
          const area = document.createElement("textarea")
          area.value = code
          area.style.position = "fixed"
          area.style.opacity = "0"
          document.body.appendChild(area)
          area.select()
          try {
            document.execCommand("copy")
            done()
          } catch (err) {
            console.warn("复制失败，请手动选择复制：", err)
          }
          document.body.removeChild(area)
        }

        if (navigator.clipboard && navigator.clipboard.writeText) {
          navigator.clipboard.writeText(code).then(done).catch(fallback)
        } else {
          fallback()
        }
      }
    },
    life: {
      beforeDestroy() {
        if (timer) clearTimeout(timer)
      }
    }
  }
}
