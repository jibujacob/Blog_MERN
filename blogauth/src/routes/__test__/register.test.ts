import request from "supertest";
import { app } from "../../app";
import { User } from "../../models/user";
import {Password} from "../../service/password";

it("returns a 400 code with an invalid email", async () => {
    await request(app)
            .post("/api/register")
            .send({
                username:"jibu",
                email:"abc",
                password: "perarefef"
            }).expect(400);
});

it("returns a 400 code if mandatory attributes are not provided", async () => {
    await request(app)
            .post("/api/register")
            .send({
                email:"jibu@abc.com",
                password: "perarefef"
            }).expect(400);
    await request(app)
            .post("/api/register")
            .send({
                username:"jibu",
                password: "perarefef"
            }).expect(400);
    await request(app)
            .post("/api/register")
            .send({
                username:"jibu",
                email:"jibu@abc.com",
            }).expect(400);
});

it("returns a 400 code if password lenght is less than 6 or more than 20", async () =>{
    await request(app)
            .post("/api/register")
            .send({
                username:"jibu",
                email:"jibu@abc.com",
                password: "pera"
            }).expect(400);
    await request(app)
            .post("/api/register")
            .send({
                username:"jibu",
                email:"jibu@abc.com",
                password: "pefsfsegsegsgfsrsgrsgsrfsrgrsgsgra"
            }).expect(400);
});

it("returns 400 is the username already exists in the system",async () =>{
    await request(app)
            .post("/api/register")
            .send({
                username:"jibu",
                email:"jibu@abc.com",
                password: "perarefef"
            });
    await request(app)
            .post("/api/register")
            .send({
                username:"jibu",
                email:"jibu1@abc.com",
                password: "perarefef"
            }).expect(400);
});

it("returns 400 is the email already exists in the system",async () =>{
    await request(app)
            .post("/api/register")
            .send({
                username:"jibu",
                email:"jibu@abc.com",
                password: "perarefef"
            });
    await request(app)
            .post("/api/register")
            .send({
                username:"jibu1",
                email:"jibu@abc.com",
                password: "perarefef"
            }).expect(400);
});

it("returns 201 if the registration is success",async () =>{
    let users= await User.find({});
    expect(users.length).toEqual(0);
    
    const response = await request(app)
            .post("/api/register")
            .send({
                username:"jibu",
                email:"jibu@abc.com",
                password: "perarefef"
            }).expect(201);   
    
    users= await User.find({});
    expect(users.length).toEqual(1);
});

it("password provided is hashed and stored in DB" , async () => {
    const password = "qwerty123";
    const username = "jibu";
    const response = await request(app)
            .post("/api/register")
            .send({
                username,
                email:"jibu@abc.com",
                password
            }).expect(201); 
    
    const user = await User.findById(response.body.id)    
    expect(await Password.compare(password,user!.password)).toBeTruthy();
 
});

it("sets a cookie after successful register", async () => {
    const response = await request(app)
        .post("/api/register")
        .send({
            email:"test@abc.com",
            password:"password",
            username:"test"
        }).expect(201);
    
    expect(response.get("Set-Cookie")).toBeDefined();

})


