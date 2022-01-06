import {requireAuth } from "@jjblog2022/common";
import express ,{Request ,Response} from "express";
import {StatusCodes} from "http-status-codes";
import { Categories } from "../models/categories";


const router = express.Router();

router.get("/api/categories",
        async (req:Request,res:Response) => {


    const categories = await Categories.find({});

    res.status(StatusCodes.OK).send(categories);
})

export {router as indexCategories}