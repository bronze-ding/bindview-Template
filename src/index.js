import Bindview from "bindview"

// 导入组件
import HelloBindView from "./Components/HelloBindView";
import Markdown from "./Components/Markdown";

new Bindview({
  el: '#App',
  node(b) {
    return b.$h('div', { class: 'root' }, [
      // 使用 template 标签来作为组件容器
      b.$h('template', { module: ['HelloBindView', () => b.version] }),
      b.$h('template', { module: ['Markdown'] })
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
    Markdown
  }
})
