const mongoose=require('mongoose');

const commentSchema=new mongoose.Schema({
    blogId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Blog",
        required:true
    },
    username:{
        type:String,
        required:true
    },
    commentText:{
        type:String,
        required:true
    }
},{timestamps:true});

module.exports=mongoose.model("Comment",commentSchema);