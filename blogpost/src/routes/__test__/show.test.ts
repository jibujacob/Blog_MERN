import request from "supertest";
import { app } from "../../app";
import mongoose from "mongoose";


it("returns 404 if post not found", async () => {
    const id = new mongoose.Types.ObjectId().toHexString();
    await request(app)
        .get(`/api/posts/${id}`)
        .send({}).expect(404);
});


it("returns 200 if the post is fetched successfully" , async () => {
    const cookie = global.signinuser()
    const post1 = await request(app)
        .post("/api/posts")
        .set('Cookie',cookie)
        .send({
            title:"Title1",
            description:"Description1"
        }).expect(201);
    
    await request(app)
        .get(`/api/posts/${post1.body.id}`)
        .send({}).expect(200); 
});

