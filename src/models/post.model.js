const pool = require("../database/connection");

const traerLikes = async(post_id) => {
    try {
        const [rows] = await pool.query("SELECT * FROM likes WHERE post_id = ?", [post_id]);

        return rows;
    } catch (error) {
       console.log(error); 
    }
}

const getPostUser = async(user_id) => {
    try {
        const [rows] = await pool.query("SELECT user_id, username, profile FROM users WHERE user_id = ?", [user_id]);

        return rows[0];
    } catch (error) {
        console.log(error); 
    }
}

const getPosts = async() => {
    let posts = [];
    try {
        const [rows] = await pool.query("SELECT * FROM posts ORDER BY post_id DESC");
        for(let i = 0; i<rows.length; i++){
            let post = {
                post_id: rows[i].post_id,
                user_info: await getPostUser(rows[i].user_id),
                title: rows[i].title,
                media: rows[i].media,
                likes: await traerLikes(rows[i].post_id),
            }

            posts.push(post);
        }

        return posts;
    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    getPosts,
    traerLikes,
    getPostUser,
}