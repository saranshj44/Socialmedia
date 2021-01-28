var express = require('express');
const passport = require('passport');
var router = express.Router();
var usermodel=require('./users');
var postmodel=require('./post');
var commentmodel=require('./comment');
var localstratecy=require('passport-local');
const post = require('./post');
/* GET home page. */
passport.use(new localstratecy(usermodel.authenticate()));
router.get('/', function(req, res) {
  res.json('index page');
});
router.post('/reg',function(req,res){
  var newuser=new usermodel({
    name:req.body.name,
    username:req.body.username
  })
  usermodel.register(newuser,req.body.password)
  .then(function(u){
    passport.authenticate('local')(req,res,function(){
      res.status(200).json({message:"userRegistered",value:u});
    })
  })
});

router.post('/login',passport.authenticate('local',{
  successRedirect:'/profile',
  failureMessage:'/'
}),function(req,res){});

router.get('/profile',function(req,res){
  usermodel.findOne({username:req.session.passport.user})
  .then(function(u){
    res.json({message:"Profile page",value:u})
  })
})

router.get('/logout',function(req,res){
  req.logOut();
  res.redirect('/');
})

router.post('/post',function(req,res){
  usermodel.findOne({username:req.session.passport.user})
  .then(function(founduser){
    postmodel.create({
      cnt:req.body.cnt,
      userid:founduser
    })
    .then(function(createdpost){
      founduser.post.push(createdpost)
      founduser.save()
      .then(function(){
        res.json({value:founduser,postuser:createdpost});
      })
    })
  })
})

router.post('/comment/:postid',function(req,res){
  usermodel.findOne({username:req.session.passport.user})
  .then(function(founduser){
    postmodel.findOne({_id:req.params.postid})
    .then(function(postss){
      commentmodel.create({
        comment:req.body.comment,
        postid:postss
      })
      .then(function(commentcreated){
        postss.commentid.push(commentcreated);
        postss.save()
        .then(function(u){
          console.log(commentcreated);
          console.log(postss);
          res.json(founduser)
        })
      })
    })
  })  
})

module.exports = router;
