import axios from 'axios';
import React, { useState } from 'react'

import './Write.css'
import {useRequest} from "../../hooks/use-request"
import ErrorBox from "../../components/ErrorBox/ErrorBox"

function Write() {
    const [title,setTitle] = useState("");
    const [description,setDescription] = useState("");
    const [file,setFile] = useState("");
    const [uploading,setUploading] = useState(false);
    const [categories,setCategories] = useState("")
    
    const {doRequest,errors} = useRequest({
        url:"/api/posts",
        method:"post",
        body:{},
        onSuccess:(post)=>{
            setUploading(false)
            window.location.replace(`/post/${post.id}`);
        },
        onError:()=>{
            setUploading(false)
        }
    })
    const handleSubmit = async (event) => {
        event.preventDefault();
        setUploading(true)
        const newPost={
            title,
            description
        }

        if(file){
            const data = new FormData();
            //const filename = Date.now() + file.name;
            data.append("image",file);
            try{
                const {data:{image:{src}}} = await axios.post(`/api/posts/upload`,data,{
                    headers:{
                     'Content-Type':'multipart/form-data'
                    }
                })
               newPost.photo =  src
            }catch(error){
                console.log("Image Upload Error",error);
            }     
        }
        let categoriesList = [];
        if(categories){
            categoriesList = categories.toLowerCase().split(",")
            categoriesList.map(async (category) => {
                await axios.post("/api/categories",{name:category});
            })
            newPost.categories = categoriesList;
        }

        doRequest(newPost);
        
    }

    return (
        <div className="write">
            {file && 
                <img className="writeImg" 
                src={URL.createObjectURL(file)} 
                alt="uploaded_img" />    
            }
            <div>
                {uploading && <span style={{color:"blue", margin:"10px"}}>Publishing...</span>}
                {errors && <ErrorBox errors={errors}/>}
            </div>
            
            <form className="writeForm" onSubmit={handleSubmit}>
                <div className="writeFormGroup">
                    <label htmlFor="fileInput">
                        <i className="writeIcon fas fa-upload"></i>
                    </label>
                    <input type="file" 
                        id="fileInput" 
                        onChange={e=>setFile(e.target.files[0])}
                        style={{display:"none"}}/>    
                   <input type="text" 
                            id="Title"
                            placeholder="Title"
                            className="writeInput"
                            value={title}
                            onChange={e => setTitle(e.target.value)}
                            autoFocus={true} />
                            
                </div>
                <div className="writeFormGroup">
                    <input type="text" 
                                id="Category"
                                placeholder="Input category of posts (comma separated if multiple categories)"
                                className="writeCategoryInput"
                                value={categories}
                                onChange={e => setCategories(e.target.value)}/>    
                </div>
                <div className="writeFormGroup">
                    <textarea placeholder="Tell your story..."
                        type="text"
                        value={description}
                        onChange={e => setDescription(e.target.value)}
                        className="writeText writeInput"></textarea>
                </div>
                <button className="writeSubmit"
                    type='submit'>
                    Publish
                </button>
            </form>
        </div>
    )
}

export default Write
