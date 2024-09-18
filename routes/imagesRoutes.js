const express = require("express");
const router = express.Router();
const upload = require("../middleware/multerConfig");
const {
  uploadImage,
  getAllImages,
  getImage,
} = require("../controllers/uploadController");

// Route to upload an image
router.post("/upload", upload.single("image"), uploadImage);

// Route to get all uploaded images
router.get("/images", getAllImages);

// Route to get a specific image
router.get("/images/:filename", getImage);

module.exports = router;
