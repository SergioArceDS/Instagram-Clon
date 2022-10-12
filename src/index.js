const express = require("express");
const {join} = require("path");
const session = require("express-session");
const authRouter = require("./routes/auth.route");
const homeRouter = require("./routes/home.route");
const { urlencoded } = require("express");
require("dotenv").config();

const app = express();

app.use(express.json());
app.use(urlencoded({extended: true}));

app.use(express.static(join(__dirname, "../public")));
app.set("views", join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(
    session({
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: false,
    })
);

app.use(authRouter);
app.use(homeRouter);

app.listen(5000, () => {
    console.log("Servidor iniciado...");
});