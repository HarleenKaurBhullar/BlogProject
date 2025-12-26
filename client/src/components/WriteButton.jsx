import { NavLink, useNavigate } from "react-router-dom"
import './WriteButton.css'
import { useEffect, useState } from "react";
const WriteButton=()=>{
    const [user,setUser]=useState(null);
    useEffect(()=>{
    try{
    const data=localStorage.getItem("user");
    const userval=JSON.parse(data);
    setUser(userval);
    }
    catch(error){
    setUser(null);
    }},[])
    const navigate=useNavigate();
    const handlenav=()=>{
        if(!user){
            navigate('/login');
        }
        else{
            navigate('/MakeBlog');
        }
    }
    return  <div><button className="write-button" onClick={()=>{handlenav()}}>Start Writing</button></div>
    
}

export default WriteButton;