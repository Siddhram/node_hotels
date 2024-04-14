const express =require('express');
const routs=express.Router();
 const db=require('./db');
  const passport=require('passport');
 const Localpassport=require('passport-local').Strategy;
   const person=require('./models/person');
const { route } = require('./menuerouts');
const {middleware,generatetoken}=require('./jwt');
const bctypt=require('bcrypt');
const { u } = require('tar');
 routs.get('/profile',middleware,async function(req,res){
try{
  const userdata=req.user;
  const userId=userdata.id;
  const user=await person.findById(userId);
  res.status(200).json({user});
  }catch(err){
res.status(500).json({err:"Profile error"});
  }
 });

routs.get('/', middleware,async (req,res)=>{
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
 routs.post('/login',async function(req,res){
  try{
    const {username,passward}=req.body;
    const responce=await person.findOne({username:username});
    if(!responce||!(await bctypt.compare(passward,responce.passward))){
     // console.log(passward+" "+responce.passward);
      res.status(404).json({err:"Invalid name"});
    }
    //generste tokens
    const pyload={
      id:responce.id,
      name:responce.username
    }
    const token=generatetoken(pyload);
    res.json({token});
   // if(responce.passward!=passward)

  }catch(err){
    console.log("ERR "+err);
    res.status(500).json({error:"catch error"});
  }
 })
// FOR TESTING PERPOSE
 routs.post('/',async function(req,res){
  try{
      const data=req.body;
      const newperson=new person(data);
     const response= await newperson.save();
     console.log('data saved');
     const pyload={
      id:response.id,
      na:response.username
     }
     const token=generatetoken(pyload);
     console.log("the token : "+JSON.stringify(pyload));
     res.status(200).json({response:response,token:token});

  }catch(err){
       console.log("error "+err);
       res.status(500).json({error:"Invalise operations"});
  }
 });
//  routs.delete('/:id',async function(req,res){
//   try{
//     const id=req.params.id;
//     const responce=await person.findByIdAndDelete(id);
//     if(!responce){
//       console.log("id not found");
//       res.status(404).json({error:"Not found id"});
//     }
//     console.log("id is removed");
//     res.status(200).json(responce);
//   }catch(err){
//     console.log("error : "+err);
//     res.status(500).json({err:"invalid "})
//   }
//  });

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
//  const comparepassword=async function(candidatepass){
// try{
// const ismatch=await bctypt.compare(candidatepass,this.passward);
// return ismatch;
// }catch(err){
// throw err;
// }
// }

 module.exports=routs;