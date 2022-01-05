import request from "supertest";
import { app } from "../../app";
import { Post } from "../../models/post";
import mongoose from "mongoose";

it("returns 401 if not authorised to delete post", async () => {
    const response = await request(app)
        .post("/api/posts")
        .set('Cookie',global.signinuser())
        .send({
            title:"Title1",
            description:"Description1"
        }).expect(201);
    
    await request(app)
        .delete(`/api/posts/${response.body.id}`)
        .send({}).expect(401);
});

it("returns 404 if post not found", async () => {
    const id = new mongoose.Types.ObjectId().toHexString();
    await request(app)
        .delete(`/api/posts/${id}`)
        .set('Cookie',global.signinuser())
        .send({}).expect(404);
});

it("returns 401 if the post being delete user does not have access" , async () => {
    const cookie = global.signinuser()
    const post1 = await request(app)
        .post("/api/posts")
        .set('Cookie',cookie)
        .send({
            title:"Title1",
            description:"Description1"
        }).expect(201);
    
    await request(app)
        .delete(`/api/posts/${post1.body.id}`)
        .set('Cookie',global.signinuser())
        .send({}).expect(401); 
});

it("returns 200 if the post deletes successfully" , async () => {
    const cookie = global.signinuser()
    const post1 = await request(app)
        .post("/api/posts")
        .set('Cookie',cookie)
        .send({
            title:"Title1",
            description:"Description1"
        }).expect(201);
    
    await request(app)
        .delete(`/api/posts/${post1.body.id}`)
        .set('Cookie',cookie)
        .send({}).expect(200); 
});

