import React from 'react'
import './Post.css'

import {Link} from "react-router-dom"

function Post({post}) {

    return (
        <div className="post">
            <img className="postImg"
                src={post.photo}
                alt="post_img" />
            <div className="postInfo">
                <div className="postCategories">
                    {post.categories.map((category,index) => {
                        return <span key ={index} className="postCategory">{category}</span>
                    })}
                    {/* <span className="postCategory">Music</span>
                    <span className="postCategory">Life</span> */}
                </div>
                <Link to={`/post/${post.id}`} className='link'>
                    <span className="postTitle">
                        {post.title}    
                    </span>
                </Link>
                <hr />
                <span className="postDate">1 hour ago</span>
            </div>
            <p className="postDescription">
                {post.description} 
            </p>
        </div>
    )
}

export default Post
