import React from 'react'
import './Post.css'

function Post() {
    return (
        <div className="post">
            <img className="postImg"
                src="https://images.pexels.com/photos/1858175/pexels-photo-1858175.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500" 
                alt="post_img" />
            <div className="postInfo">
                <div className="postCategories">
                    <span className="postCategory">Music</span>
                    <span className="postCategory">Life</span>
                </div>
                <span className="postTitle">
                    Lorem ipsum dolor sit
                </span>
                <hr />
                <span className="postDate">1 hour ago</span>
            </div>
            <p className="postDescription">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. 
                Magni aut, deleniti, enim odit accusantium vero nobis 
                dolore natus aliquid ullam repellendus fugiat cum quod 
                ipsa eligendi ut nesciunt, maxime eos.
                Lorem ipsum dolor sit amet consectetur adipisicing elit. 
                Magni aut, deleniti, enim odit accusantium vero nobis 
                dolore natus aliquid ullam repellendus fugiat cum quod 
                ipsa eligendi ut nesciunt, maxime eos.
                Lorem ipsum dolor sit amet consectetur adipisicing elit. 
                Magni aut, deleniti, enim odit accusantium vero nobis 
                dolore natus aliquid ullam repellendus fugiat cum quod 
                ipsa eligendi ut nesciunt, maxime eos.
            </p>
        </div>
    )
}

export default Post
