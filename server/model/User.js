import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    name:{
        type:String,
        require:true,
    },
    email:{
        type:String,
        require:true,
        unique:true,
    
    },
    password:{
        type:String,
        require:true,
        unique:true,
    },
    img:{
        type:String,

    },
    
    subscribers:{
        type:Number,
        default:0
    },
    subscribedUser:{
        type:[String],
    },
    
},{
    timestamps:true,
});

export default mongoose.model("User",UserSchema);