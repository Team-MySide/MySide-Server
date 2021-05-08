var express = require('express');
var router = express.Router();

router.use('/', require('./search.js'));
router.use('/auto', require('./auto.js'));
router.use('/info', require('./info.js'));



module.exports = router;
