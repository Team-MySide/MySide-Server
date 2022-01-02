var express = require('express');
var router = express.Router();

const crypto = require('crypto-promise');

const defaultRes = require('../../../module/utils/utils');
const statusCode = require('../../../module/utils/statusCode');
const resMessage = require('../../../module/utils/responseMessage')
const db = require('../../../module/pool');

const jwtUtils = require('../../../module/jwt');

// 레시피 보여주기 API
router.get('/list/:receipe_id', async (req, res) => {

    const selectReceipeQuery = 'SELECT * FROM receipe WHERE receipe_id = ?'

    const selectReceipeResult = await db.queryParam_Parse(selectReceipeQuery, req.params.receipe_id);

    console.log(selectReceipeResult);

    if (!selectReceipeResult) { //DB에러
        res.status(200).send(defaultRes.successFalse(statusCode.DB_ERROR, resMessage.DB_ERROR));        
    }
    else {//데이터베이스 연결 성공
        if(selectReceipeResult[0]==null){
            res.status(200).send(defaultRes.successFalse(statusCode.OK, "해당 레시피가 없습니다."));
        }
        else{
            res.status(200).send(defaultRes.successTrue(statusCode.OK, "레시피 조회 성공", selectReceipeResult));
        }
    }
    
});


// 레시피 입력하기
router.post('/insert', async (req, res) => {
    receipe_type = req.body.receipe_type
    receipe_name = req.body.receipe_name
    receipe_content = req.body.receipe_content
    receipe_img = req.body.receipe_img
    receipe_foodtype = req.body.receipe_foodtype
    receipe_difficulty =req.body.receipe_difficulty
    receipe_time = req.body.receipe_time
    receipe_volume = req.body.receipe_volume
    receipe_caution = req.body.receipe_caution
    receipe_likesum = req.body.receipe_likesum
    receipe_sharesum = req.body.receipe_sharesum
    receipe_savesum = req.body.receipe_savesum
    receipe_commentsum = req.body.receipe_commentsum
    receipe_fakesave = req.body.receipe_fakesave
    user_id = req.body.user_id
    // time = req.body
    time = new Date()
    console.log(time);
    const InsertReceipeQuery = 
    'INSERT INTO receipe (receipe_type, receipe_name, receipe_content, receipe_img, receipe_foodtype, receipe_difficulty,receipe_time, receipe_volume, receipe_caution,receipe_likesum,receipe_sharesum, receipe_savesum,receipe_commentsum,receipe_fakesave ,user_id, time) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)'

    const InsertReceipeResult = await db.queryParam_Arr(InsertReceipeQuery, [receipe_type, receipe_name, receipe_content, receipe_img, receipe_foodtype, receipe_difficulty,receipe_time, receipe_volume, receipe_caution,receipe_likesum,receipe_sharesum, receipe_savesum,receipe_commentsum,receipe_fakesave ,user_id, time]);
    console.log(InsertReceipeResult);

    if (!InsertReceipeResult) { //DB에러
        res.status(200).send(defaultRes.successFalse(statusCode.DB_ERROR, resMessage.DB_ERROR));        
    }
    else {//데이터베이스 연결 성공
        if(InsertReceipeResult[0]==null){
            res.status(200).send(defaultRes.successFalse(statusCode.OK, "입력하지 않은 항목이 있습니다."));
        }
        else{
            res.status(200).send(defaultRes.successTrue(statusCode.OK, "레시피 입력 성공"));
        }
    }
    
});

module.exports = router;