import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useLocation,Link } from 'react-router-dom'
import "./SinglePost.css"

function SinglePost() {
    //Fetching the userid from the url
    const location = useLocation();
    const postId = location.pathname.split("/")[2]
    const [post,setPost] = useState({});
    const [postowner,setPostOwner] = useState({});

    useEffect(()=>{
        const fetchPostandUsername = async () =>{
            const postRes = await axios.get(`/api/posts/${postId}`);
            setPost(postRes.data);
            const userRes = await axios.post("/api/users/fetchusername",{userId:postRes.data.userId});
            setPostOwner(userRes.data);
        }
        fetchPostandUsername();
    },[postId]);

    return (
        <div className="singlePost">
            <div className="singlePostWrapper">
                <img className="singlePostImg"
                    src={post.photo}
                    alt="post_Img" />
                <h1 className="singlePostTitle">
                    {post.title}
                    <div className="singlePostEdit">
                        <i className="singlePostIcon far fa-edit"></i>
                        <i className="singlePostIcon far fa-trash-alt"></i>
                    </div>
                </h1>
                <div className="singlePostInfo">
                    <Link to={`/?userId=${post.userId}`} className='link'>
                        <span className="singlePostAuthor">
                            Author: <strong>{postowner.username}</strong>
                        </span>    
                    </Link>
                    <span className="singlePostDate">{new Date(post.createdAt).toDateString()}</span>
                </div>
                <p className="singlePostDescription">
                    {post.description}
                </p>
                
            </div>

        </div>
    )
}

export default SinglePost
