const { saveLike, likeExists, putOffLike } = require("../models/like.model");

const like = async(req, res) => {
    const {post_id, origin} = req.body;
    const {user_id} = req.session.user;

    if(!post_id){
        res.redirect(`/${origin}`);
    }

    //Validar si ya le dio Like a el post
    const rows = await likeExists(post_id, user_id);
    if(!(rows.length > 0)) {
        const like = await saveLike(post_id, user_id);

        if(like){
            res.redirect(`/${origin}`);
        }
    }else{
        await putOffLike(post_id, user_id);
        res.redirect(`/${origin}`);
    }
}

module.exports = {
    like,
}