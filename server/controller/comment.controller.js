const CommentModel = require('../models/comment.model');

const addComment=async(req,res)=>{
    const {blogId,username,commentText}=req.body;
    if(!blogId || !username || !commentText){
        return res.status(400).json({message:"All fields are required"});
    }
    try{
        let newcomment=new CommentModel({blogId,username,commentText});
        await newcomment.save();
        res.status(201).json({comment:newcomment});
    }
    catch(error){
        console.error(error);
        res.status(500).json({message:"Server error"});
    }
}

const showComments=async(req,res)=>{
    const {blogId}=req.params;
    try{
        const comments=await CommentModel.find({blogId});
        res.status(200).json(comments);
    }
    catch(error){
        console.error(error);
        res.status(500).json({message:"Server error"});
    }
}
module.exports={addComment,showComments};