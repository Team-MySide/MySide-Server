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
        WishQuery = 'INSERT INTO wishlist VALUES (?, ?)'; 
        UpdateWishQuery = 'UPDATE food_thumbnail SET wishes + 1 WHERE food = ?'
    } else{ // 좋아요 X
        WishQuery = 'DELETE FROM wishlist WHERE user_id =? AND food =?'
        UpdateWishQuery = 'UPDATE food_thumbnail SET wishes -1 WHERE food = ?'
    } 
    
    const WishResult = await db.queryParam_Arr(WishQuery, [req.decoded.id,req.body.food]);
    const UpdateWishResult = await db.queryParam_Arr(UpdateWishQuery, [eq.body.food]);
    
    if(!WishResult){
        res.status(200).send(defaultRes.successFalse(statusCode.DB_ERROR, resMessage.DB_ERROR));    
    }else{
        res.status(200).send(defaultRes.successTrue(statusCode.OK, "찜 상태 변경 성공"));      
    }
});


router.get('/', authUtil.isLoggedin,async (req, res) => {

    const SelectCancerQuery = 'SELECT * FROM wishlist WHERE user_id = ?'; 
    const SelectCancerResult = await db.queryParam_Arr(SelectCancerQuery, [req.decoded.id]);

    if(!SelectCancerResult){
        res.status(200).send(defaultRes.successFalse(statusCode.DB_ERROR, resMessage.DB_ERROR));     // 마이페이지  조회 실패
    }else{
        res.status(200).send(defaultRes.successTrue(statusCode.OK, "내 리스트 조회 성공", SelectResult));      // 마이페이지  조회 성공
    }
});


module.exports = router;