//Splitting the index and app file to make it easier for utilizing supertest package
import mongoose from "mongoose";

import { app } from "./app";

const port: Number = Number(process.env.PORT) || 5001;

const start = async () => {
    console.log("Starting the Post Services...");

    if(!process.env.MONGO_URI){
        throw new Error("MONGO_URI must be defined");
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

start();