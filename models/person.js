const mongoose=require('mongoose');
const schema=new mongoose.Schema({
name:{
    type:String,
    required:true
}    ,
age:{
    type:Number,
    required:true
}    ,
work:{
    type:String,
    enum:['cheif','waiter','manager'],
    required:true
}    ,mobile:{
    type:String,
    required:true
}    ,email:{
    type:String,
    required:true,
    unique:true
}    ,
address:{
    type:String,
    required:true
}    
,salary:{
    type:Number,
    required:true
}    ,
})
const person=mongoose.model('pens',schema);
module.exports=person;