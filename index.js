const express = require('express');
const app = express();
const port= 5000;
const bodyParser = require('body-parser')
const makeTodo=require('./router')
const path = require('path')
const cors= require('cors');
app.use(cors()) ;
app.use('/todo',makeTodo);
app.use(bodyParser.json());


// app.get("/",(req,res)=>{
//     res.sendFile(path.join(__dirname,"index.html"))
// })
app.listen(port,()=>{
    console.log(`listening on the port ${port}`);
})   