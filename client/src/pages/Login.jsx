import { useState, useEffect } from "react";
import { Link, useNavigate } from 'react-router-dom'
const Login = () => {
  const [user, setUser] = useState({ emailid:"",username: "", password: "" });
  const navigate=useNavigate();

  const handlesubmit = async (event) => {
    event.preventDefault();
    const userdetails = user;

    try {
      const response = await fetch("http://localhost:5080/api/users/userlogin", {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify(userdetails),
      });
      const data=await response.json();
      console.log(data);
      if (!response.ok) {
        console.log(`Error:${Response.status}`);
        return;
      }  
        localStorage.setItem("user",JSON.stringify(data.user));
        alert("User login Successful");
        navigate('/');
        
      
    } catch (error) {
      console.log("Error:", error.status);
    }
  };

  return <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50"> 
    <form className="Registerform bg-white shadow-lg rounded-2xl p-8 w-full max-w-md mx-auto mt-10 border border-lavender-300" method="POST" onSubmit={handlesubmit}>
    <h2 className="text-2xl font-bold text-lavender-700 mb-6 text-center">
          Login
        </h2>
    <label htmlFor="Email_username" className="block text-lavender-700 font-semibold mb-2">Enter your email or username</label>
    <input type="text" className="textinput w-full px-4 py-2 rounded-lg mb-4" id="Email_username" placeholder="Email or username" required={true} onChange={(e) => {const value = e.target.value; if (value.includes("@")) {setUser({ ...user, emailid: value, username: "" });} else {setUser({ ...user, username: value, email: "" });}}}></input>
    <label htmlFor="Password" className="block text-lavender-700 font-semibold mb-2"></label>
    <input type="password" className="Password w-full px-4 py-2  rounded-lg mb-6" id="Password" placeholder="Password" value={user.password} required={true} onChange={(e) => setUser({ ...user, password: e.target.value })}></input>
    <p>New User? Click here to <Link to='/register'>register </Link></p>
    <button className="submitbutton w-full bg-lavender-500 text-black font-semibold py-2 px-4 rounded-lg hover:bg-lavender-600 transition" id="submitbutton">Submit</button>
  </form>
  
  </div>

}

export default Login;
