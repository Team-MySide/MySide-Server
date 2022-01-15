var express = require('express');
var router = express.Router();

const defaultRes = require('../../../module/utils/utils');
const statusCode = require('../../../module/utils/statusCode');
const resMessage = require('../../../module/utils/responseMessage')
const db = require('../../../module/pool');


router.get('/:receipe_id', async (req, res) => {

    receipe_id = req.params.receipe_id
    
    const MainfoodQuery = 'SELECT * FROM receipe_mainfood where receipe_id = ?'
    const MainfoodResult = await db.queryParam_Parse(MainfoodQuery, receipe_id);

    console.log(MainfoodResult);

    if (!MainfoodResult) { //DB에러
        res.status(200).send(defaultRes.successFalse(statusCode.DB_ERROR, resMessage.DB_ERROR));        
    }
    else {//데이터베이스 연결 성공
        if(MainfoodResult[0]==null){
            res.status(200).send(defaultRes.successFalse(statusCode.OK, "해당 레시피가 없습니다."));
        }
        else{
            res.status(200).send(defaultRes.successTrue(statusCode.OK, "레시피 조회 성공", MainfoodResult));
        }
    }
    
});

module.exports = router;