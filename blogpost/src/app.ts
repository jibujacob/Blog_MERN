import express from "express";
import "express-async-errors";
import cookieSession from "cookie-session";
const fileUpload = require("express-fileupload")
import { currentUser, errorHandler, NotFoundError } from "@jjblog2022/common";
import { createPostRouter } from "./routes/create";
import { updatePostRouter } from "./routes/update";
import { deletePostRouter } from "./routes/delete";
import { showPostRouter } from "./routes/show";
import { indexPostsRouter } from "./routes";
import { uploadPost } from "./routes/upload";

const app = express();
app.set("trust proxy",true);

app.use(express.json());
app.use(fileUpload({useTempFiles:true}))
app.use(cookieSession({
    signed:false,
    secure: false//process.env.NODE_ENV !== "test",
}));

app.use(currentUser);

app.use(createPostRouter);
app.use(updatePostRouter);
app.use(deletePostRouter);
app.use(showPostRouter);
app.use(indexPostsRouter)

app.use(uploadPost)

app.all("*",async () => {
    throw new NotFoundError();  
})

app.use(errorHandler)

export {app}