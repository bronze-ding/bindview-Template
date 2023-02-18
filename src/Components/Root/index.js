import "./index.less"

import HelloBindview from "../HelloBindview"

export default function (bv) {
  return bv.$h('div', { class: 'root' }, [
    bv.$h('div', { class: 'top' }, [
      bv.$h('img', { src: require('../../assets/svg/site-logo.1fcab817090e78435061.svg') }),
      bv.$h('span', bv.$h('a', [
        bv.$h('a', { val: 'github', href: 'https://github.com/debfig/bindview', target: "_blank" })
      ])),
      bv.$h('span', bv.$h('a', [
        bv.$h('a', { val: 'npm', href: 'https://www.npmjs.com/package/bindview', target: "_blank" })
      ])),
      bv.$h('img', { src: bv.state ? bv.taiyang : bv.yueliang, class: 'mosi', event: 'click-switchMosi' })
    ]),
    HelloBindview(bv)
  ])
}