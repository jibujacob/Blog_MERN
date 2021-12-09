import Topbar from "./components/Topbar/Topbar";
import Homepage from "./pages/Homepage/Homepage";
import Settings from "./pages/Settings/Settings";
import Single from "./pages/Single/Single";
import Write from "./pages/Write/Write";

function App() {
  return (
    <div className="App">
      <Topbar/>
      {/* <Homepage/> */}
      {/* <Single/> */}
      {/* <Write/> */}
      <Settings/>
    </div>
  );
}

export default App;
