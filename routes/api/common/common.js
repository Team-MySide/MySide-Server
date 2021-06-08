var express = require('express');
var router = express.Router();

const authUtil = require("../../../module/utils/authUtils");   // 토큰 있을 때 사용ßß

const defaultRes = require('../../../module/utils/utils');
const statusCode = require('../../../module/utils/statusCode');
const resMessage = require('../../../module/utils/responseMessage');
const db = require('../../../module/pool');



//자동완성 
router.get('/user/info',authUtil.isLoggedin,async (req, res) => {
    const SelectQuery = 'SELECT user_id,name,email,relationNm,nickname,cancerNm FROM user WHERE user_id = ?'; 
    const SelectResult = await db.queryParam_Parse(SelectQuery,req.decoded.id);
    resData =[];

    if(!SelectResult){
        res.status(200).send(defaultRes.successFalse(statusCode.DB_ERROR, resMessage.DB_ERROR));    
    }else{
        res.status(200).send(defaultRes.successTrue(statusCode.OK, "유저 정보 조회", SelectResult));      
    }
});




module.exports = router;