import express from "express";
import {createLogin,getLogin} from "../controllers/login.controller.js";
const LoginRouter=express.Router();
LoginRouter.post("/registered",createLogin);
LoginRouter.post("/logink",getLogin);

export default LoginRouter;
