const mongoose=require('mongoose');
require('dotenv').config();
// const mongooseURL='mongodb://localhost:27017/hotels';
const mongooseURL=process.env.mongooseURL;

//mongodb+srv://siddharamsutar23:4KTfES7jZwMOq7QG@cluster0.ddnr1k9.mongodb.net/
// mongoose.connect(
//     mongooseURL,{
//         useNewUrlparser:true,

//     }
// )
mongoose.connect(mongooseURL,{
    useNewUrlParser: true,
  useUnifiedTopology: true,

});
const db=mongoose.connection;
db.on('connected',()=>{
    console.log("db is connected");
});
db.on('error',()=>{
    console.log("error in db ");
});
db.on('disconnected',()=>{
    console.log("db is discoonected");
});
module.exports =db;