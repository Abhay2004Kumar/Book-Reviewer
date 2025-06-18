import Book from "../models/Book.js";

// Get all books (with optional pagination)
export const getBooks = async (req, res) => {
    try {
      const page = parseInt(req.query.page) || 1;
      const limit = 10;
      const skip = (page - 1) * limit;
  
      const keyword = req.query.keyword
        ? {
            $or: [
              { title: { $regex: req.query.keyword, $options: "i" } },
              { author: { $regex: req.query.keyword, $options: "i" } },
            ],
          }
        : {};
  
      const genre = req.query.genre
        ? { genre: { $in: [req.query.genre] } }
        : {};
  
      const publishedYear = req.query.publishedYear
        ? { publishedYear: req.query.publishedYear }
        : {};
  
      const filter = { ...keyword, ...genre, ...publishedYear };
  
      const total = await Book.countDocuments(filter);
      const books = await Book.find(filter).skip(skip).limit(limit);
  
      res.json({
        page,
        totalPages: Math.ceil(total / limit),
        books,
      });
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch books" });
    }
  };
  

// Get a single book by ID
export const getBookById = async (req, res) => {
  const book = await Book.findById(req.params.id);
  if (!book) return res.status(404).json({ message: "Book not found" });
  res.json(book);
};

// Create a new book (admin only)
export const createBook = async (req, res, next) => {
    try {
      console.log("🧾 req.body:", req.body);
      console.log("📸 req.file:", req.file); // should show uploaded file details
  
      if (!req.file?.path) {
        return res.status(400).json({ message: "Cover image is required" });
      }
  
      const { title, author, description, genre, publishedYear } = req.body;
  
      const book = new Book({
        title,
        author,
        description,
        genre: genre.split(","),
        publishedYear,
        coverImage: req.file.path,
      });
  
      const saved = await book.save();
      res.status(201).json(saved);
    } catch (err) {
      next(err);
    }
  };
  
