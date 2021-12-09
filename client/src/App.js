import Single from "./pages/Single/Single";
import Topbar from "./components/Topbar/Topbar";
import Homepage from "./pages/Homepage/Homepage";

function App() {
  return (
    <div className="App">
      <Topbar/>
      {/* <Homepage/> */}
      <Single/>
    </div>
  );
}

export default App;
