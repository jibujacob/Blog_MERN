import React ,{useContext, useState} from 'react'
import "./Login.css"
import {Link} from "react-router-dom";

import { useRequest } from '../../hooks/use-request';
import ErrorBox from '../../components/ErrorBox/ErrorBox';
import { Context } from '../../context/Context';


function Login() {
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const {dispatch,isFetching} = useContext(Context)

    const {doRequest,errors} = useRequest({
        url:"/api/users/login",
        method:"post",
        body:{email,password},
        onSuccess: (data) => {
            const {id,createdAt}=data
            dispatch({type:"LOGIN_SUCCESS",payload:{id,createdAt}});
            window.location.replace("/")
        },
        onError:()=>{
            dispatch({type:"LOGIN_FAILURE"});
        },
    });

    const handleSubmit = async (event) => {
        event.preventDefault();
        dispatch({type:"LOGIN_START"})
        doRequest();
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
                <button className="loginButton" 
                    type="submit"
                    disabled={isFetching}>
                    Login
                </button>
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
