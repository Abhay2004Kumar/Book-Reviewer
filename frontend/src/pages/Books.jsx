// src/pages/Books.jsx
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "../api/axios";

const Books = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const [search, setSearch] = useState("");
  const [genre, setGenre] = useState("");
  const [year, setYear] = useState("");

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        setLoading(true);
        const query = new URLSearchParams({
          page,
          ...(search && { keyword: search }),
          ...(genre && { genre }),
          ...(year && { publishedYear: year }),
        });

        const { data } = await axios.get(`/books?${query.toString()}`);
        setBooks(data.books);
        setTotalPages(data.totalPages);
        setLoading(false);
      } catch (err) {
        setError("Failed to load books");
        setLoading(false);
      }
    };

    fetchBooks();
  }, [page, search, genre, year]);

  const handleClearFilters = () => {
    setSearch("");
    setGenre("");
    setYear("");
    setPage(1);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-center text-blue-700 mb-6">
          All Books
        </h1>

        {/* Filters */}
        <div className="mb-6 flex flex-wrap gap-4 justify-center">
          <input
            type="text"
            placeholder="Search by title or author"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border px-4 py-2 rounded w-full sm:w-auto"
          />

          <select
            value={genre}
            onChange={(e) => setGenre(e.target.value)}
            className="border px-4 py-2 rounded w-full sm:w-auto"
          >
            <option value="">All Genres</option>
            <option value="Fiction">Fiction</option>
            <option value="Fantasy">Fantasy</option>
            <option value="Mystery">Mystery</option>
            <option value="Non-fiction">Non-fiction</option>
            {/* Add more genres if needed */}
          </select>

          <input
            type="number"
            placeholder="Published Year"
            value={year}
            onChange={(e) => setYear(e.target.value)}
            className="border px-4 py-2 rounded w-full sm:w-auto"
          />

          <button
            onClick={() => setPage(1)}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Apply
          </button>

          <button
            onClick={handleClearFilters}
            className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500"
          >
            Clear
          </button>
        </div>

        {/* Books Display */}
        {loading ? (
          <p className="text-center">Loading...</p>
        ) : error ? (
          <p className="text-center text-red-500">{error}</p>
        ) : books.length === 0 ? (
          <p className="text-center text-gray-600">No books found.</p>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-8">
              {books.map((book) => (
                <Link
                  to={`/books/${book._id}`}
                  key={book._id}
                  className="bg-white shadow rounded hover:shadow-lg transition"
                >
                  <img
                    src={book.coverImage}
                    alt={book.title}
                    className="w-full h-60 object-cover rounded-t"
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

            {/* Pagination */}
            <div className="flex justify-center gap-4">
              <button
                disabled={page === 1}
                onClick={() => setPage((prev) => prev - 1)}
                className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
              >
                Prev
              </button>
              <span className="px-4 py-2 text-gray-700">
                Page {page} of {totalPages}
              </span>
              <button
                disabled={page === totalPages}
                onClick={() => setPage((prev) => prev + 1)}
                className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
              >
                Next
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Books;
