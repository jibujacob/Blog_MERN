import React from 'react'
import "./Settings.css"
import Sidebar from "../../components/Sidebar/Sidebar.jsx"

function Settings() {
    return (
        <div className="settings">
            <div className="settingsWrapper">
                <div className="settingsTitle">
                    <span className="settingsUpdateTitle">Update Your Account</span>
                    <span className="settingsDeleteTitle">Delete Account</span>
                </div>
                <form className="settingsForm">
                    <label>Profile Picture</label>
                    <div className="settingsPP">
                        <img src="https://images.pexels.com/photos/6685428/pexels-photo-6685428.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500" 
                            alt="profile_img" />
                        <label htmlFor="fileInput">
                            <i class="settingsPPIcon far fa-user-circle"></i>
                        </label>
                        <input type="file" id="fileInput"  style={{display:"none"}}/>
                    </div>
                    <label >Username</label>
                    <input type="text" placeholder="Jibu"/>
                    <label >Email</label>
                    <input type="text" placeholder="jibu@abc.com"/>
                    <label >Password</label>
                    <input type="password"/>
                    <button className="settingsSubmit">Update</button>
                </form>
            </div> 
            <Sidebar/>
        </div>
    );
}

export default Settings
