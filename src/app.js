const express = require("express");
const app = express();
const router = express.Router();
const methodOverride = require('method-override');
const path = require("path");
const session = require ('express-session')

app.set('view engine', 'ejs')
app.set('views', './src/views')


const userLoggedMiddleware = require('../src/middlewares/userLoggedMiddleware')
const productsRouter = require("./routes/productsRouter.js")
const usersRouter = require("./routes/usersRouter.js")
const mainRouter = require("./routes/mainRouter.js");


app.use(express.static("public"));
app.use(methodOverride("_method"));
app.use(session({
    secret: 'Nuestro msj secreto',
    resave: false,
    saveUninitialized: false}))
app.use(userLoggedMiddleware);    
app.use(express.urlencoded({ extended: false }));
app.use(express.json())

app.use("/products", productsRouter);
app.use("/users", usersRouter);
app.use("/", mainRouter);


app.listen(3080, ()=>{
    console.log("servidor corriendo en el puerto http://localhost:3080");
});

app.use((req,res,next)=>{
    res.status(404).render("not-found");
});

