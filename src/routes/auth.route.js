const express =  require("express");
const { registerUser, loginUser } = require("../controllers/auth.controller");
const multer = require("multer");
const { middlewareAuth, middlewareHome } = require("../middlewares/auth.middleware");
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

router.get("/", middlewareAuth,(req, res) => {
    res.send("inicio");
});

router.get("/login", middlewareHome, (req, res) => {
    res.render("login/index", {errors: []});
});

router.post("/auth",middlewareHome, loginUser);

router.get("/signup", middlewareHome, (req, res) => {
    res.render("register/index", {errors: []});
});

router.post("/register", middlewareHome, upload.single("profile"), registerUser);

router.get("/signout", middlewareHome, (req, res) => {
    res.send("inicio");
});

module.exports = router;