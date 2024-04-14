 const passport=require('passport');
 const Localpassport=require('passport-local').Strategy;
const person = require('./models/person');

 passport.use(new Localpassport(async function(USERNAME ,passward,done){
  try{
    // const us=USERNAME.para
        console.log('Received credentials:', USERNAME, passward);
    const dta=await person.findOne({USERNAME});
    if(!dta){
                    console.log('Invalid username');

      return done(null,false,{message:"Invalid username"});
    }
    const matchpassword= await dta.comparepassword(passward);
    if (matchpassword) {
                    console.log('Authentication successful');

      return done(null,dta);
    } else {
                    console.log('Incorrect password');

      return done(null,false,{message:"Incorret password"});
    }
  //  next();
  }catch(err){
    console.log("authentication "+err);
return done(err);
  }
 }))
 module.exports=passport;