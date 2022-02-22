var express = require('express');
var router = express.Router();

const authUtil = require("../../../module/utils/authUtils");   // 토큰 있을 때 사용ßß
const defaultRes = require('../../../module/utils/utils');
const statusCode = require('../../../module/utils/statusCode');
const resMessage = require('../../../module/utils/responseMessage')
const db = require('../../../module/pool');
var moment = require('moment');

//  종류별 레시피
router.get('/kinds/:receipe_foodtype/:tabIdx',async (req, res) => {

    let SelectQuery = 
    'SELECT receipe_foodtype, receipe_id, receipe_name, receipe_img, receipe_difficulty, receipe_time, receipe.user_id, user.name, user.cancerNm, user.stageNm,'+
    'user.progressNm FROM receipe join user on receipe.user_id = user.user_id AND receipe_foodtype = ?'
    if(req.params.tabIdx == 0){//최신순
       SelectRankQuery = SelectQuery + 'ORDER BY regidate '
    }if(req.params.tabIdx == 1){//좋아요순
        SelectRankQuery = SelectQuery + 'ORDER BY receipe_likesum '
     }if(req.params.tabIdx == 2){//별점순
        SelectRankQuery = SelectQuery + 'ORDER BY receipe_savesum'
     }if(req.params.tabIdx == 3){//난이도순
        SelectRankQuery = SelectQuery + 'ORDER BY receipe_difficulty '
     }
    let SelectRankResult = await db.queryParam_Arr(SelectRankQuery,req.params.receipe_foodtype);

    if(!SelectRankResult){
        res.status(200).send(defaultRes.successFalse(statusCode.INTERNAL_SERVER_ERROR, resMessage.DB_ERROR));  
    }else{
        res.status(200).send(defaultRes.successTrue(statusCode.OK, "음식 검색 조회 성공", SelectRankResult));    
    }

});

// 질병별 레시피
router.get('/kindscancer/:cancerNm/:tabIdx',async (req, res) => {

    let SelectQuery = 
    'SELECT receipe_id, receipe_name, receipe_img, receipe_difficulty, receipe_time, receipe.user_id,'+
    'user.name, user.cancerNm, user.stageNm,user.progressNm '+
    'FROM receipe join cancer_food on cancer_food.food = receipe.receipe_mainfood '+
    'join user on receipe.user_id = user.user_id WHERE cancer_food.cancerNm = ?'
    if(req.params.tabIdx == 0){//최신순
       SelectRankQuery = SelectQuery + 'ORDER BY regidate '
    }if(req.params.tabIdx == 1){//좋아요순
        SelectRankQuery = SelectQuery + 'ORDER BY receipe_likesum '
     }if(req.params.tabIdx == 2){//별점순
        SelectRankQuery = SelectQuery + 'ORDER BY receipe_savesum'
     }if(req.params.tabIdx == 3){//난이도순
        SelectRankQuery = SelectQuery + 'ORDER BY receipe_difficulty '
     }
    let SelectRankResult = await db.queryParam_Arr(SelectRankQuery,req.params.cancerNm);

    if(!SelectRankResult){
        res.status(200).send(defaultRes.successFalse(statusCode.INTERNAL_SERVER_ERROR, resMessage.DB_ERROR));  
    }else{
        res.status(200).send(defaultRes.successTrue(statusCode.OK, "음식 검색 조회 성공", SelectRankResult));    
    }

});

module.exports = router;