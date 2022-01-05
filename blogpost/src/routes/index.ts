import {  NotFoundError } from "@jjblog2022/common";
import {StatusCodes} from "http-status-codes";
import express , {Request,Response} from "express";

import { Post } from "../models/post";

const router = express.Router();
interface PostQuery{
    userId?:string;
    categories?:any;
}
router.get("/api/posts",
    async (req:Request,res:Response)=>{

    let queryObject:PostQuery={};

    const userId:string|undefined = req.query.userId?.toString();
    const categories:string|undefined = req.query.category?.toString();

    if(userId){
        queryObject.userId = userId;
    }

    if(categories){
        queryObject.categories = {$in:[categories]}; //{categories:{$in:categoryName.split(",")}};
    }
    
    const posts = await Post.find(queryObject);

    res.status(StatusCodes.OK).send(posts);
});

export {router as indexPostsRouter}