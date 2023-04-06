import style from "./index.less"

import axios from "axios"

export default function (el) {
  return {
    el,
    node(b) {
      return b.$h('div', { class: style['markdown'] }, [
        b.$h('div', { id: 'show', ref: 'show', html: b.markdown })
      ])
    },
    data: {
      markdown: '好像获取数据失败了！！'
    },
    life: {
      createDom() {
        let _this = this;
        axios.get('http://canlie.xyz:8001/api/markdown').then((data) => {
          if (data.status == 200) {
            _this.data.markdown = data.data
          }
        })
      },
    }
  }
}