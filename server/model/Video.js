import mongoose from "mongoose";
const VideoSchema = new mongoose.Schema({
    UserId:{
        type: String,
        require:true, 
    },
    title:{
        type:String,
        require:true,
        unique:true,
        
    },
    desc:{
        type:String,
        require:true,
        
    },
    imgUrl:{
        type:String,
        require:true,
        
    },
    videoUrl:{
        type:String,
        require:true,
    },
    Views:{
        type:Number,
        default:0, 
    },
    tags:{
        type:[String],
        default:[]
    },
    Like:{
        type:[String],
        default:[]
    },
    disLike :{
        type:[String],
        default:[]
    }
    
},{
    timestamps:true
})
export default mongoose.model("Video",VideoSchema)