import Bindview from "bindview"

// 导入组件
import HelloBindview from "./Components/HelloBindview";

new Bindview({
  el: '#App',
  node(b) {
    return b.$h('div', { class: 'root', module: ['HelloBindview', () => b.version] })
  },
  data: {
    // 版本信息
    version: Bindview.version
  },
  methods: {},
  life: {
    createDom() {
      console.log(this);
    }
  },
  module: {
    // 注册组件
    HelloBindview
  }
})
