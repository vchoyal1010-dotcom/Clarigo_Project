
// import jwt from "jsonwebtoken";

// export const jwtToken=async(req,res)=>{
//     try {
//         const {email,token}=req.body;
//         const user=token.headers.authorization.split(" ")[1];
//         const decoded=jwt.verify(user,process.env.JWT_SECRET_KEY);  
//         res.status(201).json({token});
//     } catch (error) {
//         res.status(500).json({message:error.message});
//     }                   
// }

import jwt from "jsonwebtoken";

export const jwtToken = (req, res, next) => {

  try {

    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(401).json({
        message: "Token not provided"
      });
    }

    const token = authHeader.split(" ")[1];

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET_KEY
    );

    req.user = decoded;

    next();

  } catch (error) {

    return res.status(401).json({
      message: "Invalid or expired token"
    });

  }
};