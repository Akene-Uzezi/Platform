const express = require("express");
const router = express.Router();
const authControllers = require("../controllers/auth-controllers");
const multer = require("multer");
const fs = require("fs");
const path = require("path");
const uploadDir = path.join(__dirname, "..", "images");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: "true" });
  console.log("Images directory created");
}
const storageConfig = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "images");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});
const upload = multer({ storage: storageConfig });

router.get("/signup", authControllers.signup);

router.post("/signup", upload.single("image"), authControllers.postSignup);

router.get("/login", authControllers.login);

router.post("/login", authControllers.postLogin);

router.get("/logout", authControllers.logout);

module.exports = router;
