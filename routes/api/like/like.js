<<<<<<< HEAD
var express = require('express');
var router = express.Router();

const authUtil = require("../../../module/utils/authUtils");   // 토큰 있을 때 사용ßß

const defaultRes = require('../../../module/utils/utils');
const statusCode = require('../../../module/utils/statusCode');
const resMessage = require('../../../module/utils/responseMessage');
const db = require('../../../module/pool');

router.put('/', authUtil.isLoggedin,async (req, res) => {

    let WishQuery;
    let UpdateWishQuery;
 

    if(req.body.status==1){ // 좋아요 O
        WishQuery = 'INSERT INTO likelist (user_id,food) VALUES (?, ?)'; 
        UpdateWishQuery = 'UPDATE food_thumbnail SET likes + 1 WHERE food = ?'
    } else{ // 좋아요 X
        WishQuery = 'DELETE FROM likelist WHERE user_id =? AND food =?'
        UpdateWishQuery = 'UPDATE food_thumbnail SET likes -1 WHERE food = ?'
    } 
    
    const WishResult = await db.queryParam_Arr(WishQuery, [req.decoded.id,req.body.food]);
    const UpdateWishResult = await db.queryParam_Arr(UpdateWishQuery, [req.body.food]);
    
    if(!WishResult){
        res.status(200).send(defaultRes.successFalse(statusCode.DB_ERROR, resMessage.DB_ERROR));    
    }else{
        res.status(200).send(defaultRes.successTrue(statusCode.OK, "좋아요 상태 변경 성공"));      
    }
});


router.get('/list', authUtil.isLoggedin,async (req, res) => {

    const SelectQuery = 'SELECT * FROM likelist WHERE user_id = ?'; 
    const SelectResult = await db.queryParam_Arr(SelectQuery, [req.decoded.id]);

    if(!SelectResult){
        res.status(200).send(defaultRes.successFalse(statusCode.DB_ERROR, resMessage.DB_ERROR));     // 마이페이지  조회 실패
    }else{
        res.status(200).send(defaultRes.successTrue(statusCode.OK, "내 리스트 조회 성공", SelectResult));      // 마이페이지  조회 성공
    }
});


=======
var express = require('express');
var router = express.Router();

const authUtil = require("../../../module/utils/authUtils");   // 토큰 있을 때 사용ßß

const defaultRes = require('../../../module/utils/utils');
const statusCode = require('../../../module/utils/statusCode');
const resMessage = require('../../../module/utils/responseMessage');
const db = require('../../../module/pool');

router.put('/', authUtil.isLoggedin,async (req, res) => {

    let WishQuery;
    let UpdateWishQuery;
 

    if(req.body.status==1){ // 좋아요 O
        WishQuery = 'INSERT INTO likelist (user_id,food) VALUES (?, ?)'; 
        UpdateWishQuery = 'UPDATE food_thumbnail SET likes + 1 WHERE food = ?'
    } else{ // 좋아요 X
        WishQuery = 'DELETE FROM likelist WHERE user_id =? AND food =?'
        UpdateWishQuery = 'UPDATE food_thumbnail SET likes -1 WHERE food = ?'
    } 
    
    const WishResult = await db.queryParam_Arr(WishQuery, [req.decoded.id,req.body.food]);
    const UpdateWishResult = await db.queryParam_Arr(UpdateWishQuery, [req.body.food]);
    
    if(!WishResult){
        res.status(200).send(defaultRes.successFalse(statusCode.DB_ERROR, resMessage.DB_ERROR));    
    }else{
        res.status(200).send(defaultRes.successTrue(statusCode.OK, "좋아요 상태 변경 성공"));      
    }
});


router.get('/list', authUtil.isLoggedin,async (req, res) => {

    const SelectQuery = 'SELECT * FROM likelist WHERE user_id = ?'; 
    const SelectResult = await db.queryParam_Arr(SelectQuery, [req.decoded.id]);

    if(!SelectResult){
        res.status(200).send(defaultRes.successFalse(statusCode.DB_ERROR, resMessage.DB_ERROR));     // 마이페이지  조회 실패
    }else{
        res.status(200).send(defaultRes.successTrue(statusCode.OK, "내 리스트 조회 성공", SelectResult));      // 마이페이지  조회 성공
    }
});


>>>>>>> 5fe080a8889eb343eca8528bd7e1b1cd7ec9e8d8
module.exports = router;