import jwt from "jsonwebtoken";


export const Genrated_token=(Email,Phone,userId)=>{
    const token=jwt.sign({
        id:userId,
        Email:Email,
        Phone:Phone
    },
    process.env.JWT_SECRET,
    { expiresIn: "1d" }
)
    return token
}