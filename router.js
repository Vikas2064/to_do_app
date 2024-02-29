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
 
function callback(err,data) {
  if(err)
  throw err;
  res.json(JSON.parse(data));
}

router.get('/',(req,res)=>{
    // res.status(201).send(todos);
    fs.readFile("todo.json",'utf8',callback);
    res.send("data read successfully")
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
      res.status(200).json(todo);
    })
    res.status(201).send(req.body);
   })
  
});

function findIndex(todos1,id)
{
    for(let i =0;i<todos1.length;i++)
    {
        if(id==todos1.id)
        {
            return i;
        }
    }
    return -1;
}
function removeAtIndex(todos,index)
{
     todos = todos.filter(items =>todos.indexOf(items)!==index)
}
function updateAtIndex(todos, findind,updated_todo)
{
    todos[i]=updated_todo;
}
router.put("/:id",(req,res)=>{
      const findind=findIndex(todos,parseInt(req.params.id));
      if(findind===-1)
      {
        res.status(401).send("this todo does not exist");
      }
      else
      {
        todos=updateAtIndex(todos,findind);
        res.status(200).send("all good");
      }
});
router.delete("/:id",(req,res)=>{
  const findind=findIndex(todos,parseInt(req.params.id));
  if(findind===-1)
  {
    res.status(401).send("this todo does not exist");
  }
  else
  {
    todos=removeAtIndex(todos,findind);
    res.status(200).send("all good");
  }
});


module.exports=router;