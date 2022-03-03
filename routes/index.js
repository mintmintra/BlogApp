var express = require('express');
var router = express.Router();

var { check, validationResult } = require('express-validator');

//Connect DB
var mongodb = require('mongodb');
var db = require('monk')('localhost:27017/BlogDB')

/* GET home page. */
router.get('/', function(req, res, next) {
  var blogs = db.get('posts')
  var categories = db.get('categories')
  blogs.find({}, {}, function (err, blog) {
    categories.find({}, {}, function (err, category) {
    res.render('index', {
      posts: blog, categories:category
    });
  });
  });
  
});



router.get('/category/add', function(req, res, next) {
  res.render('addcategory');
});

router.get('/post/add', function (req, res, next) {
  var categories = db.get('categories')
  categories.find({}, {}, function (err, category) {
    res.render('addpost', {
      categories:category
    });
   });
});

router.post('/post/add', [
  check('title', 'กรุณาป้อนชื่อบทความ').not().isEmpty(),
  check('content', 'กรุณาป้อนเนื้อหา').not().isEmpty(),
  check('img', 'กรุณาใส่ภาพปก').not().isEmpty(),
  check('author', 'กรุณาป้อนชื่อผู้เขียน').not().isEmpty()
], function (req, res, next) {
  var result = validationResult(req);
  var errors = result.errors;
  if (!result.isEmpty()) {
    res.render('addpost', {
      errors: errors
    });
  } else {

  }
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
