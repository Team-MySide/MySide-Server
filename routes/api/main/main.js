var express = require('express');
var router = express.Router();

const authUtil = require("../../../module/utils/authUtils");   // 토큰 있을 때 사용ßß

const defaultRes = require('../../../module/utils/utils');
const statusCode = require('../../../module/utils/statusCode');
const resMessage = require('../../../module/utils/responseMessage');
const db = require('../../../module/pool');

router.get('/recommendation', authUtil.isLoggedin,async (req, res) => {

    const SelectCancerQuery = 'SELECT cancerNm FROM user WHERE user_id = ?'; 
    const SelectCancerResult = await db.queryParam_Arr(SelectCancerQuery, [req.decoded.id]);

    if(!SelectCancerResult){
        res.status(200).send(defaultRes.successFalse(statusCode.DB_ERROR, resMessage.DB_ERROR));     // 마이페이지  조회 실패
    }else{
        let cancerNm = SelectCancerResult[0].cancerNm;
        const SelectQuery = 
        'SELECT food_id, name,img,category,cancerNm,background_color,wishes,views '
        + 'FROM food_thumbnail A, cancer_food B '
        + 'WHERE A.name = B.food '
        + 'AND B.cancerNm = ? '
        + 'LIMIT 5 '; 
        const SelectResult = await db.queryParam_Arr(SelectQuery, [cancerNm]);

        res.status(200).send(defaultRes.successTrue(statusCode.OK, "추천 음식 조회 성공", SelectResult));      // 마이페이지  조회 성공
    }
});


module.exports = router;