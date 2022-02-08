var express = require('express');
var router = express.Router();

const authUtil = require("../../../module/utils/authUtils");   // 토큰 있을 때 사용ßß

const defaultRes = require('../../../module/utils/utils');
const statuscode = require('../../../module/utils/statusCode');
const resMessage = require('../../../module/utils/responseMessage');
const db = require('../../../module/pool');
const { Health } = require('aws-sdk');
const { EXPRIED_TOKEN } = require('../../../module/utils/responseMessage');
router.put('/main', authUtil.isLoggedin, async (req, res) => {

  
    const likeQuery = 'SELECT * FROM receipe_comment_like WHERE user_id = ? AND comment_id = ?'
    const likeResult = await db.queryParam_Parse(likeQuery, [req.decoded.id, req.body.comment_id]);

    if(likeResult[0]==null){ //좋아요 x
        const likeInsertQuery = 'INSERT INTO receipe_comment_like (user_id, comment_id) VALUES (?, ?)'; 
        const likeInsertResult = await db.queryParam_Parse(likeInsertQuery, [req.decoded.id, req.body.comment_id]);

        const likeUpdateQuery = 'UPDATE receipe_comment SET likesum = likesum + 1 WHERE comment_id = ?'
        const likeUpdateResult = await db.queryParam_Parse(likeUpdateQuery, req.body.comment_id);

        if(!likeInsertResult || !likeUpdateResult){
            res.status(200).send(defaultRes.successFalse(statusCode.DB_ERROR, resMessage.DB_ERROR));    
        }else{
            res.status(200).send(defaultRes.successTrue(statusCode.OK, "좋아요 상태 변경 성공"));      
        }
    } else{ //좋아요 o
        const likeDeletetQuery = 'DELETE FROM receipe_comment_like WHERE user_id =? AND comment_id =?'
        const likeDeleteResult = await db.queryParam_Parse(likeDeletetQuery, [req.decoded.id, req.body.comment_id]);

        const likeUpdateQuery = 'UPDATE receipe_comment SET likesum = likesum - 1 WHERE comment_id = ?'
        const likeUpdateResult = await db.queryParam_Parse(likeUpdateQuery, req.body.comment_id);
        
        if(!likeDeleteResult || !likeUpdateResult){
            res.status(200).send(defaultRes.successFalse(statusCode.DB_ERROR, resMessage.DB_ERROR));    
        }else{
            res.status(200).send(defaultRes.successTrue(statusCode.OK, "좋아요 상태 변경 성공"));      
        }
    } 
});
router.put('/sub', authUtil.isLoggedin, async (req, res) => {
    const likeQuery = 'SELECT * FROM receipe_subcomment_like WHERE user_id = ? AND subcomment_id = ?'
    const likeResult = await db.queryParam_Parse(likeQuery, [req.decoded.id, req.body.comment_id]);

    if(likeResult[0]==null){ //좋아요 x
        const likeInsertQuery = 'INSERT INTO receipe_subcomment_like (user_id, subcomment_id) VALUES (?, ?)'; 
        const likeInsertResult = await db.queryParam_Parse(likeInsertQuery, [req.decoded.id, req.body.subcomment_id]);

        const likeUpdateQuery = 'UPDATE receipe_subcomment SET likesum = likesum + 1 WHERE subcomment_id = ?';
        const likeUpdateResult = await db.queryParam_Parse(likeUpdateQuery, req.body.subcomment_id);

        if(!likeInsertResult || !likeUpdateResult){
            res.status(200).send(defaultRes.successFalse(statusCode.DB_ERROR, resMessage.DB_ERROR));    
        }else{
            res.status(200).send(defaultRes.successTrue(statusCode.OK, "좋아요 상태 변경 성공"));      
        }
    } else{ //좋아요 o
        const likeDeletetQuery = 'DELETE FROM receipe_subcomment_like WHERE user_id =? AND subcomment_id =?'; 
        const likeDeleteResult = await db.queryParam_Parse(likeDeletetQuery, [req.decoded.id, req.body.subcomment_id]);

        const likeUpdateQuery = 'UPDATE receipe_subcomment SET likesum = likesum - 1 WHERE subcomment_id = ?'
        const likeUpdateResult = await db.queryParam_Parse(likeUpdateQuery, req.body.subcomment_id);

        if(!likeDeleteResult || !likeUpdateResult){
            res.status(200).send(defaultRes.successFalse(statusCode.DB_ERROR, resMessage.DB_ERROR));    
        }else{
            res.status(200).send(defaultRes.successTrue(statusCode.OK, "좋아요 상태 변경 성공"));      
        }
    }
});
module.exports = router;
