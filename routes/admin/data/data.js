var express = require('express');
var router = express.Router();

//const upload = require('../../config/multer');
var moment = require('moment');

const defaultRes = require("../../../module/utils/utils");
const statusCode = require("../../../module/utils/statusCode");
const resMessage = require("../../../module/utils/responseMessage");
const db = require("../../../module/pool");



router.get('/', (req, res) => {
    res.sendFile(__dirname + '/data.html')
});
router.get('/search', async(req, res) => {

    let start = (req.query.page -1) * 20 +1;
    let end = req.query.page * 20;

    let category = req.query.category;
    let selectDataQuery = "";
    if(category == 'GOODNUT'){
        selectDataQuery =  'SELECT * '
        + 'FROM (SELECT @rownum:=@rownum+1  rnum,  A.id, A.cancer, A.nutrition,A.info,A.ref_link,A.modify_date '
        + 'FROM cancer_nut_good A,(SELECT @ROWNUM := 0) R '
        + 'WHERE 1=1) list ' 
        + 'WHERE rnum >= ? AND rnum <=? '

        selectTotalCountQuery =  'SELECT COUNT(*) cnt '
        + 'FROM cancer_nut_good'
    }

    if(category == 'BADNUT'){
        selectDataQuery =  'SELECT * '
        + 'FROM (SELECT @rownum:=@rownum+1  rnum,  A.id, A.cancer, A.nutrition,A.ref_link '
        + 'FROM cancer_nut_bad A,(SELECT @ROWNUM := 0) R '
        + 'WHERE 1=1 ORDER BY rnum DESC ) list ' 
        + 'WHERE rnum >= ? AND rnum <=? '

        selectTotalCountQuery =  'SELECT COUNT(*) cnt '
        + 'FROM cancer_nut_bad'
    }

    if(category == 'GOODFOOD'){
        selectDataQuery =  'SELECT * '
        + 'FROM (SELECT @rownum:=@rownum+1  rnum,  A.cancer_food_id as id, A.cancerNm, A.food,A.ref_link,ref_site,A.modify_date ,A.headline, A.comment,A.flag,A.source,A.source_link,A.source_date '
        + 'FROM cancer_food A,(SELECT @ROWNUM := 0) R '
        + 'WHERE 1=1 ORDER BY rnum DESC ) list ' 
        + 'WHERE rnum >= ? AND rnum <=? '

        selectTotalCountQuery =  'SELECT COUNT(*) cnt '
        + 'FROM cancer_food'
    }
    let selectDataResult = await db.queryParam_Arr(selectDataQuery,[start,end]);
    console.log(selectDataQuery);
    let selectTotalCountResult = await db.queryParam_None(selectTotalCountQuery);


    let resData ={
        data : [],
        totalCount :0
    };
    resData.data = selectDataResult;
    resData.totalCount = selectTotalCountResult[0].cnt; 
    if (!selectDataResult) {
        res.status(200).send(defaultRes.successFalse(statusCode.DB_ERROR, "실패"));
    } else { //쿼리문이 성공했을 때
  
       res.status(200).send(defaultRes.successTrue(statusCode.OK, "성공",resData));
    }
});


router.post('/', async(req, res) => {
    console.log(req.body)
    let insertResult;
    let insertQuery;

    let category = req.query.category;

    if(category == 'GOODNUT'){
        insertQuery =  'INSERT INTO cancer_nut_good '
        +' (cancer, nutrition,info,ref_link,modify_date )'
        +' VALUES (?,?,?,?,?)';;
        insertResult = await db.queryParam_Arr(insertQuery, 
                [req.body.cancer,req.body.info, req.body.nutrition, req.body.ref_link,moment().format('YYYY-MM-DD HH:mm:ss')]);
    }

    if(category == 'BADNUT'){
        
    }

    if(category == 'GOODFOOD'){
        insertQuery =  'INSERT INTO cancer_food '
        +' (cancerNm, food,ref_link,ref_site,headline, comment, flag, source, source_link, source_date,modify_date )'
        +' VALUES (?,?,?,?,?,?,?,?,?,?,?)';
        insertResult = await db.queryParam_Arr(insertQuery, 
                [req.body.cancer,req.body.food, req.body.ref_link,req.body.ref_site, req.body.headline, req.body.comment, req.body.flag, req.body.source, req.body.source_link, req.body.source_date,moment().format('YYYY-MM-DD HH:mm:ss')]);
     
    }

    if (!insertResult) {
        res.status(200).send(defaultRes.successFalse(statusCode.DB_ERROR, resMessage.BOARD_INSERT_FAIL));
    } else { //쿼리문이 성공했을 때
  
       res.status(200).send(defaultRes.successTrue(statusCode.OK, resMessage.BOARD_INSERT_SUCCESS));
    }
});

router.post('/modify', async(req, res) => {
    console.log(req.body)
    let updateResult;
    let updateQuery;

    let category = req.query.category;

    if(category == 'GOODNUT'){

        updateQuery = 'UPDATE cancer_nut_good SET ' 
        + 'cancer =?,nutrition =?,info =?,ref_link =?,modify_date =? '
        + 'WHERE id =?'
        updateResult = await db.queryParam_Arr(updateQuery, 
                [req.body.cancer,req.body.nutrition, req.body.info, req.body.ref_link,moment().format('YYYY-MM-DD HH:mm:ss'),req.body.id]);
    }
   

    if(category == 'BADNUT'){
        
    }

    if(category == 'GOODFOOD'){
        updateQuery = 'UPDATE cancer_food SET ' 
        + 'cancerNm =?,food =?,ref_link =?,ref_site =?,headline =?, comment=?, flag=?, source=? , source_link=?, source_date=?, modify_date =? '
        + 'WHERE cancer_food_id =?'
        updateResult = await db.queryParam_Arr(updateQuery, 
                [req.body.cancer,req.body.food, req.body.ref_link, req.body.ref_site, req.body.headline, req.body.comment, req.body.flag, req.body.source, req.body.source_link,req.body.source_date, moment().format('YYYY-MM-DD HH:mm:ss'),req.body.id]);
    }

    console.log(updateResult);
    if (!updateResult) {
        res.status(200).send(defaultRes.successFalse(statusCode.DB_ERROR, resMessage.BOARD_INSERT_FAIL));
    } else { //쿼리문이 성공했을 때
  
       res.status(200).send(defaultRes.successTrue(statusCode.OK, resMessage.BOARD_INSERT_SUCCESS));
    }
});


router.get('/badfood', (req, res) => {
    res.sendFile(__dirname + '/badfood.html')
});


router.get('/badnut', (req, res) => {
    res.sendFile(__dirname + '/badNut.html')
});
router.get('/goodFood', (req, res) => {
    res.sendFile(__dirname + '/goodFood.html')
});

module.exports = router;