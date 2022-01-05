import { BadRequestError, NotAuthorizedError, requireAuth, validateRequest } from "@jjblog2022/common";
import express , {Request,Response} from "express";
import { body } from "express-validator";
import { StatusCodes } from "http-status-codes";
import jwt from "jsonwebtoken";

import { User } from "../models/user";

const router = express.Router();

router.put("/api/users/:userId",
    requireAuth,
    [
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
    async (req:Request,res:Response) => {

    const {userId} = req.params;

    if(userId !== req.currentUser!.id){
        throw new NotAuthorizedError();
    }

    const existingUser = await User.findById(userId);
    if(!existingUser){
        throw new BadRequestError("Invalid Credentials");
    }

    const usernameExisting = await User.findOne({username:req.body.username,_id:{$ne:userId}});
    if(usernameExisting){
        throw new BadRequestError("Username in use");
    }

    const emailExisting = await User.findOne({email:req.body.email,_id:{$ne:userId}});
    if(emailExisting){
        throw new BadRequestError("Email in use");
    }

    existingUser.set(req.body);
    await existingUser.save();
    
    req.session = null;
    //Setting up webtoken and setting is as hashed cookie
    const userJwt = jwt.sign({
        id: existingUser._id,
        username:existingUser.username,
        email:existingUser.email
    },process.env.JWT_KEY!);

    req.session={
        jwt : userJwt
    }

    res.status(StatusCodes.OK).send(existingUser);
    
});

export {router as updateUserRouter}