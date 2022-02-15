var express = require('express');
var router = express.Router();

/* GET home page. */


router.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html')
});

router.use('/', require('./api/index.js'));
router.use('/admin', require('./admin/index.js'));

module.exports = router;
