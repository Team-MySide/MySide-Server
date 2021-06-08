var express = require('express');
var router = express.Router();

router.use('/auto', require('./auto.js'));
router.use('/', require('./common.js'));



module.exports = router;
