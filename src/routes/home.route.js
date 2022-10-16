const express =  require("express");
const multer = require("multer");
const { storePost, showPosts } = require("../controllers/home.controller");
const { middlewareAuth } = require("../middlewares/auth.middleware");
const router = express.Router();


const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, "./public/img/posts");
    },
    filename: function (req, file, cb) {
        const ext = file.originalname.split(".");
        const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
        cb(null, uniqueSuffix + "." + ext[ext.length - 1]);
    },
});

const upload = multer({storage: storage});

router.get("/home", middlewareAuth, showPosts);

router.post("/publish", upload.single("image"), storePost);

router.get("/profile", (req, res) => {
    res.send("inicio");
});

router.post("/addLike", (req, res) => {
    res.send("inicio");
});

router.get("/profile/:username", (req, res) => {
    res.send("inicio");
});

module.exports = router;