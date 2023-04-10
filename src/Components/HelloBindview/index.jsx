import style from "./index.less"
export default function (el, version) {
  return {
    el,
    node() {
      // 为了解决组件间样式的污染,bindview-Temolate在webpack.config.js中使用了css-module,在配合less预处理器
      return (
        <div class={style['head']}>
          <h2>Welcome to BindView.js TempLate</h2>
          <h3>{`BindView.js 版本 ${version()}v`}</h3>
        </div>
      )
    },
  }
}