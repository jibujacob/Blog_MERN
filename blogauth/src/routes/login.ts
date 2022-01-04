import { BadRequestError, validateRequest } from "@jjblog2022/common";
import express, {Request,Response} from "express";
import { body } from "express-validator";
import { StatusCodes } from "http-status-codes";
import jwt from "jsonwebtoken";

import { User } from "../models/user";
import { Password } from "../service/password";


const router = express.Router();

router.post("/api/login", [
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

    const {email,password} = req.body;

    const existingUser = await User.findOne({email});
    if(!existingUser){
        throw new BadRequestError("Invalid Credentials");
    }

    const passwordMatch = await Password.compare(password,existingUser.password);
    if(!passwordMatch){
        throw new BadRequestError("Invalid Credentials");
    }

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

export {router as loginRouter}