const cloudinary = require("cloudinary").v2;
import { BadRequestError, requireAuth } from "@jjblog2022/common";
import express,{ Request,Response } from "express";
import fs from "fs";
import  {StatusCodes} from "http-status-codes"

const router = express.Router();

router.post("/api/posts/upload",
    requireAuth,
    async(req:Request,res:Response)=>{
    
    if(!req.files){
        throw new BadRequestError("No File Uploaded");
    }
    const productImage = req.files.image; 
    
    //@ts-ignore
    if(!productImage.mimetype.startsWith("image")){
        throw new BadRequestError("Please upload Image file")
    }

    //@ts-ignore
    const result = await cloudinary.uploader.upload(req.files.image.tempFilePath
        ,{use_filename:true,
            folder:"jjblog_posts"})
    //@ts-ignore
    fs.unlinkSync(req.files.image.tempFilePath)
    
    res.status(StatusCodes.OK).json({image:{src:`${result.secure_url}`}})
})

export {router as uploadPost} 