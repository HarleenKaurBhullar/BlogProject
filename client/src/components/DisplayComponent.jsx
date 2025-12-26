import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import Like from "./Likes";
import Comment from "./Comment";
const BlogComponent = () => {
  const [blogs, setBlogs] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:5080/api/users/blogs")
      .then((res) => setBlogs(res.data))
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
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

            <div className="mt-4 flex items-center justify-between">
            <button onClick={() => navigate(`/blog/${blog._id}`, { state: { blog } }) }
              className="px-4 py-2 border border-black rounded-md text-white bg-black hover:bg-white hover:text-black transition-all duration-200">
              Read More
            </button>
            <Like blogid={blog._id} username={blog.username} />
           </div>

            
          </div>
        ))}
      </div>
    </div>
  );
};

export default BlogComponent;
