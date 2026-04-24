import mongoose from "mongoose";


const ConnectDB=async()=>{
    try{
        await mongoose.connect(process.env.MONGOOSE_CONNECT)
        console.log("connection sucessfully")    
    }
    catch(err){
        console.log("fail to connect db",err.message);
        
    }
}
export default ConnectDB
