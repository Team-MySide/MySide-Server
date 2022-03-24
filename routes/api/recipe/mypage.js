var express = require('express');
var router = express.Router();
const authUtil = require("../../../module/utils/authUtils");   // 토큰 있을 때 사용ßß

const defaultRes = require('../../../module/utils/utils');
const statusCode = require('../../../module/utils/statusCode');
const resMessage = require('../../../module/utils/responseMessage')
const db = require('../../../module/pool');


router.get('/save', authUtil.isLoggedin ,async (req, res) => {

    user_id = req.decoded.id

    const SelectQuery = 'select s.receipe_id, r.receipe_name, r.receipe_img, r.receipe_difficulty, r.receipe_time,u.name, u.cancerNm, u.progressNm from receipe_save as s, receipe as r, user as u where u.user_id = ? AND s.user_id = ? AND s.receipe_id = r.receipe_id ;'; 
    const SelectResult = await db.queryParam_Arr(SelectQuery, [user_id,req.decoded.id]);

    if(!SelectResult){
        res.status(200).send(defaultRes.successFalse(statusCode.DB_ERROR, resMessage.DB_ERROR));     // 마이페이지  조회 실패
    }else{
        res.status(200).send(defaultRes.successTrue(statusCode.OK, "내 리스트 조회 성공", SelectResult));      // 마이페이지  조회 성공
    }
});

router.get('/mine', authUtil.isLoggedin,async (req, res) => {

    user_id = req.decoded.id

    const SelectQuery = 'select r.receipe_name, r.receipe_img, r.receipe_difficulty, r.receipe_time,u.name, u.cancerNm, u.progressNm from receipe as r, user as u where u.user_id = ? AND r.user_id = ? ;'; 
    const SelectResult = await db.queryParam_Arr(SelectQuery, [user_id,req.decoded.id]);

    if(!SelectResult){
        res.status(200).send(defaultRes.successFalse(statusCode.DB_ERROR, resMessage.DB_ERROR));     // 마이페이지  조회 실패
    }else{
        res.status(200).send(defaultRes.successTrue(statusCode.OK, "내 리스트 조회 성공", SelectResult));      // 마이페이지  조회 성공
    }
});

module.exports = router;