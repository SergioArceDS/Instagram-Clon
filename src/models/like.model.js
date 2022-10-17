const pool = require("../database/connection");

const saveLike = async(post_id, user_id) => {
    try {
        const [rows] = await pool.query("INSERT INTO likes (post_id, user_id) VALUES (?, ?)", [post_id, user_id]);
        return rows.insertId;
    } catch (error) {
        console.log(error);
    }
}

const putOffLike = async(post_id, user_id) => {
    try {
        const [rows] = await pool.query("DELETE FROM likes WHERE post_id = ? AND user_id = ?", [post_id, user_id]);
        return rows;
    } catch (error) {
        console.log(error);
    }
} 

const likeExists = async(post_id, user_id) => {
    try {
        const [rows] = await pool.query("SELECT * FROM likes WHERE likes.post_id = ? AND likes.user_id = ?", [post_id, user_id]);
        return rows;
    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    saveLike,
    likeExists,
    putOffLike,
}