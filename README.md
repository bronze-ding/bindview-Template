## 使用git下载
   ```
   git clone https://github.com/debfig/bindview-Template.git
   ```
## 安装包
   ```
   npm i
   ```
## 安装最新的 bindview.js
   ```
   npm i bindview
   ```
## 运行
   ```
   npm run serve
   ```
## 打包
   ```
   npm run build
   ```

# 使用
>## src/index.js 为根组件
>### 根组件会将所有的组件和虚拟dom渲染在 `public/index.html` 中`<div id="App"></div>`标签中
>```jsx
>import Bindview from "bindview"
>
>// 导入组件
>import HelloBindview from "./Components/HelloBindview";
>
>new Bindview({
>  el: '#App',
>  node(h) {
>    // 推荐使用 template 标签来作为组件容器
>    return (<template module={ ['HelloBindview', () => h.version]}></template>)
>  },
>  data: {
>    // 版本信息
>    version: Bindview.version
>  },
>  methods: {},
>  life: {
>    createDom() {
>      console.log(this);
>    }
>  },
>  module: {
>    // 注册组件
>    HelloBindview
>  }
>})
>
>```
>## HelloBindview 组件
>### 这里HelloBindview在根组件中被应用
>### 一定要使用导入样式的 `style`来设置组件根标签`calss或id`这样可以避免样式污染
>```jsx
>import style from "./index.less"
>export default function (el, version) {
>  return {
>    el,
>    node(h) {
>      // 为了解决组件间样式的污染,bindview-Temolate在webpack.config.js中使用了css-module,在配合less预处理器
>      return (
>        <div class={style['head']}>
>          <h2>Welcome to BindView.js TempLate</h2>
>          <h3>{`BindView.js 版本 ${version()}v`}</h3>
>        </div>
>      )
>    },
>    data: {}
>  }
>}
>```