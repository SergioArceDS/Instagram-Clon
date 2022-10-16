const pool = require("../database/connection");

const save = (user_id) => {
    try {
        pool.query("INSERT INTO likes (post_id, user_id) VALUES (?, ?)", [post_id, user_id]);
    } catch (error) {
        console.log(error);
    }
}