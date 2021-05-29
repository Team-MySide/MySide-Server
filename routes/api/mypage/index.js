var express = require('express');
var router = express.Router();

router.use('/', require('./mypage.js'));
router.use('/health', require('./health.js'));
router.use('/profile', require('./profile.js'));


module.exports = router;
