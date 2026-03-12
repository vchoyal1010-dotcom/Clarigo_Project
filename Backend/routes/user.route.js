import express from "express";
const userRouter=express.Router();
import {saveUser, showAll,updateUser} from "../controllers/user.controller.js";
import { jwtToken } from "../middleware/tokenverify.middleware.js";
userRouter.post("/save", saveUser);
userRouter.get("/show",showAll);
userRouter.put("/update/:id", updateUser);
export default userRouter;