const userModel = require("../models/user.model");
const fs = require("fs");
const {guardarUsuario, existeUsuario} = require("../models/user.model");
const { join } = require("path");

const registerUser = async(req, res) => {
    
    const profile = req.file.filename;
    const {username, password} = req.body;
    
    if(!username || !password || !profile){
        console.log("Faltan campos por rellenar");
        res.redirect("/signup");
    }

    //Validar si ya existe el usuario

    const rows = await existeUsuario(username);
    if(rows.length > 0) {
        res.render("register/index", {errors: ["Ya existe el usuario"]});
        const dirFile = join(__dirname, `../../public/img/photos/${profile}`);
        fs.unlinkSync(dirFile);
    }

    const passHashed = await userModel.hashPassword(password);

    const insertedId = await guardarUsuario(username, passHashed, profile);

    if(!insertedId){
        return console.log("Error al insertar usuario");
    }
    
    res.redirect("/login");
}

const loginUser = async(req, res) => {
    const {username, password} = req.body;

    if(!username || !password){
        res.render("login/index", {errors: ["Faltan campos por rellenar"]});
    }

    //Validar si existe el usuario

    const rows = await existeUsuario(username);
    if(!(rows.length > 0)) {
        res.render("login/index", {errors: ["No existe el usuario"]});
    }

    //Validar la contraseña
    const match = await userModel.compareUserPassword(username, password);
    
    if(!match){
        res.render("login/index", {errors: ["Contraseña incorrecta"]});
    }

    req.session.user = rows[0];
    res.redirect("/home");
}

module.exports = {
    registerUser,
    loginUser,
}