import style from "./index.less"
export default function HelloBindview() {
  return {
    name: 'HelloBindview',
    render() {
      return (
        <div class={style['head']}>
          <h2>Welcome to Bindview.js TempLate</h2>
          <p>
            <a href="https://github.com/bronze-ding/bindview/" target='_blank'>github</a>
            <span> | </span>
            <a href="https://www.npmjs.com/package/bindview" target='_blank'>npm</a>
          </p>
          <img src={require('../../assets/logo.svg')} alt="logo" />
        </div>
      )
    }
  }
}