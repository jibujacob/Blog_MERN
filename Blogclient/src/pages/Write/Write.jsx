import React from 'react'
import './Write.css'

function Write() {
    return (
        <div className="write">
            <img className="writeImg" 
                src="https://images.pexels.com/photos/6685428/pexels-photo-6685428.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500" 
                alt="uploaded_img" />
            <form className="writeForm">
                <div className="writeFormGroup">
                    <label htmlFor="fileInput">
                        <i className="writeIcon fas fa-plus"></i>
                    </label>
                    <input type="file" 
                        id="fileInput" 
                        style={{display:"none"}}/>
                    <input type="text" 
                        id="Title"
                        placeholder="Title"
                        className="writeInput"
                        autoFocus={true} />
                </div>
                <div className="writeFormGroup">
                    <textarea placeholder="Tell your story..."
                        type="text"
                        className="writeText writeInput"></textarea>
                </div>
                <button className="writeSubmit">Publish</button>
            </form>
        </div>
    )
}

export default Write
