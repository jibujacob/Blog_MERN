import { BadRequestError, requireAuth, validateRequest } from "@jjblog2022/common";
import {StatusCodes} from "http-status-codes";
import express , {Request,Response} from "express";
import { body } from "express-validator";

import { Post } from "../models/post";

const router = express.Router();

router.post("/api/posts",
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

    const existingTitle = await Post.findOne({title})
    if(existingTitle){
        throw new BadRequestError("Title in use")   
    }

    const post = Post.build({title,description,photo,categories,userId:req.currentUser!.id.toString()});
    await post.save();

    res.status(StatusCodes.CREATED).send(post);
});



export {router as createPostRouter}