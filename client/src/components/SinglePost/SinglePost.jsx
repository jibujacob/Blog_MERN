import React from 'react'
import "./SinglePost.css"

function SinglePost() {
    return (
        <div className="singlePost">
            <div className="singlePostWrapper">
                <img className="singlePostImg"
                    src="https://images.pexels.com/photos/6685428/pexels-photo-6685428.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500" 
                    alt="post_Img" />
                <h1 className="singlePostTitle">
                    Lorem ipsum dolor sit amet
                    <div className="singlePostEdit">
                        <i className="singlePostIcon far fa-edit"></i>
                        <i className="singlePostIcon far fa-trash-alt"></i>
                    </div>
                </h1>
                <div className="singlePostInfo">
                    <span className="singlePostAuthor">
                        Author: <strong>Jibu</strong>
                    </span>
                    <span className="singlePostDate">1 hour ago</span>
                </div>
                <p className="singlePostDescription">
                    Lorem ipsum, dolor sit amet consectetur adipisicing elit. 
                    Aut natus, dolorum fuga aliquid aspernatur, debitis 
                    quisquam architecto ea dolor quasi obcaecati iste quo! 
                    Nobis et quam nulla impedit fuga. Explicabo.
                    Lorem ipsum, dolor sit amet consectetur adipisicing elit. 
                    Aut natus, dolorum fuga aliquid aspernatur, debitis 
                    quisquam architecto ea dolor quasi obcaecati iste quo! 
                    Nobis et quam nulla impedit fuga. Explicabo.
                    Lorem ipsum, dolor sit amet consectetur adipisicing elit. 
                    Aut natus, dolorum fuga aliquid aspernatur, debitis 
                    quisquam architecto ea dolor quasi obcaecati iste quo! 
                    Nobis et quam nulla impedit fuga. Explicabo.
                    Lorem ipsum, dolor sit amet consectetur adipisicing elit. 
                    Aut natus, dolorum fuga aliquid aspernatur, debitis 
                    quisquam architecto ea dolor quasi obcaecati iste quo! 
                    Nobis et quam nulla impedit fuga. Explicabo.
                    Lorem ipsum, dolor sit amet consectetur adipisicing elit. 
                    Aut natus, dolorum fuga aliquid aspernatur, debitis 
                    quisquam architecto ea dolor quasi obcaecati iste quo! 
                    Nobis et quam nulla impedit fuga. Explicabo.
                </p>
                
            </div>

        </div>
    )
}

export default SinglePost
