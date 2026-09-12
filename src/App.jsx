import "./App.css"
import logo from "./assets/logo.png"
import HelloWorld from "./Components/HelloWorld"

export default function App() {
  return {
    name: "App",
    render() {
      return (
        <div id="App">
          <img class="logo" src={logo} alt="Bindview logo" />
          <HelloWorld msg={() => "Welcome to Your Bindview.js App"} />
        </div>
      )
    },
    components: { HelloWorld }
  }
}
