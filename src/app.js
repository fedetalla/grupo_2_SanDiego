const express = require("express");
const app = express();

const path = require("path");


app.set('view engine', 'ejs')
app.set('views', path.resolve(__dirname,'./views'))

const productsRouter = require("./routes/productsRouter.js")
const usersRouter = require("./routes/usersRouter.js")
const mainRouter = require("./routes/mainRouter.js");


app.use(express.static("public"));

app.use("/productos", productsRouter);
app.use("/usuarios", usersRouter);
app.use("/", mainRouter);



app.listen(3080, ()=>{
    console.log("servidor corriendo en el puerto http://localhost:3080");
});

