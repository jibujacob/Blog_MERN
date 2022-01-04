import Topbar from "./components/Topbar/Topbar";
import Homepage from "./pages/Homepage/Homepage";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import Settings from "./pages/Settings/Settings";
import Single from "./pages/Single/Single";
import Write from "./pages/Write/Write";


import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";


function App() {
  const user = false;

  return (
    <Router>
      <Topbar/>
      <Switch>
        <Route exact path="/">
          <Homepage/> 
        </Route>
        <Route path="/register">
          {user ? <Homepage/> : <Register/> }
        </Route>
        <Route path="/login">
          {user ? <Homepage/> : <Login/> } 
        </Route>
        <Route path="/write">
          {user ? <Write/> : <Register/> } 
        </Route>
        <Route path="/settings"> 
          {user ? <Settings/> : <Register/> } 
        </Route>
        <Route path="/post/:postId">
          <Single/> 
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
