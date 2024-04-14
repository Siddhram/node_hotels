const jwt = require('jsonwebtoken');
const middleware=(req,res,next)=>{
const token=req.headers.authorization.split(' ')[1];
if(!token){
    return res.status(401).json({error:'unothorised token'});
}
try{
 const decode= jwt.verify(token,process.env.JWT_SECRET);
   req.user=decode;
   next();
}catch(err){
console.log("error "+err);
res.status(500).json({error:"invalid token"})
}
  
}
const generatetoken=function(userdata){
return jwt.sign(userdata,process.env.JWT_SECRET);
}
module.exports ={middleware,generatetoken};