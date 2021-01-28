const mongoose=require('mongoose');
const plm=require('passport-local-mongoose');
mongoose.connect('mongodb://localhost/finalprojext');
var userSchema=mongoose.Schema({
  name:String,
  email:String,
  password:String,
  post:[{
    type:mongoose.Schema.Types.ObjectId,
    ref:'post'
  }]
})

userSchema.plugin(plm);
module.exports=mongoose.model('user',userSchema);