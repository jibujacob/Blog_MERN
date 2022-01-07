import React, { useState,useContext } from 'react'
import "./Register.css"

import {Link} from "react-router-dom"
import {useRequest} from '../../hooks/use-request';
import ErrorBox from '../../components/ErrorBox/ErrorBox';
import {Context} from "../../context/Context"


function Register() {
    const [username,setUsername] = useState("");
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const {dispatch,isFetching} = useContext(Context)

    const {doRequest,errors} = useRequest({
        url:"/api/users/register",
        method:"post",
        body:{username,email,password},
        onSuccess: (data) => {
            const {id,createdAt,profilePic}=data
                dispatch({type:"REGISTER_SUCCESS",payload:{id,createdAt,profilePic}});
                window.location.replace("/")
            },
        onError:()=>{
            dispatch({type:"REGISTER_FAILURE"});
        }
    });

    const handleSubmit = async (event) => {
        event.preventDefault();
        dispatch({type:"REGISTER_START"});
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
                <button className="registerButton" 
                    type="submit"
                    disabled={isFetching}>
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
