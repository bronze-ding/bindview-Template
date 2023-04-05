import "./index.less"
export default function (el, version) {
  return {
    el,
    node(b) {
      let h = b.$h;
      return h('div', [
        h('h2', 'Welcome to BindView.js TempLate'),
        h('h3', `BindView.js 版本 ${version()}v`)
      ])
    },
    data: {}
  }
}