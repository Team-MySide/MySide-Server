var express = require('express');
var router = express.Router();

const upload = require('../../config/multer');
var moment = require('moment');

const defaultRes = require("../../module/utils/utils");
const statusCode = require("../../module/utils/statusCode");
const resMessage = require("../../module/utils/responseMessage");
const db = require("../../module/pool");

router.get('/all', async(req, res) => {

    let selectQuery =  'SELECT A.name,A.img,A.title,A.background_color,A.category'
    + ", CASE A.nutrition1 WHEN '' THEN '미등록' ELSE A.nutrition1 END AS nutrition1"
    + ',A.nutrition2,A.nutrition3,A.nutrition4,B.cancerNm '
    + 'FROM food_thumbnail A, cancer_food B '
    + 'WHERE A.name = B.food '
    + 'ORDER BY regiDate DESC '
    + 'LIMIT 20 ' 
    console.log(selectQuery);
    let selectResult = await db.queryParam_None(selectQuery);
    console.log(selectQuery);
    
    
    if (!selectResult) {
        res.status(200).send(defaultRes.successFalse(statusCode.DB_ERROR, resMessage.BOARD_INSERT_FAIL));
    } else { //쿼리문이 성공했을 때
  
       res.status(200).send(defaultRes.successTrue(statusCode.OK, "성공",selectResult));
    }
});

router.post('/', upload.single('thumbImg'), async(req, res) => {

    console.log(req.body)
    let insertThumbQuery =  'UPDATE food_thumbnail '
    +' SET img = ?, background_color = ? '
    +' WHERE name = ?'
    let insertThumbResult ="";
    if(req.file){ 
        insertThumbResult = await db.queryParam_Arr(insertThumbQuery, 
            [ req.file.location,req.body.background_color,req.body.name]);
    }else{
        insertThumbResult = await db.queryParam_Arr(insertThumbQuery, 
            [ req.file.location,req.body.background_color,req.body.name]);
    }

    if (!insertThumbResult) {
        res.status(200).send(defaultRes.successFalse(statusCode.DB_ERROR, "실패"));
    } else { //쿼리문이 성공했을 때
  
       res.status(200).send(defaultRes.successTrue(statusCode.OK, "성공"));
    }
  
});


router.get('/', (req, res) => {
    res.sendFile(__dirname + '/image.html')
});



module.exports = router;