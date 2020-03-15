var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  console.log('users启动')
  res.send('address 页面');
});

module.exports = router;