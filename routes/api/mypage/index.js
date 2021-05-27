var express = require('express');
var router = express.Router();

router.use('/', require('./mypage.js'));
router.use('/health', require('./health.js'));


module.exports = router;
