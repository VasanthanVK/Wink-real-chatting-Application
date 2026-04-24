import jwt from "jsonwebtoken";

const verifyToken=async(req,res,next)=>{
    try{
        const authHeader = req.headers.authorization;
        if(!authHeader){
            return res.status(401).json({message:"Missing Token"})
        }
        
        // ✅ Extract token from "Bearer TOKEN" format
        const token = authHeader.startsWith("Bearer ") 
            ? authHeader.slice(7)  // Remove "Bearer " prefix
            : authHeader;
            
        const decodedToken=jwt.verify(token,process.env.JWT_SECRET)
        req.user=decodedToken
        next()
    }catch(err){
        return res.status(401).json({message:"Invalid Token"})
    }
}

export default verifyToken