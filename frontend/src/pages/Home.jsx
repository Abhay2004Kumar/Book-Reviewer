// src/pages/Home.jsx
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "../api/axios";

const Home = () => {
  const [featuredBooks, setFeaturedBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const { data } = await axios.get("/books?page=1");
        setFeaturedBooks(data.books.slice(0, 3)); // Top 3 featured
        setLoading(false);
      } catch (err) {
        setError("Failed to load books");
        setLoading(false);
      }
    };
    fetchBooks();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl font-bold text-center text-blue-700 mb-6">
          Welcome to BookVerse
        </h1>
        <p className="text-lg text-center text-gray-600 mb-10">
          Discover, review, and rate your favorite books.
        </p>

        <div className="text-center mb-6">
          <Link
            to="/books"
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded text-lg"
          >
            Browse All Books
          </Link>
        </div>

        <h2 className="text-2xl font-semibold mb-4 text-center">Featured Books</h2>
        {loading ? (
          <p className="text-center">Loading...</p>
        ) : error ? (
          <p className="text-center text-red-500">{error}</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {featuredBooks.map((book) => (
              <Link
                to={`/books/${book._id}`}
                key={book._id}
                className="bg-white shadow-md rounded overflow-hidden hover:shadow-lg transition"
              >
                <img
                  src={book.coverImage}
                  alt={book.title}
                  className="w-full h-60 object-cover"
                />
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-blue-800">
                    {book.title}
                  </h3>
                  <p className="text-sm text-gray-600">by {book.author}</p>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
