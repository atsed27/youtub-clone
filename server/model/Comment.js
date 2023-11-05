import mongoose from "mongoose";
const CommentSchema = new mongoose.Schema({
    UserId:{
        type: String,
        
    },
    VideoId:{
        type: String,
        required:true,
        
    },
    desc:{
        type: String,
        required:true, 
    },
},{
    timestamps:true
})
export default mongoose.model("Comment",CommentSchema)