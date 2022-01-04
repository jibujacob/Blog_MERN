import { errorHandler, NotFoundError } from "@jjblog2022/common";
import express from "express";
import "express-async-errors";
import cookieSession from "cookie-session";

import { registerRouter } from "./routes/register";


const app = express();
app.set("trust proxy",true);

app.use(express.json());
app.use(cookieSession({
    signed:false,
    secure: false,
}));

app.use(registerRouter);

app.all("*",async()=>{
    throw new NotFoundError();
});
app.use(errorHandler);

export {app}