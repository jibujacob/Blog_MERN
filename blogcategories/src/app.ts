import express from "express";
import "express-async-errors";
import cookieSession from "cookie-session";
import { currentUser, errorHandler, NotFoundError } from "@jjblog2022/common";
import { createCategories } from "./routes/create";
import { indexCategories } from "./routes";

const app = express();
app.set("trust proxy",true);

app.use(express.json());
app.use(cookieSession({
    signed:false,
    secure: false//process.env.NODE_ENV !== "test",
}));

app.use(currentUser);

app.use(createCategories);
app.use(indexCategories);

app.all("*",async()=>{
    throw new NotFoundError();
});
app.use(errorHandler);

export {app}