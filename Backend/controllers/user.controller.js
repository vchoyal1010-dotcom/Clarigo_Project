import UserDetailsSchema from "../models/user.model.js";

export const saveUser=async(req,res)=>{
    try{
        if (req.body.phone.length !== 10) {
            return res.status(400).json({
              message: "Phone number must be 10 digits"
              });
               }
        const user=await UserDetailsSchema.create(req.body);
        if(!user){
            res.status(401).json({
                success:false,
                message:"data not saved"
            })
        }

        res.status(200).json({
            success:true,
            message:"data saved"
        })
    }
    catch(err){
        res.status(500).json({
            success:false,
            message:err.message
        })
    }
}

export const showAll=async(req,res)=>{
    try{
        const user=await UserDetailsSchema.find();
        if(!user){
            res.status(401).json({
                success:false,
                message:"data not found"
            })

        }

        res.status(200).json({
            success:true,
            message:"data found",
            user
        })
    }
    catch(err){
        res.status(500).json({
            success:false,
            message:err.message
        })
    }
}

export const updateUser = async (req, res) => {
  try {

    const { id } = req.params;

    const user = await UserDetailsSchema.findByIdAndUpdate(
      id,
      req.body,
      { new: true }
    );

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found"
      });
    }

    res.status(200).json({
      success: true,
      message: "data updated",
      user
    });

  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message
    });
  }
};