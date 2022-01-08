import request from "supertest";
import { app } from "../../app";
import { Categories } from "../../models/categories";

it("returns 400 if name body attribute is not present", async () => {

    await request(app)
        .post("/api/categories")
        .set('Cookie',global.signinuser())
        .send({}).expect(400)
});

it("returns 401 if user not authorised ", async () => {
    await request(app)
        .post("/api/categories")
        .send({
            name:"music"
        }).expect(401);
});

it("returns 201 if user creates category successfully ", async () => {
    let categories = await Categories.find({})
    expect(categories.length).toEqual(0);
    
    await request(app)
        .post("/api/categories")
        .set('Cookie',global.signinuser())
        .send({
            name:"music"
        }).expect(201);

    categories = await Categories.find({})
    expect(categories.length).toEqual(1);
});

it("returns 200 if user tries to re-create", async () => {
    await request(app)
        .post("/api/categories")
        .set('Cookie',global.signinuser())
        .send({
            name:"music"
        }).expect(201);

    await request(app)
        .post("/api/categories")
        .set('Cookie',global.signinuser())
        .send({
            name:"music"
        }).expect(200);
});