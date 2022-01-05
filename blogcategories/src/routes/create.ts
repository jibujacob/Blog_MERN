import { BadRequestError, requireAuth, validateRequest } from "@jjblog2022/common";
import express ,{Request ,Response} from "express";
import { body } from "express-validator";
import {StatusCodes} from "http-status-codes";
import { Categories } from "../models/categories";


const router = express.Router();

router.post("/api/categories",
        requireAuth,
        [
            body("name")
                .notEmpty()
                .withMessage("Please provide category name")
        ],
        validateRequest,
        async (req:Request,res:Response) => {
    const {name} = req.body;

    const existingName = await Categories.findOne({name});
    if(existingName){
        throw new BadRequestError("Category in use");
    }

    const category = Categories.build({name});
    await category.save();

    res.status(StatusCodes.OK).send(category);
})

export {router as createCategories}