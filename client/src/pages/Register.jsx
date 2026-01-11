import { useState, useEffect } from "react";
import { Link } from 'react-router-dom'
import { useAuth } from "../context/Authcontext";


const Register = () => {
  const { setUser: setAuthUser } = useAuth();
  const [newuser, setUser] = useState({
    emailid: "",
    username: "",
    password: "",
  });

  const handlesubmit = async (event) => {
    event.preventDefault();
    const userdetails = newuser;

    try {
      const response = await fetch("http://localhost:5080/api/users/userreg", {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify(userdetails),
        credentials:'include',
      });
      const data = await response.json();
      if (!response.ok) {
        console.log(`Error:${data.message}`);
      } else {
        setAuthUser(data.user);
        localStorage.setItem("user", JSON.stringify(data.user));
        alert("User registered Successfuly");
        navigate('/');
      }
    } catch (error) {
      console.log("Error:", error);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
      <form className="Registerform bg-white text-gray-800 shadow-2xl rounded-2xl p-8 w-full max-w-md border border-lavender-300" method="POST" onSubmit={handlesubmit}>
        <h2 className="text-2xl font-bold text-lavender-700 mb-6 text-center">
          Register
        </h2>

        <label htmlFor="email" className="block text-lavender-700 font-semibold mb-2">Enter Email id</label>
        <input type="email" className="textinput w-full px-4 py-2 border border-lavender-300 rounded-lg focus:ring-2 focus:ring-lavender-400 mb-4" id="Emailid" placeholder="Email-id" value={newuser.emailid} required={true} onChange={(e) => setUser({ ...newuser, emailid: e.target.value })}/>
        <label htmlFor="Email_username" className="block text-lavender-700 font-semibold mb-2">
          Enter username
        </label>
        <input type="text" className="textinput w-full px-4 py-2 border border-lavender-300 rounded-lg focus:ring-2 focus:ring-lavender-400 mb-4" id="Email_username" placeholder="Email or username" value={newuser.username} required={true} onChange={(e) => setUser({ ...newuser, username: e.target.value })}/>

        <label
          htmlFor="password"
          className="block text-lavender-700 font-semibold mb-2"
        >
          Enter Password
        </label>
        <input
          type="password"
          className="Password w-full px-4 py-2 border border-lavender-300 rounded-lg focus:ring-2 focus:ring-lavender-400 mb-6"
          id="Password"
          placeholder="Password"
          value={newuser.password}
          required={true}
          onChange={(e) => setUser({ ...newuser, password: e.target.value })}
        />

        <button
          className="submitbutton w-full bg-lavender-500 text-black font-semibold py-2 px-4 rounded-lg hover:bg-lavender-600 transition"
          id="submitbutton"
        >
          Submit
        </button>
        <p>Already Registered? Click here to <Link to="/login">Login</Link></p>
      </form>
      
    </div>
  );
};

export default Register;
