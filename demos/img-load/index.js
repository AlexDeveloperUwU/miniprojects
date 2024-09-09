const express = require("express");
const multer = require("multer");
const sharp = require("sharp");
const path = require("path");
const fs = require("fs");

const app = express();
const port = 3000;

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const originalDir = path.join(__dirname, "uploads/originals");
const thumbnailDir = path.join(__dirname, "uploads/thumbnails");

if (!fs.existsSync(originalDir)) fs.mkdirSync(originalDir, { recursive: true });
if (!fs.existsSync(thumbnailDir)) fs.mkdirSync(thumbnailDir, { recursive: true });

const imageMap = {};

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.get("/upload", (req, res) => {
  res.sendFile(path.join(__dirname, "upload.html"));
});

app.post("/upload-file", upload.single("image"), async (req, res) => {
  if (!req.file) {
    return res.status(400).send("No file uploaded.");
  }

  try {
    const originalName = req.file.originalname;
    const originalBaseName = path.parse(originalName).name;
    const originalFilename = `${originalBaseName}.png`;
    const thumbnailFilename = `${originalBaseName}_thumbnail.png`;

    fs.writeFileSync(path.join(originalDir, originalFilename), req.file.buffer);

    const metadata = await sharp(req.file.buffer).metadata();
    const originalWidth = metadata.width;
    const originalHeight = metadata.height;

    const thumbnailWidth = Math.round(originalWidth * 0.02);
    const thumbnailHeight = Math.round(originalHeight * 0.02);

    const thumbnail = await sharp(req.file.buffer)
      .resize(thumbnailWidth, thumbnailHeight)
      .blur(2)
      .toBuffer();

    fs.writeFileSync(path.join(thumbnailDir, thumbnailFilename), thumbnail);

    imageMap[originalBaseName] = {
      original: originalFilename,
      thumbnail: thumbnailFilename,
    };

    res.redirect("/");
  } catch (error) {
    console.error("Error processing image:", error);
    res.status(500).send("Error processing image.");
  }
});

app.get("/image", (req, res) => {
  const { filename, thumb } = req.query;

  if (!filename) {
    return res.status(400).send("Filename is required.");
  }

  const parsedPath = path.parse(filename);
  const baseFilename = parsedPath.name;

  const mappedFiles = imageMap[baseFilename];
  if (!mappedFiles) {
    return res.status(404).send("Image not found.");
  }

  const isThumbnail = thumb === "true";
  const directory = isThumbnail ? thumbnailDir : originalDir;
  const fileName = isThumbnail ? mappedFiles.thumbnail : mappedFiles.original;
  const filePath = path.join(directory, fileName);

  if (fs.existsSync(filePath)) {
    res.sendFile(filePath);
  } else {
    res.status(404).send("Image not found.");
  }
});

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
