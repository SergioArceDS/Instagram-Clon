const express =  require("express");
const multer = require("multer");
const { like } = require("../controllers/actiones.controller");
const { storePost, showPosts, getUserProfile, returnPosts } = require("../controllers/home.controller");
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
router.get("/getposts", middlewareAuth, returnPosts);

router.post("/publish", middlewareAuth, upload.single("image"), storePost);

router.post("/addLike", middlewareAuth, like);

router.get("/profile/:user_id", middlewareAuth, getUserProfile);

module.exports = router;