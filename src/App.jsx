import "./App.css"
import HelloBindview from "./Components/HelloBindview"
export default function () {
  return {
    name: 'App',
    node() {
      return (
        <div id="App">
          <HelloBindview />
        </div>
      )
    },
    life: {
      createDom() {
        console.log(this);
      }
    },
    module: { HelloBindview }
  }
}