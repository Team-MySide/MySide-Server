<<<<<<< HEAD
var express = require('express');
var router = express.Router();

router.use('/mypage', require('./mypage/index'));
router.use('/auth', require('./auth/index'));
router.use('/search', require('./search/index'));
router.use('/main', require('./main/index'));
router.use('/wish', require('./wish/index'));
router.use('/home', require('./home/index'));
router.use('/like', require('./like/index'));
router.use('/common', require('./common/index'));

module.exports = router;
=======
var express = require('express');
var router = express.Router();

router.use('/mypage', require('./mypage/index'));
router.use('/auth', require('./auth/index'));
router.use('/search', require('./search/index'));
router.use('/main', require('./main/index'));
router.use('/wish', require('./wish/index'));
router.use('/home', require('./home/index'));
router.use('/like', require('./like/index'));
router.use('/common', require('./common/index'));

module.exports = router;
>>>>>>> 5fe080a8889eb343eca8528bd7e1b1cd7ec9e8d8
