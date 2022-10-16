const middlewareAuth = (req, res, next) => {
    if(req.session.user){
        next();
    }else{
        res.redirect("/login");
    }
}

const middlewareHome = (req, res, next) => {
    if(req.session.user){
        res.redirect("/home");
    }else{
        next();
    }
}

module.exports = {
    middlewareAuth,
    middlewareHome,
}