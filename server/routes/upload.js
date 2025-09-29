const express = require("express");
const multer = require("multer");
const path = require("path");
const streamifier = require("streamifier");
const cloudinary = require("../utils/cloudinary"); 
const { Book } = require("../models/Book");

const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({ storage });

function generateFileName(originalName) {
    const ext = path.extname(originalName); 
    const base = path.basename(originalName, ext).replace(/\s+/g, "_"); 
    const timestamp = new Date().toISOString().replace(/:/g, "-"); 
    return `${timestamp}-${base}${ext}`;
}

router.post("/bookImg/:id", upload.single("image"), async (req, res) => {
    try {
        const book = await Book.findById(req.params.id);
        if (!book) {
            return res.status(404).json({ message: "Book not found" });
        }

        if (!req.file) {
            return res.status(400).json({ message: "No file uploaded" });
        }

        const safeName = generateFileName(req.file.originalname);

        const result = await new Promise((resolve, reject) => {
            const stream = cloudinary.uploader.upload_stream(
                {
                    folder: "book_covers",
                    public_id: safeName.replace(path.extname(safeName), ""), 
                    overwrite: true,
                    resource_type: "image",
                },
                (error, result) => {
                    if (error) reject(error);
                    else resolve(result);
                }
            );
            streamifier.createReadStream(req.file.buffer).pipe(stream);
        });

        book.image = result.secure_url;
        await book.save();

        res.status(200).json({ message: "Image uploaded", book });
    } catch (error) {
        res.status(500).json({ message: "Upload failed", error: error.message });
    }
});

module.exports = router;
