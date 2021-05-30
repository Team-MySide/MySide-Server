var express = require('express');
var router = express.Router();

const upload = require('../../config/multer');
var moment = require('moment');

const defaultRes = require("../../module/utils/utils");
const statusCode = require("../../module/utils/statusCode");
const resMessage = require("../../module/utils/responseMessage");
const db = require("../../module/pool");

router.post('/', upload.single('thumbImg'), async(req, res) => {


    console.log(req.body)
    let insertThumbQuery =  'INSERT INTO food_thumbnail '
    +' (name, img,title,category,background_color,link,nutrition1, nutrition2,nutrition3,nutrition4,views,likes,wishes,regiDate)'
    +' VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?)';;
    let insertThumbResult ="";
    if(req.file){ 
        insertThumbResult = await db.queryParam_Parse(insertThumbQuery, 
            [req.body.name, req.file.location, req.body.title, req.body.category, req.body.background_color,req.body.link,
                req.body.nutrition1,req.body.nutrition2,req.body.nutrition3,req.body.nutrition4,0,0,0, moment().format('YYYY-MM-DD HH:mm:ss')]);
    }else{
        insertThumbResult = await db.queryParam_Parse(insertThumbQuery, 
            [req.body.name, '', req.body.title, req.body.category, req.body.background_color,req.body.link,
                req.body.nutrition1,req.body.nutrition2,req.body.nutrition3,req.body.nutrition4,0,0,0, moment().format('YYYY-MM-DD HH:mm:ss')]);
    }
    

    if (!insertThumbResult) {
        res.status(200).send(defaultRes.successFalse(statusCode.DB_ERROR, resMessage.BOARD_INSERT_FAIL));
    } else { //쿼리문이 성공했을 때
  
       res.status(200).send(defaultRes.successTrue(statusCode.OK, resMessage.BOARD_INSERT_SUCCESS));
    }
});
router.get('/', (req, res) => {
    res.sendFile(__dirname + '/thumbnail.html')
});


module.exports = router;