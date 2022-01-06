import { currentUser, errorHandler, NotFoundError } from "@jjblog2022/common";
import express from "express";
import "express-async-errors";
import cookieSession from "cookie-session";
import fileUpload from "express-fileupload";
import { registerRouter } from "./routes/register";
import { loginRouter } from "./routes/login";
import { logoutRouter } from "./routes/logout";
import { currentUserRouter } from "./routes/current-user";
import { updateUserRouter } from "./routes/update";
import { deleteUserRouter } from "./routes/delete";
import { uploadProfilePic } from "./routes/upload";



const app = express();
app.set("trust proxy",true);

app.use(express.json());
app.use(fileUpload({useTempFiles:true}))
app.use(cookieSession({
    signed:false,
    secure: false//process.env.NODE_ENV !== "test",
}));
app.use(currentUser);

app.use(registerRouter);
app.use(loginRouter);
app.use(logoutRouter);
app.use(currentUserRouter);
app.use(updateUserRouter);
app.use(deleteUserRouter);
app.use(uploadProfilePic);

app.all("*",async()=>{
    throw new NotFoundError();
});
app.use(errorHandler);

export {app}