const mongoose=require('mongoose');
const mongooseURL='mongodb://localhost:27017/hotels';
// mongoose.connect(
//     mongooseURL,{
//         useNewUrlparser:true,

//     }
// )
mongoose.connect(mongooseURL,{
    // useNewUrlParser: true,
//   useUnifiedTopology: true,

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