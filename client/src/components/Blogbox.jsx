import { useState,useEffect } from "react"
import axios  from "axios"
import { useLocation, useParams, Link } from "react-router-dom"
import { FaEdit, FaHeart, FaComment } from "react-icons/fa";
import Like from "./Likes";
import Comment from "./Comment";
const Blogbox=()=>{
    const {id} =useParams();
    const location=useLocation();
    const passedBlog=location.state && location.state.blog;
    const [blog,setblog]=useState([])
    const [loading,setloading]=useState(!passedBlog)
    const [error, setError]=useState(null)
    let currentusername;
    try{
      const data=localStorage.getItem("user")
      if(data){
        const user=JSON.parse(data)
        currentusername=user.username;
      }
    } 
    catch(error){}
    

    useEffect(()=>{
        let mounted=true;

        if(passedBlog){
            setblog(passedBlog);
            setloading(false);
            return;
        }
        else{
            setloading(true);
            axios.get(`http://localhost:5080/api/users/blogs/${id}`).then(
                res=>{
                    if(mounted){
                        setblog(res.data);
                    }
                    
                }
            )
            .catch(err => {
        if (mounted) setError(err.message || "Failed to load blog");
      })
      .finally(() => {
        if (mounted) setloading(false);
      });
        }
        return ()=>{mounted=false};
    },[id,passedBlog]);

    if(loading) return <div> Loading Blog....</div>;
    if(error) return <div> Error: {error}</div>
    if(!blog) return <div> Blog not found</div> 
    
console.log("currentusername:", currentusername, "blog.username:", blog?.username);
console.log("blogId:", id, "username:", currentusername);

   return (
  <div className="p-4 mx-auto">
    <Link 
      to="/" 
      className="bg-black text-white px-4 py-2 rounded inline-block mb-4"
    >
      Back
    </Link>
    
    {currentusername===blog.username && (
    <Link to="/Editblog" state={{title: blog.title, body: blog.body,id:id}} className="absolute p-2 right-0 top-0 m-4 bg-black text-white rounded">
      Edit <FaEdit className="inline ml-1"/>
    </Link>)}

    <div className="relative display-block ">
      <div className="text-center font-bold text-3xl">{blog.title}</div>
      <div className="text-right text-sm text-gray-600">
        - {blog.username}
      </div>
    </div>

    {blog.imageurl && (
      <img src={`http://localhost:5080${blog.imageurl}`} alt="blog" className="w-max my-4 rounded" />
    )}

    <div className="text-lg leading-relaxed mt-2">
      {blog.body}
    </div>
    <div>
      <Like blogid={id} username={currentusername} />
      <Comment blogId={id} username={currentusername} />
    </div>
  </div>
);


}

export default Blogbox;

