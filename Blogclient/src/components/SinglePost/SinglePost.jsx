import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { useLocation,Link } from 'react-router-dom'
import { Context } from '../../context/Context';
import "./SinglePost.css"

function SinglePost() {
    //Fetching the userid from the url
    const location = useLocation();
    const postId = location.pathname.split("/")[2]
    const [post,setPost] = useState({});
    const [postowner,setPostOwner] = useState({});
    const [updateMode,setUpdateMode] = useState(false);
    const [title,setTitle] =useState(post.title);
    const [description,setDescription] = useState()
    const {user} = useContext(Context)

    useEffect(()=>{
        const fetchPostandUsername = async () =>{
            const postRes = await axios.get(`/api/posts/${postId}`);
            setPost(postRes.data);
            setTitle(postRes.data.title);
            setDescription(postRes.data.description);

            
            const userRes = await axios.post("/api/users/fetchusername",{userId:postRes.data.userId});
            setPostOwner(userRes.data);
        }
        fetchPostandUsername();
    },[postId]);

    const deletePost = async () =>{
        await axios.delete(`/api/posts/${post.id}`)
        window.location.replace("/")
        setUpdateMode(false)
    }

    const updatePost = async () =>{
        await axios.put(`/api/posts/${postId}`,{
            title,description
        });
        window.location.reload();
    }
    return (
        <div className="singlePost">
            <div className="singlePostWrapper">
                {post.photo && 
                    <img className="singlePostImg"
                    src={post.photo}
                    alt="post_Img" />
                }
                
                {updateMode 
                    ? <input type="text" 
                            value={title} 
                            onChange={(e)=>setTitle(e.target.value)}
                            className="singlePostTitleInput"
                            autoFocus
                            />
                    : (<h1 className="singlePostTitle">
                    {post.title}

                    {user && post.userId ===user.id
                    ? (<div className="singlePostEdit">
                        <i className="singlePostIcon far fa-edit" onClick={()=>setUpdateMode(true)}></i>
                        <i className="singlePostIcon far fa-trash-alt" onClick={deletePost}></i>
                    </div> )
                    : null}    
                </h1>)
                }
                
                <div className="singlePostInfo">
                    <Link to={`/?userId=${post.userId}`} className='link'>
                        <span className="singlePostAuthor">
                            Author: <strong>{postowner.username}</strong>
                        </span>    
                    </Link>
                    <span className="singlePostDate">{new Date(post.createdAt).toDateString()}</span>
                </div>
                {updateMode 
                    ? <textarea 
                        className="singlePostDescriptionInput"
                        value={description}
                        onChange={e=>setDescription(e.target.value)}
                        />
                    :   <p className="singlePostDescription">
                            {post.description}
                        </p>
                }
                {updateMode && 
                    <button className="singlePostButton"
                        onClick={updatePost}>
                        Update
                    </button>
                }
            </div>
        </div>
    )
}

export default SinglePost
