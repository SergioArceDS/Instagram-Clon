const pool = require("../database/connection");
const bcrypt = require("bcrypt");

const hashPassword = async(password) => {
    
    return await bcrypt.hash(password, 10);
}

const existeUsuario = async(username, result) => {
    const [rows] = await pool.query("SELECT * FROM users WHERE username = ?", [username]);
    return rows;
}

const guardarUsuario = async(username, password, profile) => {
    const [rows] = await pool.query("INSERT INTO users (username, password, profile) VALUES (?, ?, ?)", [username, password, profile]);
    return rows.insertId;
}

module.exports = {
    hashPassword,
    guardarUsuario,
    existeUsuario,
}