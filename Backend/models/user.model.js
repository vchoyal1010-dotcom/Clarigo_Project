import mongoose from "mongoose";

const UserDetailsSchema = new mongoose.Schema(
{
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    userName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    phone: {
        type: String,
        required:true,
        
    },
    status: {
        type: String,
    
        default: "active"
    }
},
{ timestamps: true }
);

export default mongoose.model("UserDetails", UserDetailsSchema);