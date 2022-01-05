import { BadRequestError, NotAuthorizedError, requireAuth } from "@jjblog2022/common";
import express , {Request,Response} from "express";
import { StatusCodes } from "http-status-codes";

import { User } from "../models/user";

const router = express.Router();

router.delete("/api/users/:userId",
    requireAuth,
    async (req:Request,res:Response) => {

    const {userId} = req.params;

    if(userId !== req.currentUser!.id){
        throw new NotAuthorizedError();
    }

    const existingUser = await User.findById(userId);
    if(!existingUser){
        throw new BadRequestError("Invalid Credentials");
    }

    await User.findByIdAndDelete(existingUser._id)
    
    req.session = null;
    res.status(StatusCodes.OK).send({});
    
});

export {router as deleteUserRouter}