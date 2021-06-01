var express = require('express');
var router = express.Router();

/* GET home page. */


router.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html')
});

router.use('/thumbnail', require('./thumbnail.js'));
router.use('/detail', require('./detail.js'));
router.use('/cancer_food', require('./cancerFood.js'));
router.use('/list', require('./list.js'));


module.exports = router;
