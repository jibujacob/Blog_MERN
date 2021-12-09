import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import "./Topbar.css"

function Topbar() {
    // Added useState to control the hamberger menu state based on click
    const [hamburgerMenuClicked,setHamburgerMenuClicked] = useState(false)
    const user = false 
    return (
        <div className="topbar">
            <div className="topLeft">
                <i className="topIcon fab fa-facebook-square"></i>
                <i className="topIcon fab fa-twitter-square"></i>
                <i className="topIcon fab fa-pinterest-square"></i>
                <i className="topIcon fab fa-instagram-square"></i>
            </div>
            <div className="topCenter">
                <ul className={hamburgerMenuClicked ? "topList topListMobile-active" : "topList" }>
                    <li className="topListItem">
                        <Link className="link" to="/">HOME</Link>
                    </li>
                    <li className="topListItem">
                        <Link className="link" to="/">ABOUT</Link>
                    </li>
                    <li className="topListItem">
                        <Link className="link" to="/">CONTACT</Link>
                    </li>
                    <li className="topListItem">
                        <Link className="link" to="/write">WRITE</Link>
                    </li>
                    <li className="topListItem">
                        {user && "LOGOUT" }
                    </li>
                </ul>
            </div>
            <div className="topRight">
                {
                    user ? 
                        (<img className="topImg" src="https://images.pexels.com/photos/1858175/pexels-photo-1858175.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500" alt="user_profile" />) : 
                        (<ul className="topList">
                            <li className="topListItem">
                                <Link className="link" to="/login">LOGIN</Link>
                            </li>
                            <li className="topListItem">
                                <Link className="link" to="/register">REGISTER</Link>
                            </li>       
                         </ul>)
                }
                
                <i className  ="topSearchIcon fas fa-search"></i>
            </div>
            {
                <div className="topHamburgerMenu" onClick={()=>{
                    setHamburgerMenuClicked(oldValue => !oldValue)
                }}>
                    <div className={hamburgerMenuClicked ? "line1 toggle" : "line1"}></div>
                    <div className={hamburgerMenuClicked ? "line2 toggle" : "line2"}></div>
                    <div className={hamburgerMenuClicked ? "line3 toggle" : "line3"}></div>
                </div>
            }
        </div>
    )
}

export default Topbar
