import React, { useEffect, useState } from 'react';
import axios from "axios";
import Header from '../../components/Header/Header'
import Posts from '../../components/Posts/Posts'
import Sidebar from '../../components/Sidebar/Sidebar'
import "./Homepage.css"
import { useLocation } from 'react-router-dom';

function Homepage() {
    const [posts,setPosts] = useState([]);
    const {search} = useLocation();

    useEffect(()=>{
        const fetchPosts = async () =>{
            const res = await axios.get("/api/posts"+search);
            setPosts(res.data)
        }
        fetchPosts();
    },[search])
    return (
        <>
            <Header/>
            <div className="homepage">
                <Posts posts={posts}/>
                <Sidebar/>
            </div>
        </>
    )
}

export default Homepage
