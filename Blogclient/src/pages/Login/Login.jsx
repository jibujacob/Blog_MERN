import React ,{useState} from 'react'
import "./Login.css"
import {Link} from "react-router-dom";

import { useRequest } from '../../hooks/use-request';
import ErrorBox from '../../components/ErrorBox/ErrorBox';

function Login() {
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const {doRequest,errors} = useRequest({
        url:"/api/users/login",
        method:"post",
        body:{email,password},
        onSuccess: () => {window.location.replace("/")},
    });

    const handleSubmit = async (event) => {
        event.preventDefault();
        doRequest();
        console.log("error:",errors);
    }
    
    return (
        <div className="login">
            <span className="loginTitle">Login</span>
            <form className="loginForm" onSubmit={handleSubmit}>
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
                <button className="loginButton" type="submit">Login</button>
            </form>
            {errors  && 
                <ErrorBox errors={errors}/>
            }
            <button className="loginRegisterButton">
                <Link className="link" to="/register">Register</Link>
            </button>
        </div>
    )
}

export default Login
