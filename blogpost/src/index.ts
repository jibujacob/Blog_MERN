//Splitting the index and app file to make it easier for utilizing supertest package
import mongoose from "mongoose";
import multer from "multer";

import { app } from "./app";

const port: Number = Number(process.env.PORT) || 5001;

const start = async () => {
    console.log("Starting the Post Services...");

    if(!process.env.MONGO_URI){
        throw new Error("MONGO_URI must be defined");
    }
    if(!process.env.JWT_KEY){
        throw new Error("JWT_KEY must be defined");
    }
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Connected to the Post Services DB");
        app.listen(port,()=>{
            console.log(`Post Services listening in port ${port}...`);      
        });
    } catch (error) {
        console.log(error);    
    }
}

const storage = multer.diskStorage({
    destination:(req,file,cb) => {
        cb(null,"images")
    },
    filename:(req,file,cb)=>{
        cb(null,req.body.name);
    }
})

const upload = multer({storage});
app.post("/api/upload",upload.single("file"),(req,res) => {
    res.status(200).json("File has been uploaded");
})

start();