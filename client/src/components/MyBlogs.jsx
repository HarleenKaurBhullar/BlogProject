import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import NavBar from "./NavBar";
const MyBlogs = () => {
  const [blogs, setBlogs] = useState([]);
  const navigate = useNavigate();
  let username;
  try{
    const data=localStorage.getItem('user');
    const user=JSON.parse(data);
    username=user.username;
  }
  catch(error){
    
  }
  if(!username){
    return;
  }
  useEffect(() => {
    axios
      .get(`http://localhost:5080/api/users/myblogs/${username}`)
      .then((res) => setBlogs(res.data))
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div>
      <NavBar />
    <div className="w-full min-h-screen bg-white text-black px-4 py-6">

      <div className="space-y-6">
        {blogs.map((blog) => (
          <div
            key={blog._id}
            className="w-full border border-gray-300 p-5 rounded-lg bg-white hover:bg-gray-100 transition-all duration-200"
          >
            <Link
              to={`/blog/${blog._id}`}
              state={{ blog }}
              className="text-black no-underline"
            >
              <h2 className="text-2xl font-semibold mb-1">{blog.title}</h2>
              <p className="text-sm text-gray-600 mb-3">By {blog.username}</p>

              {blog.imageurl && (
                <div className="w-full h-56 overflow-hidden rounded-lg mb-3">
                  <img
                    src={`http://localhost:5080${blog.imageurl}`}
                    alt={blog.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}

              <p className="text-gray-700">{blog.body.slice(0, 300)}...</p>
            </Link>

            <button
              onClick={() =>
                navigate(`/blog/${blog._id}`, { state: { blog } })
              }
              className="mt-4 px-4 py-2 border border-black rounded-md text-white bg-black hover:bg-white hover:text-black transition-all duration-200"
            >
              Read More
            </button>
          </div>
        ))}
      </div>
    </div>
    </div>
  );
};

export default MyBlogs;
