import request from "supertest";

import { app } from "../../app";

it("returns a 400 code with an invalid email", async () => {
    await request(app)
            .post("/api/users/login")
            .send({
                email:"abc",
                password: "perarefef"
            }).expect(400);
});

it("returns a 400 code if mandatory attributes are not provided", async () => {
    await request(app)
            .post("/api/users/login")
            .send({
                password: "perarefef"
            }).expect(400);
    await request(app)
            .post("/api/users/login")
            .send({
                email:"jibu@abc.com",
            }).expect(400);
});

it("returns a 400 code if password lenght is less than 6 or more than 20", async () =>{
    await request(app)
            .post("/api/users/login")
            .send({
                email:"jibu@abc.com",
                password: "pera"
            }).expect(400);
    await request(app)
            .post("/api/users/login")
            .send({
                email:"jibu@abc.com",
                password: "pefsfsegsegsgfsrsgrsgsrfsrgrsgsgra"
            }).expect(400);
});



it("returns 400 if the login user does not exist",async () =>{
    const response = await request(app)
            .post("/api/users/login")
            .send({
                email:"jibu@abc.com",
                password: "perarefef"
            }).expect(400);   
});

it("returns 400 if the login user password does not match",async () =>{
    await request(app)
        .post("/api/users/register")
        .send({
            email:"test@abc.com",
            password:"password",
            username:"test"
        }).expect(201);

    await request(app)
            .post("/api/users/login")
            .send({
                email:"test@abc.com",
                password:"password1",
                username:"test"
            }).expect(400);   
});

it("returns 200 if the login user password match",async () =>{
    await request(app)
        .post("/api/users/register")
        .send({
            email:"test@abc.com",
            password:"password",
            username:"test"
        }).expect(201);

    const response = await request(app)
            .post("/api/users/login")
            .send({
                email:"test@abc.com",
                password:"password",
                username:"test"
            }).expect(200);  
    expect(response.get("Set-Cookie")).toBeDefined();
});