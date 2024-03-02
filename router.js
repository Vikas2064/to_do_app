const express = require("express");
const router = express.Router();
const bodyParser = require('body-parser');
const fs= require('fs')
// router.use(bodyParser.urlencoded());
router.use(bodyParser.json());
let todos=[{
  "id":39485045,
  "title":"learning cohort 1 week 3.1",
  "description":"learning about working of different api"
}];
 

router.get('/',(req,res)=>{
  const data=fs.readFile("todo.json",'utf8',(err,data) =>{
    if(err)
    throw err;
    return  res.json(JSON.parse(data));
  });
});

router.post('/' ,(req,res)=>{
  console.log(req.body)
  let todo={
    id : Math.floor(Math.random()*10000),
    title : req.body.title,
    description : req.body.description
   }
   console.log(todo);
   fs.readFile("todo.json","utf-8",(err,data)=>{
      if(err)
      {
        throw err;
      }
      let todos= JSON.parse(data);
      todos.push(todo);
      fs.writeFile("todo.json",JSON.stringify(todos),(err)=>{
      if(err)
      {
        throw err;
      }
     return  res.status(200).json(todo);
    });
   })
  
});

function findIndex(todos1,id)
{
    
    for(let i =0;i<todos1.length;i++)
    {
        if(id==todos1[i].id)
        {
            return i;
        }
    }
    return -1;
}
function removeAtIndex(todos,index)
{
     let arr=[];
     for(let i=0;i<todos.length;i+=1)
     {
        if(i!=index)
        {
           arr.push(todos[i]);
        }
     }
     return arr;
}
function updateAtIndex(todos, findind,updated_todo)
{
    todos[i]=updated_todo;
}
router.put("/:id",(req,res)=>{
      const findind=findIndex(todos,parseInt(req.params.id));
      if(findind==-1)
      {
        res.status(401).send("this todo does not exist");
      }
      else
      {
        todos=updateAtIndex(todos,findind);
        return  res.status(200).send("all good");
      }
});
router.delete("/:id",(req,res)=>{
  console.log(req.params.id)
  const data=fs.readFile("todo.json",'utf8',(err,data) =>{
      if(err)
      throw err;
      data= JSON.parse(data);
      const findind=findIndex(data,parseInt(req.params.id));
      console.log(findind)
      if(findind==-1)
      {
        return res.status(401).send("this todo does not exist");
      }
      else   
      {
        data=removeAtIndex(data,findind);
        console.log(data);
        fs.writeFile("todo.json",JSON.stringify(data),(err)=>{
            if(err)
            {
              throw err;
            }
        })
        return res.status(200).send("all good");
      }
    });
});


module.exports=router;