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




module.exports = router;