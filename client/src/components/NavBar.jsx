import { useState,useEffect } from 'react';
import { Link } from 'react-router-dom';
import Menu from './Menu';
const NavBar = () => {
  const [showMenu,setShowMenu]=useState(false);
  

  const [user,setUser]=useState(null)
  
  let userval=null;
  const handleclick=()=>{
    localStorage.clear();
    setTimeout(()=>{
    setUser(null);
    setShowMenu(false);},1000);
  }
  useEffect(()=>{
  try{
    const data=localStorage.getItem("user")
    if(data){
      userval=JSON.parse(data)
      setUser(userval);
    }
  }
  catch(error){
  }},[])
  return (
    <nav className="bg-black text-white p-4 flex justify-between items-center">
      <h3 className="text-2xl font-bold">StoryShare</h3>
      {user?(<div className='flex space-x-6'><div className="hover:text-gray-300 transition-colors">
      
        <div style={{ position: "relative" }}>
          <span onClick={() => setShowMenu(!showMenu)}>
            {user.username}
          </span>
          </div></div>

          {showMenu && <Menu onClose={() => setShowMenu(false)} />}
      <button className="hover:text-gray-300 transition-colors bg-black" onClick={handleclick}>Log out</button></div>):(
      <div className="flex space-x-6">
        <Link to="/login" className="hover:text-gray-300 transition-colors">
          Login
        </Link>
        <Link to="/register" className="hover:text-gray-300 transition-colors">
          Register
        </Link>
      </div>)}
    </nav>
  );
};

export default NavBar;
