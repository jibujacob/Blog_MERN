import { currentUser, errorHandler, NotFoundError } from "@jjblog2022/common";
import express from "express";
import "express-async-errors";
import cookieSession from "cookie-session";

import { registerRouter } from "./routes/register";
import { loginRouter } from "./routes/login";
import { logoutRouter } from "./routes/logout";
import { currentUserRouter } from "./routes/current-user";
import { updateUserRouter } from "./routes/update";
import { deleteUserRouter } from "./routes/delete";


const app = express();
app.set("trust proxy",true);

app.use(express.json());
app.use(cookieSession({
    signed:false,
    secure: false,
}));

app.use(registerRouter);
app.use(loginRouter);
app.use(logoutRouter);
app.use(currentUserRouter);

app.use(currentUser);

app.use(updateUserRouter);
app.use(deleteUserRouter);

app.all("*",async()=>{
    throw new NotFoundError();
});
app.use(errorHandler);

export {app}