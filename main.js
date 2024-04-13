var a=require('express');
 const app= a();

 const db=require('./db');

 const bodyparser=require('body-parser');
const e = require('express');
require('dotenv').config();
 app.use(bodyparser.json());
//  console.log(person);
app.get('/',function(req,res){
  res.send("Wellcome");
})
const meneurouts=require('./menuerouts');
app.use('/menue',meneurouts)
 const personRouts=require('./expressrouter');
 const PORT=process.env.PORT||3000;
 app.use('/person',personRouts);
  app.listen(PORT);