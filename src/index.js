import Bindview from "bindview"

// 导入组件
import HelloBindView from "./Components/HelloBindView";

new Bindview({
  el: '#App',
  node(h) {
    return h('div', { class: 'root' }, [
      // 使用 template 标签来作为组件容器
      h('template', { module: ['HelloBindView', () => h.version] })
    ])
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
    HelloBindView,
  }
})
