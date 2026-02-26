import mongoose from "mongoose";
const Login= new mongoose.Schema({
    email:{
        type:String,
        unique:true
    },
    userName:{
        type:String
    },
    password:{
        type:String,
        required:true
    }
},
{timestamps:true}
); 
export default mongoose.model("login",Login);
