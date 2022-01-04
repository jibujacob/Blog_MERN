import { BadRequestError, validateRequest } from "@jjblog2022/common";
import {StatusCodes} from "http-status-codes";
import express , {Request,Response} from "express";
import { body } from "express-validator";
import jwt from "jsonwebtoken";

import { User } from "../models/user";

const router = express.Router();

router.post("/api/users/register", [
        body("username")
            .trim()
            .not()
            .isEmpty()
            .withMessage("Please provide username"),
        body("email")
            .trim()
            .isEmail()
            .withMessage("Please provide valid email"),
        body("password")
            .trim()
            .isLength({min:6,max:20})
            .withMessage("Please provide password")
    ],
    validateRequest,
    async (req:Request,res:Response)=>{

    const {username,email,password} = req.body;

    const existingUsername = await User.findOne({username})
    if(existingUsername){
        throw new BadRequestError("Username in use")   
    }

    const existingEmail = await User.findOne({email})
    if(existingEmail){
        throw new BadRequestError("Email in use")   
    }

    const user = User.build({username,email,password});
    await user.save();

    //Setting up webtoken and setting is as hashed cookie
    const userJwt = jwt.sign({
        id: user.id,
        username:user.username,
        email:user.email
    },process.env.JWT_KEY!);

    req.session={
        jwt : userJwt
    }

    res.status(StatusCodes.CREATED).send(user);
});



export {router as registerRouter}