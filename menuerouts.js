   const express=require('express');
   const router=express.Router();
   const Card=require('./models/menue');
 router.post('/',async function(req,res){
  try{
      const dat=req.body;
      const tablecard=new Card(dat);
    const re= await tablecard.save();
      console.log('menue completed');
      res.status(200).json(re);
  }
  catch(err){
  console.log('menue not completed');
      res.status(500).json({error:`the err is ${err}`});
  }
 });
router. get('/', async function(req,res){
  try{
      const show= await Card.find();
      console.log(' menue findded');
      res.status(500).json(show);
  }catch(err){
     console.log("what error "+err);
     res.status(200).json({error:"menue not finded"});
  }
 });
 router. get('/:depend', async function(req,res){
  try{
    const d=req.params.depend;
    if(d!=''){
      const show= await Card.find({taste:d});
      console.log(' menue findded');
      res.status(200).json(show);
    }else{
        res.status(404).json({erroe:'Invalid site'});
     }

  }catch(err){
     console.log("what error "+err);
     res.status(500).json({error:"menue not finded"});
  }
 });
 router.delete('/:id',async function(req,res){
  try{
   const id=req.params.id;

   const responce=await Card.findByIdAndDelete(id);
  if(!responce){
    console.log("no res");
    res.status(500).json({error : "errporo"})
  }
   console.log("accseptred res");
    res.status(200).json(responce)
  }
  catch(err){
 console.log(" never "+err);
    res.status(500).json({error : "err"});
  }
 })
 module.exports=router;