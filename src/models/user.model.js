const pool = require("../database/connection");
const bcrypt = require("bcrypt");
const { traerLikes, getPostUser } = require("./post.model");

const hashPassword = async(password) => {
    
    return await bcrypt.hash(password, 10);
}

const compareUserPassword = async(username, password) => {
    const [rows] = await pool.query("SELECT password FROM users WHERE username = ?", [username]);
    const passwordDB = rows[0].password;

    const match = await bcrypt.compare(password, passwordDB);
    return match;
}

const existeUsuario = async(username) => {
    const [rows] = await pool.query("SELECT user_id, username FROM users WHERE username = ?", [username]);
    return rows;
}

const getUserById = async(user_id) => {
    const [rows] = await pool.query("SELECT * FROM users WHERE user_id = ?", [user_id]);
    return rows;
}

const guardarUsuario = async(username, password, profile) => {
    const [rows] = await pool.query("INSERT INTO users (username, password, profile) VALUES (?, ?, ?)", [username, password, profile]);
    return rows.insertId;
}

const publish = async(user_id, image, title) => {
    const [rows] = await pool.query("INSERT INTO posts (user_id, title, media) VALUES(?, ?, ?)", [user_id, title, image]);
    return rows.insertId;
}

const getUserPosts = async(user_id) => {
    let posts = [];
    try {
        const [rows] = await pool.query("SELECT * FROM posts WHERE posts.user_id = ?", [user_id]);
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
    hashPassword,
    guardarUsuario,
    existeUsuario,
    getUserById,
    compareUserPassword,
    publish,
    getUserPosts,
}