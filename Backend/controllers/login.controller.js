import Login from "../models/login.model.js"; 
import  jwt from "jsonwebtoken";
import dotenv from "dotenv";
export const createLogin=async(req,res)=>{
    try {
        const {email,userName,password}=req.body;

        if(!password || password.length < 6){
            return res.status(400).json({
                message:"All fields are required and password must be 6 charactors"
            });
        }
        const user=await Login.findOne({email});
        if(user){
            return res.status(400).json({message:"User already exists"});
        }
        const login=await Login.create({
            email,
            userName,
            password
        });

        
        res.status(201).json({
            message:"user Registered successfully"
        });
    } catch (error) {
        res.status(500).json({message:error.message});
    }
}


export const getLogin=async(req,res)=>{
    try {
        const {email,userName,password}=req.body;

       if(!password || password.length < 6){
            return res.status(400).json({
                message:"All fields are required and password must be 6 charactors"
            });
        }

        const token=jwt.sign({email},process.env.JWT_SECRET_KEY,{expiresIn:"1d"});

        console.log(token);
    const user = await Login.findOne({ $or: [{ email }, { userName }], password: password});
        if(!user){
            return res.status(400).json({message:"insert correct data"});
        }
       
        res.status(201).json({message:"user login succesfull",
            user,token});
    } catch (error) {
        res.status(500).json({message:error.message});
    }
}

export const jwtToken=async(req,res)=>{
    try {
        const {email,token}=req.body;
        const user=token.headers.authorization.split(" ")[1];
        const decoded=jwt.verify(user,process.env.JWT_SECRET_KEY);  
        res.status(201).json({token});
    } catch (error) {
        res.status(500).json({message:error.message});
    }                   
}
