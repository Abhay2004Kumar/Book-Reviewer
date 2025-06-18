import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "../api/axios";

const AddBook = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    title: "",
    author: "",
    description: "",
    genre: "",
    publishedYear: "",
  });
  const [coverImage, setCoverImage] = useState(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    setCoverImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const token = localStorage.getItem("token");
    const user = JSON.parse(localStorage.getItem("user"));
  
    if (!token || !user) {
      toast.error("You must be logged in as an admin to add a book");
      return;
    }
  
    if (!user.isAdmin) {
      toast.error("Access denied: Admins only");
      return;
    }
  
    if (!coverImage) {
      toast.error("Cover image is required");
      return;
    }
  
    const formData = new FormData();
    formData.append("title", form.title);
    formData.append("author", form.author);
    formData.append("description", form.description);
    formData.append("genre", form.genre);
    formData.append("publishedYear", form.publishedYear);
    formData.append("coverImage", coverImage);
  
    try {
      await axios.post("/books", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });
  
      toast.success("Book added successfully!");
      navigate("/books");
    } catch (err) {
      console.error(err);
      toast.error(
        err.response?.data?.message || "Failed to add book. Try again."
      );
    }
  };
  

  return (
    <div className="max-w-xl mx-auto bg-white p-6 rounded shadow mt-10">
      <h2 className="text-2xl font-bold mb-6 text-center text-blue-600">
        Add New Book
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="title"
          value={form.title}
          onChange={handleChange}
          placeholder="Book Title"
          required
          className="w-full p-3 border border-gray-300 rounded"
        />
        <input
          type="text"
          name="author"
          value={form.author}
          onChange={handleChange}
          placeholder="Author"
          required
          className="w-full p-3 border border-gray-300 rounded"
        />
        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          placeholder="Description"
          required
          rows={4}
          className="w-full p-3 border border-gray-300 rounded"
        />
        <input
          type="text"
          name="genre"
          value={form.genre}
          onChange={handleChange}
          placeholder="Genres (comma separated)"
          required
          className="w-full p-3 border border-gray-300 rounded"
        />
        <input
          type="number"
          name="publishedYear"
          value={form.publishedYear}
          onChange={handleChange}
          placeholder="Published Year"
          className="w-full p-3 border border-gray-300 rounded"
        />
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          required
          className="w-full"
        />
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
        >
          Add Book
        </button>
      </form>
    </div>
  );
};

export default AddBook;
