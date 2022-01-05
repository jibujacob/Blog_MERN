import {MongoMemoryServer} from "mongodb-memory-server";
import mongoose from "mongoose";
import request from "supertest";
import { app } from "../app";
import jwt from "jsonwebtoken";

declare global {
    var signin: () => Promise<string[]>;
    var signinuser: () => string[];
}


let mongo:any;
beforeAll(async () => {
    process.env.JWT_KEY = "JWTSecret"
    mongo = await MongoMemoryServer.create();
    const mongoUri = await mongo.getUri();

    await mongoose.connect(mongoUri);
});

beforeEach(async () => {
    const collections = await mongoose.connection.db.collections();

    for (let collection of collections){
        await collection.deleteMany({});
    }
});

afterAll(async () => {
    await mongo.stop();
    await mongoose.connection.close();
});

global.signin =  async() => {
    const email = "test@abc.com";
    const password = "password";
    const username = "test;"

    const response = await request(app)
                    .post("/api/users/register")
                    .send({
                        email,password,username
                    }).expect(201);
    const cookie = response.get("Set-Cookie");
    return cookie;
}

global.signinuser = () => {
    const id = new mongoose.Types.ObjectId().toHexString()
    const payload = {
        id ,
        email : "jibu@abc.com",
        username: "jibu"
    }

    const token = jwt.sign(payload,process.env.JWT_KEY!)
    const session = {jwt:token}
    const sessionJSON = JSON.stringify(session);
    const base64 = Buffer.from(sessionJSON).toString("base64");

    return [`session=${base64}`,id];
}