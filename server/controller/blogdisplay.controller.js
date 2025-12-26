const BlogModel = require("../models/Blog.model");

const displayblog = async (req, res) => {
  try {
    const blogs = await BlogModel.find();
    res.status(200).json(blogs);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

const displaymyblog=async (req,res)=>{
  try{
  const {username}=req.params;
  const blogs=await BlogModel.find({username});
  res.status(200).json(blogs);
  }
  catch(error){
    console.error(error);
    res.status(500).json({message: "Server error"})
  }
}

module.exports = { displayblog,displaymyblog };
