import Bindview from "bindview"

// 导入App组件
import App from "./App"

new Bindview({
  el: '#Root',
  render: () => (<App />),
  components: { App }
})
