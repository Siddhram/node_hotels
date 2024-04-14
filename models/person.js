const mongoose=require('mongoose');
const bctypt=require('bcrypt');
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
username:{
type:String,
required:true
},
passward:{
type:String,
required:true
}
});
schema.pre('save',async function(next){
    const person=this;

    if(!person.isModified('passward')){
        return next();
    }
    try{
        const salt=await bctypt.genSalt(10);
        const hashpassword=await bctypt.hash(person.passward,salt);
        person.passward=hashpassword;
next();
    }catch(err){
return next(err);
    }
})
schema.method.comparepassword=async function(candidatepass){
try{
const ismatch=await bctypt.compare(candidatepass,this.passward);
return ismatch;
}catch(err){
throw err;
}
}
const person=mongoose.model('pens',schema);
module.exports=person;