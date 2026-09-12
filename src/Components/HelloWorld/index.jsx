import style from "./index.less"

export default function HelloWorld(props) {
  const { msg } = props

  return {
    name: "HelloWorld",
    render() {
      const { data: $, methods: f } = this

      return (
        <div class={style["hello"]}>
          <h1>{msg()}</h1>
          <p>
            了解如何配置和自定义项目，请查看
            <a href="https://github.com/bronze-ding/Bindview" target="_blank">Bindview 使用文档</a>。
          </p>
        </div>
      )
    },
    data: () => ({
      count: 0
    }),
    methods: {
      add() {
        this.data.count++
      }
    }
  }
}
