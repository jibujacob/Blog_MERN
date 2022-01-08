import React,{useContext,useState} from 'react'
import axios from "axios";

import "./Settings.css"
import Sidebar from "../../components/Sidebar/Sidebar.jsx"
import {Context} from "../../context/Context";
import { useRequest } from '../../hooks/use-request';
import ErrorBox from '../../components/ErrorBox/ErrorBox';


function Settings() {
    const {user,dispatch} = useContext(Context);
    const [username,setUsername] = useState("");
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const [file,setFile] = useState("");
    const [updating,setUpdating] = useState(false);

    const handleLogout = async ()=>{
        await axios.post("/api/users/logout");
        localStorage.setItem("user",null);
        dispatch({type:"LOGOUT"});
        
    }
    
    const {doRequest,errors} = useRequest({
        url:`/api/users/${user && user.id}`,
        method:"put",
        body:{
            username,email,password
        },
        onSuccess:() => { 
            handleLogout();
            setUpdating(false)
            window.location.replace("/login")
        },
        onError:()=>{setUpdating(false)}
    })

    const updateUser = async (event) =>{
        event.preventDefault();
        setUpdating(true)
        let profilePic;
        if(file){
            const data = new FormData();
            //const filename = Date.now() + file.name;
            data.append("image",file);
            try{
                const {data:{image:{src}}} = await axios.post(`/api/users/upload`,data,{
                    headers:{
                     'Content-Type':'multipart/form-data'
                    }
                })
            console.log("src:",src);
            profilePic =  src
            }catch(error){
                console.log("Image Upload Error",error);
            }     
        }else{
            profilePic =  user.profilePic;

        }
        doRequest({profilePic});
    }
    
    const deleteUser = async () =>{
        await axios.delete(`/api/users/${user && user.id}`)
        window.location.replace("/")
    } 

    return (
        <div className="settings">
            <div className="settingsWrapper">
                <div className="settingsTitle">
                    <span className="settingsUpdateTitle">Update Your Account</span>
                    <span className="settingsDeleteTitle" onClick={deleteUser}>Delete Account</span>
                </div>
                <form className="settingsForm" onSubmit={updateUser}>
                    <label>Profile Picture</label>
                    <div className="settingsPP">
                        {file  
                            ?<img src={URL.createObjectURL(file) || "/profile_default.jpeg"} alt="profile_img" /> 
                            :<img src={(user && user.profilePic) || "/profile_default.jpeg"}
                            alt="profile_img" />  
                        }
                        
                        <label htmlFor="fileInput">
                            <i className="settingsPPIcon far fa-user-circle"></i>
                        </label>
                        <input type="file" 
                            id="fileInput"  
                            onChange={e=>setFile(e.target.files[0])}
                            style={{display:"none"}}/>
                    </div>
                    <label >Username</label>
                    <input type="text" 
                        value={username}
                        onChange={e => setUsername(e.target.value)}
                        placeholder="username"
                        required
                        />
                    <label >Email</label>
                    <input type="text" 
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        placeholder="email"
                        required
                        />
                    <label >Password</label>
                    <input type="password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        required
                    />
                    {errors && <ErrorBox errors={errors}/>}
                    {updating && <span style={{color:"blue",margin:"10px"}}>Update Inprogess...</span>}
                    <button className="settingsSubmit" type="submit">
                        Update
                    </button>
                </form>
            </div> 
            <Sidebar/>
        </div>
    );
}

export default Settings
