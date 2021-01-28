const mongoose=require('mongoose');
const passport = require('passport');

var CommentSchema=mongoose.Schema({
  comment:[{
      type:String
  }],
  postid:{
      type:mongoose.Schema.Types.ObjectId,
      ref:'post'
  }
})

module.exports=mongoose.model('comment',CommentSchema);