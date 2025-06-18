import express from "express";
import {
  getReviewsByBook,
  createReview,
} from "../controllers/reviewController.js";
import { protect } from "../middleware/auth.js";

const router = express.Router();

router.get("/:bookId", getReviewsByBook);       // Get reviews for a book
router.post("/:bookId", protect, createReview); // Submit a review

export default router;
