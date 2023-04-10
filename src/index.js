import Bindview from "bindview"

// 导入组件
import HelloBindView from "./Components/HelloBindView";

new Bindview({
  el: '#App',
  node(h) {
    return (
      <div class="root">
        <template module={['HelloBindView', () => h.version]}></template>
      </div>
    )
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
