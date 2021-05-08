var express = require('express');
var router = express.Router();

router.use('/mypage', require('./mypage/index'));
router.use('/auth', require('./auth/index'));
router.use('/search', require('./search/index'));


module.exports = router;
