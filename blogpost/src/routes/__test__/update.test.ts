import request from "supertest";
import { app } from "../../app";
import { Post } from "../../models/post";
import mongoose from "mongoose";

it("returns 401 if not authorised to update post", async () => {
    const response = await request(app)
        .post("/api/posts")
        .set('Cookie',global.signinuser())
        .send({
            title:"Title1",
            description:"Description1"
        }).expect(201);
    
    await request(app)
        .put(`/api/posts/${response.body.id}`)
        .send({
            title:"Title1",
            description:"Description1"
        }).expect(401);
});

it("returns 400 if title is not provided", async () => {
    const id = new mongoose.Types.ObjectId().toHexString();
    await request(app)
        .put(`/api/posts/${id}`)
        .set('Cookie',global.signinuser())
        .send({
            description:"Description1"
        }).expect(400);
});

it("returns 400 if description is not provided", async () => {
    const id = new mongoose.Types.ObjectId().toHexString();
    await request(app)
        .put(`/api/posts/${id}`)
        .set('Cookie',global.signinuser())
        .send({
            title:"Title1",
        }).expect(400);
});

it("returns 404 if post not found", async () => {
    const id = new mongoose.Types.ObjectId().toHexString();
    await request(app)
        .put(`/api/posts/${id}`)
        .set('Cookie',global.signinuser())
        .send({
            title:"Title1",
            description:"Description1"
        }).expect(404);
});

it("returns 404 if the title name updated already in the system" , async () => {
    const cookie = global.signinuser()
    const post1 = await request(app)
        .post("/api/posts")
        .set('Cookie',cookie)
        .send({
            title:"Title1",
            description:"Description1"
        }).expect(201);
    const post2 = await request(app)
        .post("/api/posts")
        .set('Cookie',cookie)
        .send({
            title:"Title2",
            description:"Description2"
        }).expect(201);
    
    await request(app)
        .put(`/api/posts/${post1.body.id}`)
        .set('Cookie',cookie)
        .send({
            title:"Title2",
            description:"Description1"
        }).expect(400); 
});

it("returns 401 if the post being updates user does not have access" , async () => {
    const cookie = global.signinuser()
    const post1 = await request(app)
        .post("/api/posts")
        .set('Cookie',cookie)
        .send({
            title:"Title1",
            description:"Description1"
        }).expect(201);
    const post2 = await request(app)
        .post("/api/posts")
        .set('Cookie',cookie)
        .send({
            title:"Title2",
            description:"Description2"
        }).expect(201);
    
    await request(app)
        .put(`/api/posts/${post1.body.id}`)
        .set('Cookie',global.signinuser())
        .send({
            title:"Title3",
            description:"Description1"
        }).expect(401); 
});

it("returns 200 if the post updates successfully" , async () => {
    const cookie = global.signinuser()
    const post1 = await request(app)
        .post("/api/posts")
        .set('Cookie',cookie)
        .send({
            title:"Title1",
            description:"Description1"
        }).expect(201);
    
    const response = await request(app)
        .put(`/api/posts/${post1.body.id}`)
        .set('Cookie',cookie)
        .send({
            title:"Title3",
            description:"Description1"
        }).expect(200); 
    
});

