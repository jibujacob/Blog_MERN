//Splitting the index and app file to make it easier for utilizing supertest package
import mongoose from "mongoose";
const cloudinary = require('cloudinary').v2;

import { app } from "./app";

const port: Number = Number(process.env.PORT) || 5001;

const start = async () => {
    console.log("Starting the Auth Services...");

    if(!process.env.MONGO_URI){
        throw new Error("MONGO_URI must be defined");
    }
    if(!process.env.JWT_KEY){
        throw new Error("JWT_KEY must be defined");
    }

    if(!process.env.CLOUDINARY_CLOUD_NAME){
        throw new Error("CLOUDINARY_CLOUD_NAME must be defined");
    }
    if(!process.env.CLOUDINARY_API_KEY){
        throw new Error("CLOUDINARY_API_KEY must be defined");
    }
    if(!process.env.CLOUDINARY_API_SECRET){
        throw new Error("CLOUDINARY_API_SECRET must be defined");
    }


    
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Connected to the Auth Services DB");
        app.listen(port,()=>{
            console.log(`Auth Services listening in port ${port}...`); 
        
        cloudinary.config({
            cloud_name : process.env.CLOUDINARY_CLOUD_NAME,
            api_key : process.env.CLOUDINARY_API_KEY,
            api_secret : process.env.CLOUDINARY_API_SECRET
            });
        });
    } catch (error) {
        console.log(error);    
    }
}

start();