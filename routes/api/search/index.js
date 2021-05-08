var express = require('express');
var router = express.Router();

router.use('/', require('./search.js'));
router.use('/auto', require('./auto.js'));



module.exports = router;
