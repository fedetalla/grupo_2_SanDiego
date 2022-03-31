const express = ("express");
const path = ("path");

const app = express()

const publicPath = path.resolve(__dirname, './public'); 
app.use(express.static(publicPath));

app.listen(3080, ()=>{
    console.log("servidor corriendo en el puerto http://localhost:3050");
});

app.get('/', (req,res)=>{
    res.sendFile(path.resolve(__dirname, './views/home.html'));
});