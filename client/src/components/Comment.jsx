import {useState, useEffect } from "react";

const Comment = ({blogId,username}) => {
    const [comments, setComments] = useState([]);
    useEffect(() => {
    const comment=async()=>{
        try{
            const response=await fetch(`http://localhost:5080/api/users/comments/${blogId}`);
            const data=await response.json();
            if(response.ok){
                setComments(data);
            }}
        catch(error){
            console.error("Error fetching comments:", error);
        }
    };comment();},[blogId]);

    const postcomment=async(event)=>{
        event.preventDefault();
        const commentText=event.target.elements.comment.value;
        try{
            const response=await fetch(`http://localhost:5080/api/users/comments/add`,{
                method:"POST",
                headers:{"Content-Type":"application/json"},
                body:JSON.stringify({blogId,username,commentText:commentText}),
                credentials:'include',
            });
            if(response.ok){
                const newComment=await response.json();
                setComments((prevComments)=>[...prevComments,newComment]);
                event.target.reset();
            }
            if(!response.ok){
                throw new Error("Failed to post comment");}}
        catch(error){
            console.error("Error posting comment:", error);
        }};
    
    return <div className="mt-4">
        <form onSubmit={postcomment} className="mb-4">
            <textarea name="comment" required className="w-full border border-gray-300 p-2 rounded mb-2" placeholder="Write a comment..."></textarea>
            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Post Comment</button>
        </form>
        <div className="font-bold mb-2">Comments:</div>
        {comments.map((comm)=><div key={comm._id} className="border-b border-gray-300 py-2">
            {comm.username}: {comm.commentText}
        </div>)
}</div>
    
}

export default Comment;