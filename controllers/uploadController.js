const path = require("path");
const fs = require("fs");
const { Storage } = require('@google-cloud/storage');
const storage = new Storage();
const bucket = storage.bucket("sinusoidcms-2024.appspot.com");
const crypto = require("crypto");

// Controller to handle image upload
const uploadImage = async (req, res) => {
  // Check if a file is uploaded
  if (!req.file) {
    return res.status(400).send({
      status: "error",
      message: "No file uploaded",
    });
  }

  try {
    // Generate a unique filename
    const uniqueSuffix = crypto.randomBytes(16).toString("hex");
    const ext = path.extname(req.file.originalname);
    const fileName = `${uniqueSuffix}${ext}`;

    // Upload file to Firebase Storage
    const blob = bucket.file(fileName);
    const blobStream = blob.createWriteStream({
      metadata: {
        contentType: req.file.mimetype,
      },
    });

    blobStream.on("error", (err) => {
      console.log(err);
      return res.status(500).send({
        status: "error",
        message: "Error uploading image to Firebase",
      });
    });

    blobStream.on("finish", async () => {
      // Get the public URL of the uploaded image
      const publicUrl = `https://storage.googleapis.com/${bucket.name}/${blob.name}`;

      res.send({
        status: "success",
        statusCode: 200,
        fileName: blob.name,
        filePath: publicUrl,
        message: "Image uploaded successfully!",
      });
    });

    blobStream.end(req.file.buffer); // Upload the file buffer
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      status: "error",
      message: error.message || "Error uploading image",
    });
  }
};

// Controller to fetch all uploaded images
const getAllImages = async (req, res) => {
  try {
    const [files] = await bucket.getFiles();
    const fileUrls = files.map((file) => {
      return `https://storage.googleapis.com/${bucket.name}/${file.name}`;
    });

    res.send({
      status: "success",
      statusCode: 200,
      files: fileUrls,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      status: "error",
      message: "Error fetching images",
    });
  }
};

// Controller to fetch a specific image by filename
const getImage = async (req, res) => {
  try {
    const filename = req.params.filename;
    const publicUrl = `https://storage.googleapis.com/${bucket.name}/${filename}`;
    res.redirect(publicUrl); // Redirect to the public URL of the image
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
