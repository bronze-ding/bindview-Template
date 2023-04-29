import style from "./index.less"
export default function () {
  return {
    name: 'HelloBindview',
    node() {
      return (
        <div class={style['head']}>
          <h2>Welcome to BindView.js TempLate</h2>
          <p>
            <a href="https://github.com/debfig/bindview-core" target='_blank'>github</a>
            <span> | </span>
            <a href="https://www.npmjs.com/package/bindview" target='_blank'>npm</a></p>
        </div>
      )
    }
  }
}