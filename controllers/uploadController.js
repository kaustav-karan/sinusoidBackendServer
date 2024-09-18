const path = require("path");
const fs = require("fs");

// Controller to handle image upload
const uploadImage = (req, res) => {
  try {
    res.send({
      status: "success",
      statusCode: 200,
      fileName: req?.file?.filename,
      filePath: `/uploads/${req?.file?.filename}`,
      message: "Image uploaded successfully!",
    });
  } catch (error) {
    res.status(400).send({
      status: "error",
      message: "Error uploading image",
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
