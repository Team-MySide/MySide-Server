var express = require('express');
var router = express.Router();
const defaultRes = require('../../../module/utils/utils');
const statusCode = require('../../../module/utils/statusCode');
const resMessage = require('../../../module/utils/responseMessage')
const db = require('../../../module/pool');

const jwtUtils = require('../../../module/jwt');
const nodemailer = require('nodemailer');        // e-mail 보낼 때 사용

/* 아이디 찾기 
입력 : 이름 핸드폰번호
바로 팝업창으로 아이디(이메일)을 보여줌 
잘못된 입력 : "올바르지 않은 정보 입니다." 
*/
router.get('/id/:name/:phone', async (req, res) => {
    const selectIdQuery = 'SELECT email FROM user WHERE name = ? AND phone = ? '; 
    const selectIdResult = await db.queryParam_Arr(selectIdQuery, [req.params.name, req.params.phone]);

    let resData ={
        flag : 0,
        email : ""
    }
    console.log(selectIdResult);
    if(!selectIdResult){
        res.status(200).send(defaultRes.successFalse(statusCode.DB_ERROR, resMessage.DB_ERROR));     // 회원정보 조회 실패
    }else{
        if(!selectIdResult[0]){   // user_email이 존재하지 않은 경우
            resData.flag = 0;
            res.status(200).send(defaultRes.successFalse(statusCode.OK, resMessage.NOT_CORRECT_INFO,resData ));      // 올바르지 않은 정보 입니다
        } else {    // user_email이 존재하는 경우
            resData.flag = 1;
            resData.email =selectIdResult[0];
            res.status(200).send(defaultRes.successTrue(statusCode.OK, resMessage.FIND_USER_ID, resData));      // 아이디 찾기 성공 
        }
    }
});

module.exports = router;