const express =  require("express");
const router = express.Router();

router.get("/home", (req, res) => {
    res.render("home/index");
});

router.get("/publish", (req, res) => {
    res.send("inicio");
});

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