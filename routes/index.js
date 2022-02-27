var express = require('express');
var router = express.Router();

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

router.post('/category/add', function(req, res, next) {
  res.render('addcategory');
});

module.exports = router;
