var express = require('express');
var router = express.Router();

const authUtil = require("../../../module/utils/authUtils");   // 토큰 있을 때 사용ßß

const defaultRes = require('../../../module/utils/utils');
const statusCode = require('../../../module/utils/statusCode');
const resMessage = require('../../../module/utils/responseMessage');
const db = require('../../../module/pool');


//마이페이지 상단
router.get('/', authUtil.isLoggedin, async (req, res) => {
    const MypageSelectQuery = 'SELECT nickname,name,stageNm,progressNM,cancerNm,disease FROM user WHERE user_id = ?'; 
    const MypageSelectResult = await db.queryParam_Arr(MypageSelectQuery, [req.decoded.id]);

    console.log(req.decoded);
    console.log(MypageSelectResult);
    if(!MypageSelectQuery){
        res.status(200).send(defaultRes.successFalse(statusCode.DB_ERROR, resMessage.DB_ERROR));     // 회원정보 조회 실패
    }else{
        res.status(200).send(defaultRes.successTrue(statusCode.OK, resMessage.SUCCESS_USER_LIST, MypageSelectResult[0]));      // 회원정보 조회 성공
    }
});

//프로필 조회
router.get('/profile', authUtil.isLoggedin, async (req, res) => {
    const MypageSelectQuery = 'SELECT nickname,name,stageNm,progressNM,cancerNm,disease FROM user WHERE user_id = ?'; 
    const MypageSelectResult = await db.queryParam_Arr(MypageSelectQuery, [req.decoded.id]);

    if(!MypageSelectQuery){
        res.status(200).send(defaultRes.successFalse(statusCode.DB_ERROR, resMessage.DB_ERROR));     // 회원정보 조회 실패
    }else{
        res.status(200).send(defaultRes.successTrue(statusCode.OK, resMessage.SUCCESS_USER_LIST, modifySelectResult));      // 회원정보 조회 성공
    }
});

//프로필 수정
router.put('/profile', authUtil.isLoggedin, async (req, res) => {
    const MypageSelectQuery = 'SELECT nickname,name,stageNm,progressNM,cancerNm,disease FROM user WHERE user_id = ?'; 
    const MypageSelectResult = await db.queryParam_Arr(MypageSelectQuery, [req.decoded.id]);

    if(!MypageSelectQuery){
        res.status(200).send(defaultRes.successFalse(statusCode.DB_ERROR, resMessage.DB_ERROR));     // 회원정보 조회 실패
    }else{
        res.status(200).send(defaultRes.successTrue(statusCode.OK, resMessage.SUCCESS_USER_LIST, modifySelectResult));      // 회원정보 조회 성공
    }
});

//건강데이터 목록 조회
router.get('/health', authUtil.isLoggedin, async (req, res) => {
    const MypageSelectQuery = 'SELECT nickname,name,stageNm,progressNM,cancerNm,disease FROM user WHERE user_id = ?'; 
    const MypageSelectResult = await db.queryParam_Arr(MypageSelectQuery, [req.decoded.id]);

    if(!MypageSelectQuery){
        res.status(200).send(defaultRes.successFalse(statusCode.DB_ERROR, resMessage.DB_ERROR));     // 회원정보 조회 실패
    }else{
        res.status(200).send(defaultRes.successTrue(statusCode.OK, resMessage.SUCCESS_USER_LIST, modifySelectResult));      // 회원정보 조회 성공
    }
});

//건강데이터 입력
router.post('/health', authUtil.isLoggedin, async (req, res) => {
    const MypageSelectQuery = 'SELECT nickname,name,stageNm,progressNM,cancerNm,disease FROM user WHERE user_id = ?'; 
    const MypageSelectResult = await db.queryParam_Arr(MypageSelectQuery, [req.decoded.id]);

    if(!MypageSelectQuery){
        res.status(200).send(defaultRes.successFalse(statusCode.DB_ERROR, resMessage.DB_ERROR));     // 회원정보 조회 실패
    }else{
        res.status(200).send(defaultRes.successTrue(statusCode.OK, resMessage.SUCCESS_USER_LIST, modifySelectResult));      // 회원정보 조회 성공
    }
});
//건강데이터 상세
router.get('/profile', authUtil.isLoggedin, async (req, res) => {
    const MypageSelectQuery = 'SELECT nickname,name,stageNm,progressNM,cancerNm,disease FROM user WHERE user_id = ?'; 
    const MypageSelectResult = await db.queryParam_Arr(MypageSelectQuery, [req.decoded.id]);

    if(!MypageSelectQuery){
        res.status(200).send(defaultRes.successFalse(statusCode.DB_ERROR, resMessage.DB_ERROR));     // 회원정보 조회 실패
    }else{
        res.status(200).send(defaultRes.successTrue(statusCode.OK, resMessage.SUCCESS_USER_LIST, modifySelectResult));      // 회원정보 조회 성공
    }
});



module.exports = router;