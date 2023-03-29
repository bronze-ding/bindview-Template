// import Bindview from "bindview"
import Bindview from "../../bindview/src"
// console.log(require('../../bindview/dist/bindeview'));
import root from './Components/Root'

new Bindview({
  el: '#App',
  data: {
    taiyang: require('./assets/png/taiyang.png'),
    yueliang: require('./assets/png/yueliang.png'),
    state: JSON.parse(localStorage.getItem('backgroundColor')) != null ? JSON.parse(localStorage.getItem('backgroundColor')) : true,
    timer: null,
    introduceWidth: 0
  },
  node(an) {
    return root(an)
  },
  methods: {
    switchMosi(_, _this) {
      _this.data.state = !_this.data.state;
      if (_this.data.state) {
        document.body.style.backgroundColor = '#fff'
        localStorage.setItem('backgroundColor', true)
      } else {
        document.body.style.backgroundColor = '#687387'
        localStorage.setItem('backgroundColor', false)
      }
    }
  },
  life: {
    createDom() {
      if (this.data.state) {
        document.body.style.backgroundColor = '#fff'
      } else {
        document.body.style.backgroundColor = '#687387'
      }

      this.data.timer = setInterval(() => {
        if (this.data.introduceWidth < 100) {
          this.data.introduceWidth++;
          this.refs.introduce.style.width = `${this.data.introduceWidth}%`;
        } else {
          clearInterval(this.data.timer);
        }
      }, 200)
    }
  }
})
