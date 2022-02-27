var express = require('express');
var router = express.Router();

var { check, validationResult } = require('express-validator');

//Connect DB
var mongodb = require('mongodb');
var db = require('monk')('localhost:27017/BlogDB')

/* GET home page. */
router.get('/', function(req, res, next) {
  var blogs = db.get('posts')
  blogs.find({}, {}, function (err, blog) {
    res.render('index', { posts: blog})
  })
});


router.get('/category/add', function(req, res, next) {
  res.render('addcategory');
});

router.post('/category/add', [
  check('name','ชื่อประเภทต้องไม่เป็นค่าว่าง').not().isEmpty()
], function(req, res, next) {
  var result = validationResult(req);
  var errors = result.errors;
  if (!result.isEmpty()) {
    res.render('addcategory', { errors: errors });
  } else {
    //บันทึกข้อมูลประเภท
    var category = db.get('categories')
    category.insert({
      name:req.body.name
    }, function (err, success) {
      if (err) {
        res.send(err);
      } else {
        res.location('/');
        res.redirect('/');
      }
    })
  }
  
});

module.exports = router;
