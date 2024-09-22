const path = require("path");
const fs = require("fs");

// Controller to handle image upload
const uploadImage = (req, res) => {
  // Check if a file is uploaded
  if (!req.file) {
    return res.status(400).send({
      status: "error",
      message: "No file uploaded",
    });
  }

  // Check for upload errors (including file size limits)
  try {
    res.send({
      status: "success",
      statusCode: 200,
      fileName: req.file.filename,
      filePath: `/uploads/${req.file.filename}`,
      message: "Image uploaded successfully!",
    });
  } catch (error) {
    if (error instanceof multer.MulterError) {
      // A Multer error occurred during upload
      if (error.code === "LIMIT_FILE_SIZE") {
        return res.status(400).send({
          status: "error",
          message:
            "File size too large! Please upload a file smaller than 5MB.",
        });
      }
    }

    // Handle other errors
    return res.status(400).send({
      status: "error",
      message: error.message || "Error uploading image",
    });
  }
};

// Controller to fetch all uploaded images
const getAllImages = (req, res) => {
  try {
    const uploadPath = path.join(__dirname, "../uploads");
    fs.readdir(uploadPath, (err, files) => {
      if (err) {
        return res.status(500).send({
          status: "error",
          message: "Error reading files",
        });
      }
      res.send({
        status: "success",
        statusCode: 200,
        files,
      });
    });
  } catch (error) {
    res.status(400).send({
      status: "error",
      message: "Error getting images",
    });
  }
};

// Controller to fetch a specific image by filename
const getImage = (req, res) => {
  try {
    const filename = req.params.filename;
    const uploadPath = path.join(__dirname, "../uploads", filename);
    res.sendFile(uploadPath);
  } catch (error) {
    res.status(400).send({
      status: "error",
      message: "Error getting image",
    });
  }
};

module.exports = {
  uploadImage,
  getAllImages,
  getImage,
};
