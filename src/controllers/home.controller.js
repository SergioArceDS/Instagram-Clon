const { getPosts } = require("../models/post.model");
const { publish } = require("../models/user.model");

const storePost = async(req, res) => {
    const image = req.file.filename;
    const {title} = req.body;

    if(!image || !title){
        res.redirect("/home");
    }
    const {user_id} = req.session.user;

    const insertedId = await publish(user_id, image, title);

    if(!insertedId){
        return console.log("Error al publicar el post");
    }

    res.redirect("/home");
}

const showPosts = async(req, res) => {
    const posts = await getPosts();

    res.render("home/index", {user: req.session.user, posts: posts});
    console.log(posts);
}

module.exports = {
    storePost,
    showPosts,
}