const express =require('express');
const routs=express.Router();
 const db=require('./db');
   const person=require('./models/person');
const { route } = require('./menuerouts');

routs.get('/', async (req,res)=>{
  try{
      const response= await person.find();
      console.log("data feched")
      res.status(200).json(response);
  }
  catch(err){
console.log("err : "+err);
res.status(500).json({error:"finished"});
  }
 })
  routs.get('/:worktype',async function(req,res){
  try{
     const worktype=req.params.worktype;
     if(worktype=='cheif'||worktype=='waiter'||worktype=='manager'){
      const response=await person.find({work:worktype});
      console.log('responce feched');
      res.status(200).json(response);
     }else{
        res.status(404).json({erroe:'Invalid site'});
     }
  }
  catch(err){
console.log("err    "+err);
res.status(500).json({error:'Inter nal server error'});
  }
 })
 routs.get('/', async (req,res)=>{
  try{
      const response= await person.find();
      console.log("data feched")
      res.status(200).json(response);
  }
  catch(err){
console.log("err : "+err);
res.status(500).json({error:"finished"});
  }
 })

 routs.post('/',async function(req,res){
  try{
      const data=req.body;
      const newperson=new person(data);
     const response= await newperson.save();
     console.log('data saved');
     res.status(200).json(response);

  }catch(err){
       console.log("error "+err);
       res.status(500).json({error:"Invalise operations"});
  }
 });
 routs.delete('/:id',async function(req,res){
  try{
    const id=req.params.id;
    const responce=await person.findByIdAndDelete(id);
    if(!responce){
      console.log("id not found");
      res.status(404).json({error:"Not found id"});
    }
    console.log("id is removed");
    res.status(200).json(responce);
  }catch(err){
    console.log("error : "+err);
    res.status(500).json({err:"invalid "})
  }
 });
 routs.put('/:id',async function(req,res){
  try{
   const personid=req.params.id;
   const changedata=req.body;
   const responce=await person.findByIdAndUpdate(personid,changedata,{
    new:true,
    runValidators:true,
   });
   if(!responce){
    res.status(404).json({error:"person not found"});
   }
   console.log('data updated');
   res.status(200).json(responce);
  }catch(err){
    console.log("error -- "+err);
    res.status(500).json({er:" Invalid type"});
  }
 });
 
 module.exports=routs;