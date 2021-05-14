var express = require('express');
var router = express.Router();

router.use('/', require('./wish.js'));




module.exports = router;
