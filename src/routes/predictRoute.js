const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const { spawn } = require("child_process");

// Define the uploads directory (absolute path)
const uploadsDir = path.join(__dirname, "..", "uploads");
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadsDir);
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});
const upload = multer({ storage: storage });

// POST /api/predict route
router.post("/predict", upload.single("image"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: "No image uploaded" });
  }

  // Use the absolute path provided by multer directly
  const imagePath = req.file.path;

  // Compute the absolute path to the Python script in src/ml/predict.py
  const predictScript = path.join(__dirname, "..", "ml", "predict.py");

  // Spawn the Python process
  const pythonProcess = spawn("python3", [predictScript, imagePath]);

  let result = "";
  pythonProcess.stdout.on("data", (data) => {
    result += data.toString();
  });

  pythonProcess.stderr.on("data", (data) => {
    console.error(`stderr: ${data}`);
  });

  pythonProcess.on("close", (code) => {
    // Delete the uploaded image file after processing
    fs.unlink(imagePath, (err) => {
      if (err) console.error("Error deleting file:", err);
    });
    res.json({ prediction: result.trim() });
  });
});

module.exports = router;
