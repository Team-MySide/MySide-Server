var express = require('express');
var router = express.Router();

const crypto = require('crypto-promise');

const defaultRes = require('../../../module/utils/utils');
const statusCode = require('../../../module/utils/statusCode');
const resMessage = require('../../../module/utils/responseMessage')
const db = require('../../../module/pool');


router.get('/all', async (req, res) => {

    const MonthAllReceipeQuery = 'SELECT * FROM receipe WHERE MONTH(time) = MONTH(CURRENT_DATE()) AND YEAR(time) = YEAR(CURRENT_DATE()) ORDER BY receipe_likesum DESC'

    const MonthAllReceipeResult = await db.queryParam_Parse(MonthAllReceipeQuery);

    console.log(MonthAllReceipeResult);

    if (!MonthAllReceipeResult) { //DB에러
        res.status(200).send(defaultRes.successFalse(statusCode.DB_ERROR, resMessage.DB_ERROR));        
    }
    else {//데이터베이스 연결 성공
        if(MonthAllReceipeResult[0]==null){
            res.status(200).send(defaultRes.successFalse(statusCode.OK, "해당 레시피가 없습니다."));
        }
        else{
            res.status(200).send(defaultRes.successTrue(statusCode.OK, "레시피 조회 성공", MonthAllReceipeResult));
        }
    }
    
});

router.get('/top', async (req, res) => {

    const MonthTopReceipeQuery = 'SELECT * FROM receipe WHERE MONTH(time) = MONTH(CURRENT_DATE()) AND YEAR(time) = YEAR(CURRENT_DATE()) ORDER BY receipe_likesum DESC LIMIT 4'

    const MonthTopReceipeResult = await db.queryParam_Parse(MonthTopReceipeQuery);

    console.log(MonthTopReceipeResult);

    if (!MonthTopReceipeResult) { //DB에러
        res.status(200).send(defaultRes.successFalse(statusCode.DB_ERROR, resMessage.DB_ERROR));        
    }
    else {//데이터베이스 연결 성공
        if(MonthTopReceipeResult[0]==null){
            res.status(200).send(defaultRes.successFalse(statusCode.OK, "해당 레시피가 없습니다."));
        }
        else{
            res.status(200).send(defaultRes.successTrue(statusCode.OK, "레시피 조회 성공", MonthTopReceipeResult));
        }
    }
    
});


module.exports = router;