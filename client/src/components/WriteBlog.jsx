import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
const MakeBlog = ({blogData,blogId,isEdit}) => {
  const [formdata, setformdata] = useState({
  title: blogData?.title || "",
  body: blogData?.body || "",
});
  const navigate = useNavigate();
  const [image, setImage] = useState(null);

  let user;
  try {
    const storedUser = localStorage.getItem("user");
    user = storedUser ? JSON.parse(storedUser) : null;
  } catch (error) {
    console.error("Error parsing user from localStorage", error);
  }

  const handlechange = (e) => {
    const { name, value } = e.target;
    setformdata((values) => ({ ...values, [name]: value }));
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const makeblog = async (event) => {
    event.preventDefault();

    const formDataToSend = new FormData();
    formDataToSend.append("username", user?.username || "");
    formDataToSend.append("title", formdata.title);
    formDataToSend.append("body", formdata.body);
    if (image) formDataToSend.append("image", image);

    const url=isEdit
      ?`http://localhost:5080/api/users/editblog/${blogId}`
      :"http://localhost:5080/api/users/writeblog";

    const method=isEdit ? "PUT" : "POST";

    try {
      const response = await fetch(url, {
        method,
        body: formDataToSend,
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || "Failed to submit blog");
      }
      if(response.ok){
        alert(isEdit ? "Blog updated successfully" : "Blog created successfully");
        navigate("/");
      }
      console.log("Response:", data);
    } catch (error) {
      console.log("Error in sending data", error);
    }
  };

  return (
    <div className="min-h-screen bg-white text-black flex justify-center items-start py-12 px-4">
      <form
        className="w-full max-w bg-white border border-gray-200 rounded-xl shadow-sm p-6 space-y-6"
        method="POST"
        onSubmit={makeblog}
      >
        <h2 className="text-2xl font-semibold text-center">{isEdit ? "Edit Blog" : "Write a Blog"}</h2>

        {/* Title */}
        <input
          className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-black transition"
          id="Blogtitle"
          placeholder="Enter title"
          name="title"
          value={formdata.title}
          onChange={handlechange}
          required
        />

        {/* Image Upload */}
        <input
          className="w-full border border-gray-300 rounded-lg px-4 py-2 cursor-pointer file:bg-black file:text-white file:px-4 file:py-2 file:rounded-md"
          id="Imagetoupload"
          type="file"
          accept="image/*"
          onChange={handleImageChange}
        />

        {/* Body */}
        <textarea
          className="w-full border border-gray-300 rounded-lg px-4 py-2 h-96 resize-none focus:outline-none focus:border-black transition"
          id="Blogbody"
          placeholder="Your text starts here..."
          name="body"
          value={formdata.body}
          onChange={handlechange}
          required
        />

        {/* Submit Button */}
        <button
          className="w-full bg-black text-white py-2 rounded-lg hover:bg-gray-800 transition font-medium"
          id="submitbutton"
        >
          {isEdit ? "Update Blog" : "Submit"}
        </button>
      </form>
    </div>
  );
};

export default MakeBlog;
