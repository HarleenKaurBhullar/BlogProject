import {FaComment,FaHeart, FaEdit} from 'react-icons/fa'
import { useState,useEffect } from "react"

const Like=({blogid,username})=>{
    const [liked,setLiked]=useState(false);
    const [likeCount,setLikeCount]=useState(0);

    useEffect(()=>{
        const fetchLikeStatus=async()=>{
            try{
                const response=await fetch(`http://localhost:5080/api/users/likes/${blogid}/${username}`);
                const data=await response.json();
                if(response.ok){
                    setLiked(data.liked);
                    setLikeCount(data.likeCount);
                }}
            catch(error){
                console.error("Error fetching like status:", error);
            }}; fetchLikeStatus();},[blogid,username]);
    
    const likehandle=async()=>{
        if(!username){
            alert("Please login to like the blog");
            return;
        }
        try{
            const response=await fetch(`http://localhost:5080/api/users/likes/toggle`,{
                method:"POST",
                headers:{"Content-Type":"application/json"},
                body:JSON.stringify({blogid,username}),
            });
            const data=await response.json();
            if(response.ok){
                setLiked(data.liked);
                setLikeCount(data.likeCount);
            }}
        catch(error){
            console.error("Error toggling like status:", error);
        }};
    
    return <div className='flex items-center'>
        <FaHeart className={liked ? "text-red-500 outline-2 cursor-pointer" : "text-black outline-2 cursor-pointer"} onClick={likehandle}/>
        <span className="ml-2">{likeCount}</span>
    </div>
    
}

export default Like;