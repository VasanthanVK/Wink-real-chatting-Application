import mongoose from "mongoose";

const Registerschema=new mongoose.Schema({
    profilePic: {
    type: String,   // image filename or path
    default: ""
    },
    Name:{
       type:String,
        required:true
    },
    Email:{
     type:String,
     required:true,
     unique:true
    },
    Password:{
        type:String,
        default:null
    },
    Phone:{
        type:String,
        require:true,
        unique:true
    },
    Bio:{
        type:String,
        required:true
    }
},
    {
  timestamps: true,
})

export const Register=mongoose.model("userDetail",Registerschema)