var express = require('express');
var router = express.Router();

router.use('/auto', require('./auto.js'));
router.use('/common', require('./common.js'));



module.exports = router;
