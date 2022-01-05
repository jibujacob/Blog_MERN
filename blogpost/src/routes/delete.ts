import {  NotAuthorizedError, NotFoundError, requireAuth } from "@jjblog2022/common";
import {StatusCodes} from "http-status-codes";
import express , {Request,Response} from "express";

import { Post } from "../models/post";

const router = express.Router();

router.delete("/api/posts/:postId",
    requireAuth,
    async (req:Request,res:Response)=>{

    const {postId} = req.params;
    
    const existingPost = await Post.findById(postId);
    if(!existingPost){
        throw new NotFoundError();;   
    }

    if(existingPost.userId !== req.currentUser!.id.toString()){
        throw new NotAuthorizedError();
    }

    await Post.findByIdAndDelete(postId)
    res.status(StatusCodes.OK).send({});
});



export {router as deletePostRouter}