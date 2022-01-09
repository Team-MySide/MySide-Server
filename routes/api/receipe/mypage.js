var express = require('express');
var router = express.Router();

const crypto = require('crypto-promise');

const defaultRes = require('../../../module/utils/utils');
const statusCode = require('../../../module/utils/statusCode');
const resMessage = require('../../../module/utils/responseMessage')
const db = require('../../../module/pool');


router.get('/save/:user_id',async (req, res) => {

    user_id = req.params.user_id

    const SelectQuery = 'SELECT * FROM receipe_save WHERE user_id = ?'; 
    const SelectResult = await db.queryParam_Arr(SelectQuery, [user_id]);

    if(!SelectResult){
        res.status(200).send(defaultRes.successFalse(statusCode.DB_ERROR, resMessage.DB_ERROR));     // 마이페이지  조회 실패
    }else{
        res.status(200).send(defaultRes.successTrue(statusCode.OK, "내 리스트 조회 성공", SelectResult));      // 마이페이지  조회 성공
    }
});

router.get('/mine/:user_id',async (req, res) => {

    user_id = req.params.user_id

    const SelectQuery = 'SELECT * FROM receipe WHERE user_id = ?'; 
    const SelectResult = await db.queryParam_Arr(SelectQuery, [user_id]);

    if(!SelectResult){
        res.status(200).send(defaultRes.successFalse(statusCode.DB_ERROR, resMessage.DB_ERROR));     // 마이페이지  조회 실패
    }else{
        res.status(200).send(defaultRes.successTrue(statusCode.OK, "내 리스트 조회 성공", SelectResult));      // 마이페이지  조회 성공
    }
});

module.exports = router;