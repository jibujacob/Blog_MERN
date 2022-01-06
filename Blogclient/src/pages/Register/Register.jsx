import React, { useState } from 'react'
import "./Register.css"

import {Link} from "react-router-dom"
import {useRequest} from '../../hooks/use-request';
import ErrorBox from '../../components/ErrorBox/ErrorBox';


function Register() {
    const [username,setUsername] = useState("");
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    
    const {doRequest,errors} = useRequest({
        url:"/api/users/register",
        method:"post",
        body:{username,email,password},
        onSuccess: () => {window.location.replace("/")},
    });

    const handleSubmit = async (event) => {
        event.preventDefault();
        doRequest();
    }

    return (
        <div className="register">
            <span className="registerTitle">Register</span>
            <form className="registerForm" onSubmit={handleSubmit}>
                <label>Username</label>
                <input type="text" 
                    placeholder="Enter your username..." 
                    value={username}
                    onChange={(e)=>setUsername(e.target.value)}
                    />
                <label>Email</label>
                <input type="email" 
                    placeholder="Enter your email..."
                    value={email}
                    onChange={(e)=>setEmail(e.target.value)}
                    />
                <label>Password</label>
                <input type="password" 
                    placeholder="Enter your password..."
                    value={password}
                    onChange={(e)=>setPassword(e.target.value)}
                    />
                <button className="registerButton" type="submit">
                    Register
                </button>
            </form>
            {errors && <ErrorBox errors={errors}/>}
            <button className="registerLoginButton">
                <Link className="link" to="/login">Login</Link>
            </button>
        </div>
    )
}

export default Register
