import request from "supertest";
import { app } from "../../app";

it("returns 400 when username not provided", async () => {
    const response = await request(app)
        .post("/api/users/register")
        .send({
            email:"test@abc.com",
            password:"password",
            username:"test"
        }).expect(201);

    await request(app)
        .post("/api/users/fetchusername")
        .send({
 
        })
        .expect(400);
});

it("returns 200 when userId  provided", async () => {
    const response = await request(app)
        .post("/api/users/register")
        .send({
            email:"test@abc.com",
            password:"password",
            username:"test"
        }).expect(201);

    await request(app)
        .post("/api/users/fetchusername")
        .send({
            userId:response.body.id
        })
        .expect(200);
});