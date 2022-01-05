import request from "supertest";
import { app } from "../../app";
import { Post } from "../../models/post";

it("returns 401 if not authorised to create post", async () => {
    await request(app)
        .post("/api/posts")
        .send({
            title:"Title1",
            description:"Description1"
        }).expect(401);
});

it("returns 400 if title is not provided", async () => {
    await request(app)
        .post("/api/posts")
        .set('Cookie',global.signinuser())
        .send({
            description:"Description1"
        }).expect(400);
});

it("returns 400 if description is not provided", async () => {
    await request(app)
        .post("/api/posts")
        .set('Cookie',global.signinuser())
        .send({
            title:"Title1",
        }).expect(400);
});

it("returns 400 if title is already in use", async () => {
    await request(app)
        .post("/api/posts")
        .set('Cookie',global.signinuser())
        .send({
            title:"Title1",
            description:"Description1"
        }).expect(201);
    
    await request(app)
        .post("/api/posts")
        .set('Cookie',global.signinuser())
        .send({
            title:"Title1",
            description:"Description2"
        }).expect(400);
    
});

it("returns 201 if post created successfully", async () => {
    await request(app)
        .post("/api/posts")
        .set('Cookie',global.signinuser())
        .send({
            title:"Title1",
            description:"Description1"
        }).expect(201);
    
    const posts = await Post.find({})
    expect(posts.length).toEqual(1);
});