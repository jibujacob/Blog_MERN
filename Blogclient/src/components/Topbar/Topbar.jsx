import React,{useState,useContext,useEffect} from 'react'
import { Link } from 'react-router-dom'
import axios from "axios"
import "./Topbar.css"

import {Context} from "../../context/Context"


function Topbar() {
    const user = useContext(Context);
    const [access,setAccess] = useState(false)
    const {dispatch} = useContext(Context)

    

    useEffect(()=>{
        const validateAccess = async()=>{
          const currentUser = await axios.get("/api/users/currentUser");
          if(user.user && currentUser.data.currentUser && (currentUser.data.currentUser.id === user.user.id)){
            setAccess(true);
          }
        }
        validateAccess();

    },[user.user])

    const handleLogout = async ()=>{
        await axios.post("/api/users/logout");
        localStorage.setItem("user",null);
        dispatch({type:"LOGOUT"});
        window.location.replace("/")
    }

    return (
        <div className="topbar">
            <div className="topLeft">
                <i className="topIcon fab fa-facebook-square"></i>
                <i className="topIcon fab fa-twitter-square"></i>
                <i className="topIcon fab fa-pinterest-square"></i>
                <i className="topIcon fab fa-instagram-square"></i>
            </div>
            <div className="topCenter">
                <ul className="topList">
                    <li className="topListItem">
                        <Link className="link" to="/">HOME</Link>
                    </li>
                    {/* <li className="topListItem">
                        <Link className="link" to="/">ABOUT</Link>
                    </li>
                    <li className="topListItem">
                        <Link className="link" to="/">CONTACT</Link>
                    </li> */}
                    <li className="topListItem">
                        <Link className="link" to="/write">WRITE</Link>
                    </li>
                    <li className="topListItem" onClick={handleLogout}>
                        {access && "LOGOUT" }
                    </li>
                </ul>
            </div>
            <div className="topRight">
                {
                    access ? 
                        ( <Link to="/settings">
                                <img className="topImg" 
                                src={(user.user && user.user.profilePic) || "/profile_default.jpeg"} 
                                alt="user_profile"/> 
                            </Link> 
                        ) : 
                        (<ul className="topList">
                            <li className="topListItem">
                                <Link className="link" to="/login">LOGIN</Link>
                            </li>
                            <li className="topListItem">
                                <Link className="link" to="/register">REGISTER</Link>
                            </li>       
                         </ul>)
                }
                {/* https://images.pexels.com/photos/1858175/pexels-photo-1858175.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500 */}
                <i className  ="topSearchIcon fas fa-search"></i>
            </div>
        </div>
    )
}

export default Topbar
