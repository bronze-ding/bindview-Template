import "./App.css"
import HelloBindview from "./Components/HelloBindview"
export default function App() {
  return {
    name: 'App',
    render() {
      return (
        <div id="App">
          <HelloBindview />
        </div>
      )
    },
    life: {
      created() {
        console.log(this);
      }
    },
    components: { HelloBindview }
  }
}