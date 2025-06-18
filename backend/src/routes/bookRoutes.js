import express from "express";
import {
  getBooks,
  getBookById,
  createBook,
} from "../controllers/bookController.js";
import { checkAdmin, protect } from "../middleware/auth.js";
import upload from "../middleware/upload.js";

const router = express.Router();

router.get("/", getBooks);
router.get("/:id", getBookById);
router.post("/", protect,checkAdmin,upload.single("coverImage") ,createBook); // Later: checkAdmin middleware

export default router;
