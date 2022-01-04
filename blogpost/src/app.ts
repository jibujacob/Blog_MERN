import express from "express";
import "express-async-errors";



const app = express();
app.set("trust proxy",true);

app.use(express.json());





export {app}