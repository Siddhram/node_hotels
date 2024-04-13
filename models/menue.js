const bodyParser = require('body-parser');
const mongooes=require('mongoose');
const menue=mongooes.Schema({
    name:{
type:String,
required:true,
    },
prize:{
    type:Number,
    required:true
},
taste:{
    type:String,
    required:true
},
is_drink:{
    type:Boolean,
    default:false
}
,
ingrednts:{
    type:[String],
    default:[]
},
num_sells:{
    type:Number,
    default:0
}
});
const Card=mongooes.model('mymenue',menue);
module.exports=Card;