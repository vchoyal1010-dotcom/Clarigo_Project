import express from "express";
import {createLogin,getLogin} from "../controllers/login.controller.js";
 
import {jwtToken} from "../middleware/tokenverify.middleware.js"
const   LoginRouter=express.Router();
LoginRouter.post("/registered",createLogin);
LoginRouter.post("/logink",getLogin);
LoginRouter.get("/form", jwtToken,  (req, res) => {
  res.status(200).json({
    success: true,
    message: "Access granted",
    user: req.user
  });
});
  
export default LoginRouter;
