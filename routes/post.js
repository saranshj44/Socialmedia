const mongoose=require('mongoose');
const passport = require('passport');

var PostSchema=mongoose.Schema({
  commentid:[{
      type:mongoose.Schema.Types.ObjectId,
      ref:'comment'
  }],
  react:{
      type:Number,
      default:0
  },
  userid:{
      type:mongoose.Schema.Types.ObjectId,
      ref:'user'
  },
  cnt:String,
  media:{
      type:String,
      default:''
  }
})

module.exports=mongoose.model('post',PostSchema);