const express = require("express");
const app = express();
const router = express.Router();
const methodOverride = require('method-override');
const path = require("path");
const session = require ('express-session');
const cookies = require('cookie-parser');


app.set('view engine', 'ejs')
app.set('views', './src/views')


const userLoggedMiddleware = require('../src/middlewares/userLoggedMiddleware')
const productsRouter = require("./routes/productsRouter.js")
const usersRouter = require("./routes/usersRouter.js")
const mainRouter = require("./routes/mainRouter.js");
const apiProductsRouter = require("./routes/api/products.js");
const apiUsersRouter = require("./routes/api/users.js");
   

app.use(express.static("public"));
app.use(methodOverride("_method"));
app.use(session({
    secret: 'Nuestro msj secreto',
    resave: false,
    saveUninitialized: false}))
app.use(cookies());
app.use(userLoggedMiddleware); 
app.use(express.urlencoded({ extended: false }));
app.use(express.json())

app.use("/products", productsRouter);
app.use("/users", usersRouter);
app.use("/", mainRouter);

//Aquí creo la colección de mis recursos de productos/usuarios (APIs)
app.use('/api/products', apiProductsRouter);
app.use('/api/users', apiUsersRouter);


app.listen(3080, ()=>{
    console.log("servidor corriendo en el puerto http://localhost:3080");
});

app.use((req,res,next)=>{
    res.status(404).render("not-found");
});

