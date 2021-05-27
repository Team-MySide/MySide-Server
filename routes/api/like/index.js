var express = require('express');
var router = express.Router();

router.use('/', require('./like.js'));




module.exports = router;
