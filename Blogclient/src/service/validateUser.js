import {Context} from "../../context/Context"
import axios from "axios"
import React,{useState,useContext,useEffect} from 'react'

const validateUser = async()=>{
    const user = useContext(Context);
    const [access,setAccess] = useState(false)
    const {dispatch} = useContext(Context);

    useEffect(()=>{
        const validateAccess = async()=>{
          const currentUser = await axios.get("/api/users/currentUser");
          if(user.user && currentUser.data.currentUser && (currentUser.data.currentUser.id === user.user.id)){
            setAccess(true);
          }
        }
        validateAccess();

    },[user.user])

}

    

    

    
