var express = require('express');
var router = express.Router();

/* GET home page. */


router.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html')
});

router.use('/thumbnail', require('./thumbnail.js'));
router.use('/detail', require('./detail.js'));
router.use('/cancer_food', require('./cancerFood.js'));
router.use('/list', require('./list/list.js'));
router.use('/list/info', require('./list/info.js'));
router.use('/faq', require('./faq.js'));
router.use('/data', require('./data/data.js'));
router.use('/image', require('./image.js'));
router.use('/login', require('./login.js'));
router.use('/main', require('./main/main.js'));
router.use('/dashboard', require('./dashboard/dashboard.js'));
router.use('/recipe', require('./recipe/recipe.js'));


module.exports = router;
