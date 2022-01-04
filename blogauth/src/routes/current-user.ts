import express from "express";
import { currentUser } from "@jjblog2022/common"

const router = express.Router();

router.get("/api/users/currentUser", currentUser ,(req,res) => {
    res.send({currentUser: req.currentUser || null})
});

export {router as currentUserRouter}