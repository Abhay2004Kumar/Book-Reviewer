import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../utils/cloudinary.js";

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "book_covers",
    resource_type: "image", // ✅ ensure this line is present
    allowed_formats: ["jpg", "png", "jpeg"],
    transformation: [{ width: 500, height: 700, crop: "limit" }],
    public_id: (req, file) => {
      const timestamp = Date.now();
      return `book_${timestamp}`;
    },
  },
});

const upload = multer({ storage });

export default upload;
