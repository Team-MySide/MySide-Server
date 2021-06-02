var express = require('express');
var router = express.Router();

const authUtil = require("../../../module/utils/authUtils");   // 토큰 있을 때 사용ßß

const defaultRes = require('../../../module/utils/utils');
const statuscode = require('../../../module/utils/statusCode');
const resMessage = require('../../../module/utils/responseMessage');
const db = require('../../../module/pool');
const { Health } = require('aws-sdk');


router.get('/title', async(req, res) => {
    const checkfaqQurey = "SELECT category,title from faq";
    const checkfaqResult = await db.queryParam_None(checkfaqQurey)
    if (!checkfaqResult) { //DB에러
        res.status(200).send(defaultRes.successFalse(statuscode.DB_ERROR, resMessage.DB_ERROR));        
    }
    else {//DB연결 성공
        if(checkfaqResult[0]==null){ //작성한 건강 데이터가 없음 => 0으로 데이터 보냄
            res.status(200).send(defaultRes.successTrue(statuscode.OK, resMessage.FAQ_NULL, 0));

        }
        else{//건강 데이터 존재 => 데이터 값 전송
            res.status(200).send(defaultRes.successTrue(statuscode.OK, resMessage.FAQ_SUCCESS, checkfaqResult));
        }
    }
})
router.get('/title/:faq_id', async(req, res) => {
    const checkfaqQurey = "SELECT * from faq WHERE faq_id = ?";
    const checkfaqResult = await db.queryParam_Parse(checkfaqQurey, [req.params.faq_id])
    if (!checkfaqResult) { //DB에러
        res.status(200).send(defaultRes.successFalse(statuscode.DB_ERROR, resMessage.DB_ERROR));        
    }
    else {//DB연결 성공
        if(checkfaqResult[0]==null){ //작성한 건강 데이터가 없음 => 0으로 데이터 보냄
            res.status(200).send(defaultRes.successTrue(statuscode.OK, resMessage.FAQ_NULL, 0));

        }
        else{//건강 데이터 존재 => 데이터 값 전송
            res.status(200).send(defaultRes.successTrue(statuscode.OK, resMessage.FAQ_SUCCESS, checkfaqResult));
        }
    }
})
module.exports = router;