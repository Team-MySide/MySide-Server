var express = require('express');
var router = express.Router();

const authUtil = require("../../../module/utils/authUtils");   // 토큰 있을 때 사용ßß

const defaultRes = require('../../../module/utils/utils');
const statusCode = require('../../../module/utils/statusCode');
const resMessage = require('../../../module/utils/responseMessage');
const db = require('../../../module/pool');



//자동완성 
router.get('/food',async (req, res) => {
    const SelectQuery = 'SELECT food_id,name FROM food_thumbnail'; 
    const SelectResult = await db.queryParam_None(SelectQuery);
    resData =[];

    if(!SelectResult){
        res.status(200).send(defaultRes.successFalse(statusCode.DB_ERROR, resMessage.DB_ERROR));    
    }else{
        for(let i= 0;i<SelectResult.length;i++){
            resData.push(SelectResult[i].name);
        }
        res.status(200).send(defaultRes.successTrue(statusCode.OK, "음식 전체 조회 성공", resData));      
    }
});

//자동완성 
router.get('/nutrition',async (req, res) => {
    const SelectQuery = 'SELECT nutrition_id,name,name_kr FROM nutrition'; 
    const SelectResult = await db.queryParam_None(SelectQuery);
    resData =[];

    if(!SelectResult){
        res.status(200).send(defaultRes.successFalse(statusCode.DB_ERROR, resMessage.DB_ERROR));    
    }else{
        for(let i= 0;i<SelectResult.length;i++){
            resData.push(SelectResult[i].name_kr);
        }
        res.status(200).send(defaultRes.successTrue(statusCode.OK, "영양성분 전체 조회 성공", resData));      
    }
});

//자동완성 
router.get('/cancer',async (req, res) => {
    const SelectQuery = 'SELECT cancer_id,name FROM cancer'; 
    const SelectResult = await db.queryParam_None(SelectQuery);
    resData =[];

    if(!SelectResult){
        res.status(200).send(defaultRes.successFalse(statusCode.DB_ERROR, resMessage.DB_ERROR));    
    }else{
        for(let i= 0;i<SelectResult.length;i++){
            resData.push(SelectResult[i].name);
        }
        res.status(200).send(defaultRes.successTrue(statusCode.OK, "암 전체 조회 성공", resData));      
    }
});

//total
router.get('/total',async (req, res) => {
    resData =[];
    const SelectQuery1 = 'SELECT nutrition_id,name,name_kr FROM nutrition'; 
    const SelectResult1 = await db.queryParam_None(SelectQuery1);
    const SelectQuery2 = 'SELECT food_id,name FROM food_thumbnail'; 
    const SelectResult2 = await db.queryParam_None(SelectQuery2);
    const SelectQuery3 = 'SELECT cancer_id,name FROM cancer'; 
    const SelectResult3 = await db.queryParam_None(SelectQuery3);
    
    if(!SelectResult1||!SelectResult2||!SelectResult3){
        res.status(200).send(defaultRes.successFalse(statusCode.DB_ERROR, resMessage.DB_ERROR));    
    }else{
        for(let i= 0;i<SelectResult1.length;i++){
            resData.push(SelectResult1[i].name_kr);
        }
        for(let i= 0;i<SelectResult2.length;i++){
            resData.push(SelectResult2[i].name);
        }
        for(let i= 0;i<SelectResult3.length;i++){
            resData.push(SelectResult3[i].name);
        }
        res.status(200).send(defaultRes.successTrue(statusCode.OK, "토탈 데이터 조회 성공", resData));      
    }
});


module.exports = router;