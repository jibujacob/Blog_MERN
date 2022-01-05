import request from "supertest";
import { app } from "../../app";
import mongoose from "mongoose";
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
            .delete(`/api/users/${response.body.id}`)
            //.set('Cookie',response.get("Set-Cookie"))
            .send({}).expect(401);
});

it("returna 401 if not authorized",async()=>{
    const response = await setup();
    
    let users = await User.find({});
    expect(users.length).toEqual(1);
    
    const deleteduser = await request(app)
            .delete(`/api/users/${response.body.id}`)
            .set('Cookie',response.get("Set-Cookie"))
            .send({}).expect(200);
    
    users = await User.find({});
    expect(users.length).toEqual(0);

    expect(deleteduser.get("Set-Cookie")[0]).toEqual(
        "session=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; httponly"
    ) ;

});