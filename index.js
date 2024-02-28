const express = require('express');
const app = express();
const port= 5000;


app.get('/',(req,res)=>{
    res.send("this is main page")
})

app.listen(port,()=>{
    console.log(`listening on the port ${port}`);
})