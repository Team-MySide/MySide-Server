var express = require('express');
var router = express.Router();

const authUtil = require("../../../module/utils/authUtils");   // 토큰 있을 때 사용ßß

const defaultRes = require('../../../module/utils/utils');
const statuscode = require('../../../module/utils/statusCode');
const resMessage = require('../../../module/utils/responseMessage');
const db = require('../../../module/pool');
const { Health } = require('aws-sdk');
const { EXPRIED_TOKEN } = require('../../../module/utils/responseMessage');

router.get('/recommendation', authUtil.isLoggedin,async (req, res) => {

    const SelectCancerQuery = 'SELECT cancerNm FROM user WHERE user_id = ?'; 
    const SelectCancerResult = await db.queryParam_Arr(SelectCancerQuery, [req.decoded.id]);

    if(!SelectCancerResult){
        res.status(200).send(defaultRes.successFalse(statusCode.DB_ERROR, resMessage.DB_ERROR));  
    }else{
        let cancerNm = SelectCancerResult[0].cancerNm;
        /*
        receipe_id, receipe_type, receipe_name, receipe_img, receipe_difficulty, receipe_time, user_id, nickname, cancerNm, stageNm, progressNm
        

        user_id, email, name, phone, password, relationCd, relationNm,  cancerCd, 
        stageCd,  progressCd,  gender, age, height, weight, disable_food, disease, 
        accessToken, refreshToken, salt


        */
        const SelectQuery = 
        
        'SELECT  receipe_id, receipe_type, receipe_name, receipe_img, receipe_difficulty, receipe_time, user_id, nickname, cancerNm, stageNm, progressNm'
        + 'FROM receipe A, user B '
        + 'WHERE A.user_id = B.user_id '
        + "AND img !=''"
        + 'AND B.cancerNm = ? '
        + 'LIMIT 5 '; 
        const SelectResult = await db.queryParam_Arr(SelectQuery, [cancerNm]);

        res.status(200).send(defaultRes.successTrue(statusCode.OK, "추천 음식 조회 성공", SelectResult));     
    }
});

router.get('/recommendation/all', authUtil.isLoggedin,async (req, res) => {

    const SelectCancerQuery = 'SELECT cancerNm FROM user WHERE user_id = ?'; 
    const SelectCancerResult = await db.queryParam_Arr(SelectCancerQuery, [req.decoded.id]);

    if(!SelectCancerResult){
        res.status(200).send(defaultRes.successFalse(statusCode.DB_ERROR, resMessage.DB_ERROR));  
    }else{
        let cancerNm = SelectCancerResult[0].cancerNm;
        /*
        receipe_id, receipe_type, receipe_name, receipe_img, receipe_difficulty, receipe_time, user_id, nickname, cancerNm, stageNm, progressNm
        

        user_id, email, name, phone, password, relationCd, relationNm,  cancerCd, 
        stageCd,  progressCd,  gender, age, height, weight, disable_food, disease, 
        accessToken, refreshToken, salt


        */
        const SelectQuery = 
        
        'SELECT  receipe_id, receipe_type, receipe_name, receipe_img, receipe_difficulty, receipe_time, user_id, nickname, cancerNm, stageNm, progressNm'
        + 'FROM receipe A, user B '
        + 'WHERE A.user_id = B.user_id '
        + "AND img !=''"
        + 'AND B.cancerNm = ? '; 
        const SelectResult = await db.queryParam_Arr(SelectQuery, [cancerNm]);

        res.status(200).send(defaultRes.successTrue(statusCode.OK, "추천 음식 조회 성공", SelectResult));     
    }
});
module.exports = router;