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


router.get('/search', async(req, res) => {

    let keyword = '%'+req.query.keyword+'%';
    let selectQuery =  'SELECT A.name,A.img,A.title,A.background_color,A.category'
    + ", CASE A.nutrition1 WHEN '' THEN '미등록' ELSE A.nutrition1 END AS nutrition1"
    + ',A.nutrition2,A.nutrition3,A.nutrition4,B.cancerNm '
    + 'FROM food_thumbnail A, cancer_food B '
    + 'WHERE A.name = B.food AND A.name LIKE ? '
    + 'ORDER BY A.name '
    let selectResult = await db.queryParam_Parse(selectQuery,keyword);
    
    if (!selectResult) {
        res.status(200).send(defaultRes.successFalse(statusCode.DB_ERROR, resMessage.BOARD_INSERT_FAIL));
    } else { //쿼리문이 성공했을 때
  
       res.status(200).send(defaultRes.successTrue(statusCode.OK, resMessage.BOARD_INSERT_SUCCESS,selectResult));
    }
 
});
router.get('/', (req, res) => {
    res.sendFile(__dirname + '/image.html')
});



module.exports = router;