const express =  require("express");
const { registerUser } = require("../controllers/auth.controller");
const multer = require("multer");
const router = express.Router();

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, "./public/img/photos");
    },
    filename: function (req, file, cb) {
        const ext = file.originalname.split(".");
        const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
        cb(null, uniqueSuffix + "." + ext[ext.length - 1]);
    },
});

const upload = multer({storage: storage});

router.get("/", (req, res) => {
    res.send("inicio");
});

router.get("/login", (req, res) => {
    res.send("inicio");
});

router.post("/auth", (req, res) => {
    res.send("inicio");
});

router.get("/signup", (req, res) => {
    res.render("register/index");
});

router.post("/register", upload.single("profile"), registerUser);

router.get("/signout", (req, res) => {
    res.send("inicio");
});

module.exports = router;