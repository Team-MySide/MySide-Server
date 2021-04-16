var express = require('express');
var router = express.Router();

const defaultRes = require('../../module/utils/utils');
const statusCode = require('../../module/utils/statusCode');
const resMessage = require('../../module/utils/responseMessage');
const db = require('../../module/pool');

/* 아이디 찾기 
입력 : 닉네임 핸드폰번호
바로 팝업창으로 아이디(이메일)을 보여줌 
잘못된 입력 : "올바르지 않은 정보 입니다." 
*/
router.get('/id/:nickname/:number', async (req, res) => {
    const selectIdQuery = 'SELECT user_email FROM user WHERE user_nickname = ? AND user_number = ? '; 
    const selectIdResult = await db.queryParam_Arr(selectIdQuery, [req.params.nickname, req.params.number]);

    console.log(selectIdResult);
    if(!selectIdResult){
        res.status(200).send(defaultRes.successFalse(statusCode.DB_ERROR, resMessage.DB_ERROR));     // 회원정보 조회 실패
    }else{
        if(selectIdResult[0].user_email == null){   // user_email이 존재하지 않은 경우
            // 팝업창 띄워주기 
            res.status(200).send(defaultRes.successTrue(statusCode.OK, resMessage.NOT_CORRECT_INFO));      // 올바르지 않은 정보 입니다
        } else {    // user_email이 존재하는 경우
            res.status(200).send(defaultRes.successTrue(statusCode.OK, resMessage.FIND_USER_ID, selectIdResult));      // 아이디 찾기 성공 
        }
    }
});