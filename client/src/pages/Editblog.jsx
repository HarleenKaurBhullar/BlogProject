import MakeBlog from "../components/WriteBlog"
import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
const EditBlog = () => {
    const navigate=useNavigate();
    const location=useLocation();
    
    if(!location.state){
        navigate('/');
        return null;
    }
    const {title,body,id}=location.state ;
    const deleteBlog=async()=>{
    const confirmDelete=confirm("Are you sure you want to delete this blog?");
    if(!confirmDelete) return;
    const url=`http://localhost:5080/api/users/deleteblog/${id}`;
    const response=await fetch(url,{
        method:"DELETE",
        headers:{}})
    if(response.ok){
        alert("Blog deleted successfully");
        navigate('/');
    }}
    console.log("Editing blog with id:", id);
    return (
        <div>
            <div className="right-0 top-0" onClick={deleteBlog}>Delete Blog</div>
            <MakeBlog blogData={{title,body}} isEdit={true} blogId={id} />
        </div>
    );
};

export default EditBlog;
            