var express = require('express');
var router = express.Router();

const authUtil = require("../../../module/utils/authUtils");   // 토큰 있을 때 사용ßß
const defaultRes = require('../../../module/utils/utils');
const statusCode = require('../../../module/utils/statusCode');
const resMessage = require('../../../module/utils/responseMessage')
const db = require('../../../module/pool');
var moment = require('moment');

//  종류별 레시피
router.get('/foodtype/:recipe_foodtype/:tabIdx',async (req, res) => {

    let SelectQuery = 
    'SELECT ifnull(receipe_foodtype,"") receipe_foodtype, ifnull(receipe_id,"") receipe_id, '+
    'ifnull(receipe_name,"") as receipe_name, ifnull(receipe_img,"") as receipe_img, ifnull(receipe_difficulty,"") as receipe_difficulty,'+
    ' ifnull(receipe_time,"") as receipe_time, ifnull(receipe.user_id,"") as receipe_user_id, ifnull(user.name,"") as user_name, ifnull(user.cancerNm,"") as user_cancerNm, ifnull(user.stageNm,"") as user_stageNm,'+
    'ifnull(user.progressNm,"") as user_progressNm FROM receipe join user on receipe.user_id = user.user_id AND receipe_foodtype = ?'
    if(req.params.tabIdx == 0){//최신순
       SelectRankQuery = SelectQuery + 'ORDER BY regidate '
    }if(req.params.tabIdx == 1){//좋아요순
        SelectRankQuery = SelectQuery + 'ORDER BY receipe_likesum '
     }if(req.params.tabIdx == 2){//별점순
        SelectRankQuery = SelectQuery + 'ORDER BY receipe_savesum'
     }if(req.params.tabIdx == 3){//난이도순
        SelectRankQuery = SelectQuery + 'ORDER BY receipe_difficulty '
     }
    let SelectRankResult = await db.queryParam_Arr(SelectRankQuery,req.params.recipe_foodtype);

    if(!SelectRankResult){
        res.status(200).send(defaultRes.successFalse(statusCode.INTERNAL_SERVER_ERROR, resMessage.DB_ERROR));  
    }else{
        res.status(200).send(defaultRes.successTrue(statusCode.OK, "음식 검색 조회 성공", SelectRankResult));    
    }

});

// 질병별 레시피
router.get('/disease/:cancerNm/:tabIdx',async (req, res) => {

    let SelectQuery = 
    'SELECT ifnull(receipe_id,"") receipe_id, '+
    'ifnull(receipe_name,"") as receipe_name, ifnull(receipe_img,"") as receipe_img, ifnull(receipe_difficulty,"") as receipe_difficulty,'+
    ' ifnull(receipe_time,"") as receipe_time, ifnull(receipe.user_id,"") as receipe_user_id, ifnull(user.name,"") as user_name, ifnull(user.cancerNm,"") as user_cancerNm, ifnull(user.stageNm,"") as user_stageNm,'+
    'ifnull(user.progressNm,"") as user_progressNm FROM receipe join cancer_food on cancer_food.food = receipe.receipe_mainfood '+
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
