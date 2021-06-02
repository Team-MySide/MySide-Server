var express = require('express');
var router = express.Router();
const defaultRes = require('../../../module/utils/utils');
const statusCode = require('../../../module/utils/statusCode');
const resMessage = require('../../../module/utils/responseMessage')
const db = require('../../../module/pool');


router.get('/email/:email', async (req, res) => {
    const selectEmailQuery = 'SELECT email FROM user WHERE email = ?  '; 
    const selectEmailResult = await db.queryParam_Arr(selectEmailQuery, [req.params.email]);

    console.log(selectEmailResult);
    if(!selectEmailResult){
        res.status(200).send(defaultRes.successFalse(statusCode.DB_ERROR, resMessage.DB_ERROR));  
    }else{
        if(selectEmailResult[0]== null){  
            res.status(200).send(defaultRes.successTrue(statusCode.OK, "사용하실 수 있는 이메일입니다.",1));      
        } else {    
            res.status(200).send(defaultRes.successFalse(statusCode.OK, "동일한 이메일이 이미 등록되어 있습니다.",0));      
        }
    }
});

router.get('/nickname/:nickname', async (req, res) => {
    const selectNickQuery = 'SELECT * FROM user WHERE nickname = ?  '; 
    const selectNickResult = await db.queryParam_Arr(selectNickQuery, [req.params.nickname]);

    console.log(selectNickResult);
    if(!selectNickResult){
        res.status(200).send(defaultRes.successFalse(statusCode.DB_ERROR, resMessage.DB_ERROR));  
    }else{
        if(selectNickResult[0]== null){  
            res.status(200).send(defaultRes.successTrue(statusCode.OK, "사용하실 수 있는 닉네임입니다.",1));      
        } else {    
            res.status(200).send(defaultRes.successFalse(statusCode.OK, "동일한 닉네임이 이미 등록되어 있습니다.",0));      
        }
    }
});

module.exports = router;