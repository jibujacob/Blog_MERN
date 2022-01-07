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
import { useContext, useEffect,useState } from "react";
import { Context } from "./context/Context";
import axios from "axios";

function App() {
  const user = useContext(Context);
  const [access,setAccess] = useState(false)

  useEffect(()=>{
    const validateAccess = async()=>{
      const currentUser = await axios.get("/api/users/currentUser");
      if(user.user && currentUser.data.currentUser && (currentUser.data.currentUser.id === user.user.id)){
        setAccess(true);
      }
    }
    validateAccess();

  },[user.user])


  return (
    <Router>
      <Topbar/>
      <Switch>
        <Route exact path="/">
          <Homepage/> 
        </Route>
        <Route path="/register">
          {access ? <Homepage/> : <Register/> }
        </Route>
        <Route path="/login">
          {access ? <Homepage/> : <Login/> } 
        </Route>
        <Route path="/write">
          {access ? <Write/> : <Register/> } 
        </Route>
        <Route path="/settings"> 
          {access ? <Settings/> : <Register/> } 
        </Route>
        <Route path="/post/:postId">
          <Single/> 
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
