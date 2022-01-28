var express = require('express');
var router = express.Router();

const crypto = require('crypto-promise');
const jwtUtils = require('../../../module/jwt');

const defaultRes = require('../../../module/utils/utils');
const statusCode = require('../../../module/utils/statusCode');
const resMessage = require('../../../module/utils/responseMessage')
const db = require('../../../module/pool');
var moment = require('moment');
const upload = require('../../../config/multer');


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

/* 레시피 유형 API
    1. req.body = 유형, 사용자 id 
    2. 레시피 row 생성 = 유형, 사용자 id + 임시저장 값 0 

    임시저장 값 == 0 은 임시저장한뜻.
*/ 
router.post('/insert_type', async (req, res) => {

   receipe_type = req.body.receipe_type

    const InsertReceipeQuery = 
    'INSERT INTO receipe (user_id, receipe_type, receipe_fakesave) VALUES (?,?, 0)'

    const InsertReceipeResult = await db.queryParam_Arr(InsertReceipeQuery, [req.body.user_id, receipe_type]);
    console.log(InsertReceipeResult);

    if (!InsertReceipeResult) { //DB에러
        res.status(200).send(defaultRes.successFalse(statusCode.DB_ERROR, resMessage.DB_ERROR));        
    }
    else {//데이터베이스 연결 성공
            res.status(200).send(defaultRes.successTrue(statusCode.OK, "레시피 유형 입력 성공.", InsertReceipeResult));
    }
    
});


// 레시피 입력하기
router.post('/insert',upload.single('receipe_img'), async (req, res) => {

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

    const InsertReceipeQuery = 
    'UPDATE receipe SET receipe_name=?, receipe_content=?, receipe_img=?,' + 
    ' receipe_foodtype=?, receipe_difficulty=?,receipe_time=?, receipe_volume=?, '+
    ' receipe_caution=?, receipe_mainfood=?,'+
    'receipe_likesum=?,receipe_sharesum=?, receipe_savesum=?,receipe_commentsum =?,receipe_fakesave=?, regiDate=? WHERE receipe_id = ?;'
   
    const InsertReceipeResult = await db.queryParam_Arr(InsertReceipeQuery, [receipe_name, receipe_content, req.file.location, 
        receipe_foodtype, receipe_difficulty,receipe_time, receipe_volume, 
        receipe_caution,receipe_mainfood,
        receipe_likesum,receipe_sharesum, receipe_savesum,receipe_commentsum,receipe_fakesave, moment().format('YYYY-MM-DD HH:mm:ss'), req.body.receipe_id]);
    console.log(InsertReceipeResult);

    if (!InsertReceipeResult) { //DB에러
        res.status(200).send(defaultRes.successFalse(statusCode.DB_ERROR, resMessage.DB_ERROR));        
    }
    else {//데이터베이스 연결 성공
        res.status(200).send(defaultRes.successTrue(statusCode.OK, "레시피 입력 성공", InsertReceipeResult));
    }
    
});

router.post('/insert_subingre', async (req, res) => {

    ingredient_content = req.body.ingredient_content;

    insertIngredQuery = 'INSERT INTO receipe_subingredient' + '(receipe_id, content,  regidate)' + 'VALUES(?,?,?)' 


    for(var key in ingredient_content){

        console.log("ingredient_content", ingredient_content[key])

        InsertReceipeResult = await db.queryParam_Arr(insertIngredQuery, [
            req.body.receipe_id,
            ingredient_content[key],
            moment().format('YYYY-MM-DD HH:mm:ss'),
        ]);    
    }

    console.log('InsertReceipeResult', InsertReceipeResult);

    if (!InsertReceipeResult) { //DB에러
        res.status(200).send(defaultRes.successFalse(statusCode.DB_ERROR, resMessage.DB_ERROR));        
    }
    else {//데이터베이스 연결 성공
            res.status(200).send(defaultRes.successTrue(statusCode.OK, "레시피 이미지버전 요리순서 입력 성공.", InsertReceipeResult));
    }

});

module.exports = router;