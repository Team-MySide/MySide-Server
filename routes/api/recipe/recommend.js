var express = require('express');
var router = express.Router();

const authUtil = require("../../../module/utils/authUtils");   // 토큰 있을 때 사용ßß

const defaultRes = require('../../../module/utils/utils');
const statuscode = require('../../../module/utils/statusCode');
const resMessage = require('../../../module/utils/responseMessage');
const db = require('../../../module/pool');
const { Health } = require('aws-sdk');
const { EXPRIED_TOKEN } = require('../../../module/utils/responseMessage');

    router.get('/',authUtil.isLoggedin,async (req, res) => {
    
    const SelectCancerQuery = 'SELECT cancerNm FROM user WHERE user_id = ?'; 
    const SelectCancerResult = await db.queryParam_Arr(SelectCancerQuery, [req.decoded.id]);
    if(!SelectCancerResult){
        res.status(200).send(defaultRes.successFalse(statuscode.INTERNAL_SERVER_ERROR, resMessage.DB_ERROR));  
    }else{
    
        let cancerNm = SelectCancerResult[0].cancerNm;
        let SelectQuery =
        'SELECT receipe_id, receipe_name, receipe_img, receipe_difficulty, receipe_time, receipe.user_id,'+
        'user.name, user.cancerNm, user.stageNm,user.progressNm '+
        'FROM receipe join cancer_food on cancer_food.food = receipe.receipe_mainfood '+
        'join user on receipe.user_id = user.user_id WHERE cancer_food.cancerNm = ? '
        let SelectRankResult = await db.queryParam_Arr(SelectQuery, cancerNm);
        
        if(!SelectRankResult){
            res.status(200).send(defaultRes.successFalse(statuscode.INTERNAL_SERVER_ERROR, resMessage.DB_ERROR));  
        }else{
            if(SelectRankResult.length>5){                
                let randomResult = []
                while(randomResult.length < 5){
                    var movenum = SelectRankResult.splice(Math.floor(Math.random() * SelectRankResult.length),1)[0]
                    randomResult.push(movenum)
                }
                console.log(randomResult)
                res.status(200).send(defaultRes.successTrue(statuscode.OK, "암 종류별 추천 레시피 조회 성공", randomResult));    

            }
            else{
                res.status(200).send(defaultRes.successTrue(statuscode.OK, "암 종류별 추천 레시피 조회 성공", SelectRankResult));    
            }
        }
        
    }
    

});

module.exports = router;