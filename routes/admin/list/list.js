var express = require('express');
var router = express.Router();

const upload = require('../../../config/multer');
var moment = require('moment');

const defaultRes = require("../../../module/utils/utils");
const statusCode = require("../../../module/utils/statusCode");
const resMessage = require("../../../module/utils/responseMessage");
const db = require("../../../module/pool");

router.get('/all', async(req, res) => {

    let selectQuery =  'SELECT A.name,A.img,A.title,A.background_color,A.category'
    + ", CASE A.nutrition1 WHEN '' THEN '미등록' ELSE A.nutrition1 END AS nutrition1"
    + ',A.nutrition2,A.nutrition3,A.nutrition4,B.cancerNm '
    + 'FROM food_thumbnail A, (SELECT food,cancerNm FROM cancer_food GROUP BY food)B  '
    + 'WHERE A.name = B.food '
    + 'ORDER BY regiDate DESC ' 
    console.log(selectQuery);
    let selectResult = await db.queryParam_None(selectQuery);
    console.log(selectQuery);
    
    
    if (!selectResult) {
        res.status(200).send(defaultRes.successFalse(statusCode.DB_ERROR, resMessage.BOARD_INSERT_FAIL));
    } else { //쿼리문이 성공했을 때
  
       res.status(200).send(defaultRes.successTrue(statusCode.OK, "성공",selectResult));
    }
});


router.get('/detail/:food', async(req, res) => {

    let selectQuery = "SELECT name,status,efficacy,combination,select_tip,care FROM food_detail WHERE name =?  "
    
    let selectResult = await db.queryParam_Parse(selectQuery,req.params.food);
    
    
    if (!selectResult) {
        res.status(200).send(defaultRes.successFalse(statusCode.DB_ERROR, resMessage.BOARD_INSERT_FAIL));
    } else { //쿼리문이 성공했을 때
  
       res.status(200).send(defaultRes.successTrue(statusCode.OK, "성공",selectResult));
    }
});

router.get('/nutrition/:name', async(req, res) => {

    let selectQuery = "SELECT name_kr,category,physiological,overabundance,lack,representation_food,ref_link FROM nutrition WHERE name_kr =?  "
    let selectResult = await db.queryParam_Parse(selectQuery,[req.params.name]);
    
    
    if (!selectResult) {
        res.status(200).send(defaultRes.successFalse(statusCode.DB_ERROR, resMessage.BOARD_INSERT_FAIL));
    } else { //쿼리문이 성공했을 때
  
       res.status(200).send(defaultRes.successTrue(statusCode.OK, "성공",selectResult));
    }
});

router.get('/search', async(req, res) => {

    let checked = req.query.checked;

    let keyword = '%'+req.query.keyword+'%';
    let selectQuery ="";
    if(checked == 'true'){
        selectQuery =  'SELECT name,img,title,background_color,category'
        + ", CASE nutrition1 WHEN '' THEN '미등록' ELSE nutrition1 END AS nutrition1"
        + `,nutrition2,nutrition3,nutrition4,(SELECT cancerNm FROM cancer_food WHERE food = A.name LIMIT 1) As cancerNm `
        + 'FROM food_thumbnail A '
        + 'WHERE name LIKE ? '
        + 'ORDER BY name '
    }else{
        selectQuery =  'SELECT A.name,A.img,A.title,A.background_color,A.category'
        + ", CASE A.nutrition1 WHEN '' THEN '미등록' ELSE A.nutrition1 END AS nutrition1"
        + ',A.nutrition2,A.nutrition3,A.nutrition4,B.cancerNm '
        + 'FROM food_thumbnail A, (SELECT food,cancerNm FROM cancer_food GROUP BY food)B '
        + 'WHERE A.name = B.food AND A.name LIKE ? '
        + 'ORDER BY A.name '
    }
    
    let selectResult = await db.queryParam_Parse(selectQuery,keyword);
    if (!selectResult) {
        res.status(200).send(defaultRes.successFalse(statusCode.DB_ERROR, resMessage.BOARD_INSERT_FAIL));
    } else { //쿼리문이 성공했을 때
  
       res.status(200).send(defaultRes.successTrue(statusCode.OK, resMessage.BOARD_INSERT_SUCCESS,selectResult));
    }
 
});
router.get('/', (req, res) => {
    res.sendFile(__dirname + '/list.html')
});


/*'SELECT * FROM '
    + '(SELECT A.name,A.img,A.title,A.category,A.nutrition1,A.nutrition2,A.nutrition3,A.nutrition4 '
    + 'FROM food_thumbnail A, food_detail B '
    + 'WHERE A.name = B.name AND A.name LIKE ? '
    + 'GROUP BY A.name,A.img,A.title,A.category,A.nutrition1,A.nutrition2,A.nutrition3,A.nutrition4) F' //thumbnail+detail
    + ',cacner_food C '
    + 'WHERE  F.name = C.food ' */

module.exports = router;