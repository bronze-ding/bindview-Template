import style from "./index.less"

/**
 * 在线演示：一个能跑的 bindview 组件
 * ----------------------------------------------------------------------------
 * 这个组件同时演示了框架最主要的四件事：
 *  1. data 是响应式数据，直接赋值（this.data.count++）视图就会更新；
 *  2. methods 里可以写任意逻辑，模板中用 f.xxx 绑定事件；
 *  3. 同一任务内的多次写入会被合并成一次 render + diff（点「连续 +3」按钮验证）；
 *  4. ref 拿到真实 DOM，配合 await this.$nextTick() 在 DOM 更新后读取最新内容。
 *
 * 样式用 Less 模块书写（class 名由构建工具哈希隔离），
 * 所以这里用 style["demo"] 这种方式取值，不会污染其它组件的样式。
 */
export default function HelloWorld() {
  return {
    name: "HelloWorld",
    render() {
      const { data: _, methods: f } = this

      return (
        <div class={style["demo"]}>
          <div class={style["count"]} ref="count">{_.count}</div>

          <div class={style["ops"]}>
            <button class={style["btn"]} onClick={f.minus}>- 1</button>
            <button class={style["btn"]} onClick={f.plus}>+ 1</button>
            <button class={style["btn"]} onClick={f.burst}>连续 +3（合并成一次更新）</button>
            <button class={[style["btn"], style["ghost"]].join(" ")} onClick={f.reset}>重置</button>
          </div>

          <p class={style["log"]}>{_.log}</p>
        </div>
      )
    },
    data: () => ({
      count: 0,
      log: "点击按钮试试：data 里的 count 一改，视图立刻跟着变。"
    }),
    methods: {
      minus() {
        this.data.count--
        this.data.log = "count 减 1，只重渲染这一个组件。"
      },

      plus() {
        this.data.count++
        this.data.log = "count 加 1，只重渲染这一个组件。"
      },

      // 三次写入发生在同一个任务里，调度器只安排一次 render + diff
      async burst() {
        const before = this.refs.count.textContent

        this.data.count++
        this.data.count++
        this.data.count++

        await this.$nextTick()

        const after = this.refs.count.textContent
        this.data.log = `同一任务内写入 3 次：DOM 从 ${before} 变成 ${after}，` +
          "只发生了一次渲染（微任务批处理）。"
      },

      async reset() {
        this.data.count = 0
        await this.$nextTick()
        this.data.log = "已在 $nextTick 之后重置为 0。"
      }
    }
  }
}
