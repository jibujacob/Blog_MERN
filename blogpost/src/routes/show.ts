import {  NotFoundError } from "@jjblog2022/common";
import {StatusCodes} from "http-status-codes";
import express , {Request,Response} from "express";

import { Post } from "../models/post";

const router = express.Router();

router.get("/api/posts/:postId",
    async (req:Request,res:Response)=>{
    const {postId} = req.params;
    
    const existingPost = await Post.findById(postId);
    if(!existingPost){
        throw new NotFoundError();;   
    }
    res.status(StatusCodes.OK).send(existingPost);
});



export {router as showPostRouter}