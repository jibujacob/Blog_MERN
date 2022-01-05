import request from "supertest";
import { app } from "../../app";
import { User } from "../../models/user";

const setup = async ()=>{
    const response = await request(app)
        .post("/api/users/register")
        .send({
            email:"test@abc.com",
            password:"password",
            username:"test"
        }).expect(201);    
    return response;
}

it("returna 401 if not authorized",async()=>{
    const response = await setup();
    
    await request(app)
            .put(`/api/users/${response.body.id}`)
            //.set('Cookie',response.get("Set-Cookie"))
            .send({
                username:"jibu",
                email:"abc",
                password: "perarefef"
            }).expect(401);
})

it("returns a 400 code with an invalid email", async () => {
    const response = await setup();
    
    await request(app)
            .put(`/api/users/${response.body.id}`)
            .set('Cookie',response.get("Set-Cookie"))
            .send({
                username:"jibu",
                email:"abc",
                password: "perarefef"
            }).expect(400);
});

it("returns a 400 code if mandatory attributes are not provided", async () => {
    const response = await setup();
    
    await request(app)
            .put(`/api/users/${response.body.id}`)
            .set('Cookie',response.get("Set-Cookie"))
            .send({
                email:"jibu@abc.com",
                password: "perarefef"
            }).expect(400);
    await request(app)
            .put(`/api/users/${response.body.id}`)
            .set('Cookie',response.get("Set-Cookie"))
            .send({
                username:"jibu",
                password: "perarefef"
            }).expect(400);
    await request(app)
            .put(`/api/users/${response.body.id}`)
            .set('Cookie',response.get("Set-Cookie"))
            .send({
                username:"jibu",
                email:"jibu@abc.com",
            }).expect(400);
});

it("returns a 400 code if password lenght is less than 6 or more than 20", async () =>{
    const response = await setup();
    
    await request(app)
            .put(`/api/users/${response.body.id}`)
            .set('Cookie',response.get("Set-Cookie"))
            .send({
                username:"jibu",
                email:"jibu@abc.com",
                password: "pera"
            }).expect(400);
    await request(app)
            .put(`/api/users/${response.body.id}`)
            .set('Cookie',response.get("Set-Cookie"))
            .send({
                username:"jibu",
                email:"jibu@abc.com",
                password: "pefsfsegsegsgfsrsgrsgsrfsrgrsgsgra"
            }).expect(400);
});

it("return 401 if user is not autheticated", async () => {
    const user1 = await setup();

    const user2 = await request(app)
        .post("/api/users/register")
        .send({
            email:"test1@abc.com",
            password:"password",
            username:"test1"
        }).expect(201);    


    await request(app)
            .put(`/api/users/${user1.body.id}`)
            .set('Cookie',user2.get("Set-Cookie"))
            .send({
                email:"jibu@abc.com",
                password:"password",
                username:"jibu"
            }).expect(401);

});

it("return 400 if user is not present", async () => {
    const [cookie,id] = global.signinuser();

    await request(app)
            .put(`/api/users/${id}`)
            .set('Cookie',cookie)
            .send({
                email:"jibu@abc.com",
                password:"password",
                username:"jibu"
            }).expect(400);

});

it("return 400 if username and email already present is not present", async () => {
    const user1 = await setup();

    const user2 = await request(app)
        .post("/api/users/register")
        .send({
            email:"test1@abc.com",
            password:"password",
            username:"test1"
        }).expect(201);

    await request(app)
        .put(`/api/users/${user1.body.id}`)
        .set('Cookie',user1.get("Set-Cookie"))
        .send({
            email:"test1@abc.com",
            password:"password",
            username:"test1"
        }).expect(400); 

});

it("return 401 if user is not autheticated", async () => {
    const user1 = await setup();
    
    const response = await request(app)
            .put(`/api/users/${user1.body.id}`)
            .set('Cookie',user1.get("Set-Cookie"))
            .send({
                email:"jibu@abc.com",
                password:"password",
                username:"jibu"
            }).expect(200);
    
    const updatedUser = await User.findById(user1.body.id);
    expect(updatedUser!.email).toEqual("jibu@abc.com");
    expect(updatedUser!.username).toEqual("jibu");
    expect(response.get("Set-Cookie")).toBeDefined();

});