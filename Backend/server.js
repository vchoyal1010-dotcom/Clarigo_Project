import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import LoginRoute from "./routes/login.route.js";
import cors from "cors";
import userRouter from "./routes/user.route.js";
dotenv.config();
connectDB();
const app=express();
app.use(express.json());
app.use(cors());
app.use("/login",LoginRoute);
app.use("/user",userRouter);
const PORT=process.env.PORT;
app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
}); 
