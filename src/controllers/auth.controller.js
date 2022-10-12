const connection = require("../database/connection");

const registerUser = async(req, res) => {
    
    const file = req.file;
    const {username, password} = req.body;
    
    if(!username || !password || !file){
        console.log("Faltan campos por rellenar");
        res.redirect("/signup");
    }

    
   
}

module.exports = {
    registerUser,
}