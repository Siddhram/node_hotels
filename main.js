var a=require('express');
 const app= a();
const person = require('./models/person');

 const db=require('./db');
  //  const person=require('./models/person');
// const {middleware,generatetoken}=require('./jwt');
 const bodyparser=require('body-parser');
const e = require('express');
require('dotenv').config();
 app.use(bodyparser.json());

 const passport=require('passport');
 const Localpassport=require('passport-local').Strategy;
 //authantication
 app.use(passport.initialize());

 passport.use(new Localpassport(async function(USERNAME ,passward,done){
  try{
    const dta=await person.find({username:USERNAME});
    if(!dta){
      return done(null,false,{message:"Invalid username"});
    }
    const matchpassword=dta.passward===passward? true:false;
    if (matchpassword) {
      return done(null,USERNAME);
    } else {
      return done(null,false,{message:"Incorret password"});
    }
  }catch(err){
    console.log(err);
return done(err,false);
  }
 }))
//  console.log(person);
const logrequest=function(req,res,next){
  console.log(`${new Date().toLocaleString()} and hitted on this ${req.originalUrl} `);
  next();
}
app.use(logrequest);
const localauth=passport.authenticate('local',{session:false});
app.get('/',function(req,res){
  // console.log(localauth);
  res.send("Wellcome");
})
const meneurouts=require('./menuerouts');
app.use('/menue',meneurouts)
 const personRouts=require('./expressrouter');
 const PORT=process.env.PORT||3000;
 app.use('/person',personRouts);
  app.listen(3000);