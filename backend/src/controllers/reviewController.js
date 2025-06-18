import Review from "../models/Review.js";
import Book from "../models/Book.js";

// Get reviews for a book
export const getReviewsByBook = async (req, res) => {
  const bookId = req.params.bookId;
  const reviews = await Review.find({ book: bookId }).populate("user", "name");
  res.json(reviews);
};

// Submit a review
export const createReview = async (req, res) => {
  const { rating, comment } = req.body;
  const bookId = req.params.bookId;
  const userId = req.user._id;

  const alreadyReviewed = await Review.findOne({ book: bookId, user: userId });
  if (alreadyReviewed) {
    return res.status(400).json({ message: "You already reviewed this book" });
  }

  const review = new Review({
    book: bookId,
    user: userId,
    rating,
    comment,
  });

  await review.save();

  // Update average rating in Book
  const reviews = await Review.find({ book: bookId });
  const avgRating =
    reviews.reduce((acc, curr) => acc + curr.rating, 0) / reviews.length;

  await Book.findByIdAndUpdate(bookId, { averageRating: avgRating.toFixed(1) });

  res.status(201).json({ message: "Review submitted" });
};
