import request from "supertest";
import { app } from "../../app";
import { Categories } from "../../models/categories";

it("returns 200 and returns the available categories in the system", async () => {

    let categories = await Categories.find({})
    expect(categories.length).toEqual(0);
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
            name:"life"
        }).expect(201);

    const response =  await request(app)
        .get("/api/categories")
        .send({}).expect(200);

    expect(response.body.length).toEqual(2);
    categories = await Categories.find({});
    expect(categories.length).toEqual(2);
});