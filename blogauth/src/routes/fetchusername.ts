import { BadRequestError, validateRequest } from "@jjblog2022/common";
import express, {Request,Response} from "express";
import { body } from "express-validator";
import { StatusCodes } from "http-status-codes";
import { User } from "../models/user";


const router = express.Router();

router.post("/api/users/fetchusername", 
        [
            body("userId")
            .notEmpty()
            .withMessage("Please provide userId")
        ],
        validateRequest,
    async (req:Request,res:Response) =>{
    
    const {userId} = req.body;

    const user = await User.findOne({_id:userId});
    if(!user){
        throw new BadRequestError("Invalid Credentials");
    }

    res.status(StatusCodes.OK).send({username:user.username})
})



export {router as fetchusernameRouter}
