import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "../api/axios";
import toast from "react-hot-toast";

const BookDetails = () => {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [newReview, setNewReview] = useState("");
  const [rating, setRating] = useState(5); // ⭐ Add rating state
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const { data } = await axios.get(`/books/${id}`);
        setBook(data);
      } catch (err) {
        setError("Failed to fetch book details");
      }
    };

    const fetchReviews = async () => {
      try {
        const { data } = await axios.get(`/reviews/${id}`);
        setReviews(data);
      } catch (err) {
        console.error("Failed to load reviews");
      }
    };

    fetchBook();
    fetchReviews();
    setLoading(false);
  }, [id]);

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("You must be logged in to submit a review");
      return;
    }

    try {
      await axios.post(
        `/reviews/${id}`,
        { rating, comment: newReview },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success("Review submitted");

      // Refresh reviews
      const { data: updatedReviews } = await axios.get(`/reviews/${id}`);
      setReviews(updatedReviews);
      setNewReview("");
      setRating(5); // reset to default
    } catch (err) {
      toast.error(err?.response?.data?.message || "Failed to submit review");
    }
  };

  if (loading) return <p className="text-center py-10">Loading...</p>;
  if (error) return <p className="text-center text-red-500 py-10">{error}</p>;
  if (!book) return null;

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-4xl mx-auto bg-white p-6 rounded shadow">
        <div className="grid md:grid-cols-2 gap-6">
          <img
            src={book.coverImage}
            alt={book.title}
            className="w-full h-96 object-cover rounded"
          />
          <div>
            <h1 className="text-3xl font-bold text-blue-700 mb-2">
              {book.title}
            </h1>
            <p className="text-gray-600 mb-2">by {book.author}</p>
            <p className="mb-4 text-sm text-gray-500">
              Published: {book.publishedYear || "Unknown"}
            </p>
            <div className="mb-4">
              <h2 className="font-semibold">Genres:</h2>
              <div className="flex flex-wrap gap-2 mt-1">
                {book.genre.map((g, i) => (
                  <span
                    key={i}
                    className="bg-blue-100 text-blue-700 px-2 py-1 rounded text-sm"
                  >
                    {g}
                  </span>
                ))}
              </div>
            </div>
            <p className="text-gray-700 mb-6">{book.description}</p>
            <p className="font-medium text-yellow-600">
              Average Rating: {book.averageRating?.toFixed(1) || 0} / 5
            </p>
          </div>
        </div>

        {/* Reviews Section */}
        <div className="mt-10">
          <h2 className="text-xl font-semibold mb-4">Reviews</h2>
          <form onSubmit={handleReviewSubmit} className="mb-6">
            <label className="block mb-2 font-medium">Your Rating:</label>
            <select
              value={rating}
              onChange={(e) => setRating(Number(e.target.value))}
              className="mb-3 w-full border px-3 py-2 rounded"
              required
            >
              <option value={5}>⭐⭐⭐⭐⭐ - Excellent</option>
              <option value={4}>⭐⭐⭐⭐ - Good</option>
              <option value={3}>⭐⭐⭐ - Average</option>
              <option value={2}>⭐⭐ - Poor</option>
              <option value={1}>⭐ - Terrible</option>
            </select>

            <textarea
              value={newReview}
              onChange={(e) => setNewReview(e.target.value)}
              placeholder="Write your review here..."
              className="w-full p-3 border border-gray-300 rounded mb-2"
              rows={4}
              required
            />
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded"
            >
              Submit Review
            </button>
          </form>

          {reviews.length === 0 ? (
            <p className="text-gray-500">No reviews yet.</p>
          ) : (
            <ul className="space-y-4">
              {reviews.map((rev) => (
                <li key={rev._id} className="bg-gray-100 p-4 rounded">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-yellow-600 font-semibold">
                      {"⭐".repeat(rev.rating)}{" "}
                    </span>
                    <span className="text-gray-600 text-sm">
                      — {rev.user?.name || "Anonymous"}
                    </span>
                  </div>
                  <p className="text-gray-800">{rev.comment}</p>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default BookDetails;
