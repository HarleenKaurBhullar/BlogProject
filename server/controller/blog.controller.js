const BlogModel = require("../models/Blog.model");
const Like=require("../models/likes.model");

const getlikestatus=async (req,res)=>{
  try{
    const {blogId,username}=req.params;
    const likeCount=await Like.countDocuments({blogId});
    let liked=false;
    const likestatus=await Like.findOne({blogId,username});
    if(likestatus){
      liked=true;
    }
    res.status(200).json({likeCount, liked});
  }
  catch(error){
    console.error(error);
    return res.status(500).json({likeCount:0, liked:false});
  }
}

const liketoggle=async(req,res)=>{
  try{
    const {blogid,username}=req.body;
    const existingLike=await Like.findOne({blogId:blogid,username});
    if(existingLike){
      await Like.deleteOne({blogId:blogid,username});
      return res.status(200).json({liked:false,likeCount:await Like.countDocuments({blogId:blogid})});
    }
    else{
      await Like.create({blogId:blogid,username});
      return res.status(200).json({liked:true,likeCount:await Like.countDocuments({blogId:blogid})});
    }
  }
  catch(error){
    console.error(error);
    return res.status(500).json({liked:false,likeCount:0});
  }
}
const blogwrite = async (req, res) => {
  try {
    const { title, username, body } = req.body;
    if (!title || !username || !body ) {
      return res.status(400).json({ message: "All fields are required" });
    }
    if(req.method==="PUT"){
      const blogId=req.params.id;
      const existingBlog=await BlogModel.findById(blogId);
      if(!existingBlog){
        return res.status(404).json({message: "Blog not found"});
      }
      existingBlog.title=title;
      existingBlog.body=body;
      if(req.file){
        existingBlog.imageurl=`/uploads/${req.file.filename}`;
      }
      await existingBlog.save();
      return  res.status(200).json({message: "Blog updated successfully", blog: existingBlog});
    }
    else{
    let newBlog;
    if(req.file){
    newBlog = new BlogModel({
      title,
      username,
      body,
      imageurl: `/uploads/${req.file.filename}`
    });}
    else{
    newBlog = new BlogModel({
      title,
      username,
      body});

    }

    await newBlog.save();
    res.status(201).json({ message: "Blog saved successfully", blog: newBlog });}

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

const deleteblog=async (req,res)=>{
  try{
    const blogId=req.params.id;
    const deletedBlog=await BlogModel.findByIdAndDelete(blogId);
    if(!deletedBlog){
      return res.status(404).json({message: "Blog not found"});
    }
    res.status(200).json({message: "Blog deleted successfully"});
  }
  catch(error){
    console.error(error);
    res.status(500).json({message: "Server error"});
  }
}
module.exports = { blogwrite, deleteblog, getlikestatus, liketoggle };
