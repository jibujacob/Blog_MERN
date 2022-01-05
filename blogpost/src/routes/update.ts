import { BadRequestError, NotAuthorizedError, NotFoundError, requireAuth, validateRequest } from "@jjblog2022/common";
import {StatusCodes} from "http-status-codes";
import express , {Request,Response} from "express";
import { body } from "express-validator";

import { Post } from "../models/post";

const router = express.Router();

router.put("/api/posts/:postId",
    requireAuth,
    [
        body("title")
            .trim()
            .not()
            .isEmpty()
            .withMessage("Please provide title"),
        body("description")
            .trim()
            .not()
            .isEmpty()
            .withMessage("Please provide valid description")
    ],
    validateRequest,
    async (req:Request,res:Response)=>{

    const {title,description,photo,categories} = req.body;
    const {postId} = req.params;
    
    const existingPost = await Post.findById(postId);
    if(!existingPost){
        throw new NotFoundError();;   
    }
    
    const existingTitle = await Post.findOne({_id:{$ne:postId},title})
    if(existingTitle){
        throw new BadRequestError("Title in use");   
    }

    if(existingPost.userId !== req.currentUser!.id.toString()){
        throw new NotAuthorizedError();
    }

    existingPost.set({...req.body});
    await existingPost.save();
    res.status(StatusCodes.OK).send(existingPost);
});



export {router as updatePostRouter}