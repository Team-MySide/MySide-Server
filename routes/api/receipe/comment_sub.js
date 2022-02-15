var express = require('express');
var router = express.Router();

const authUtil = require("../../../module/utils/authUtils");   // 토큰 있을 때 사용ßß

const defaultRes = require('../../../module/utils/utils');
const statuscode = require('../../../module/utils/statusCode');
const resMessage = require('../../../module/utils/responseMessage');
const db = require('../../../module/pool');
const { Health } = require('aws-sdk');
/* 
댓글 파트
1. 원 댓글 작성 api
메소드 : Post
url : receipe/comment/main/write

2. 원 댓글 조회 api
메소드 : Get
url : receipe/comment/main
*/
//입력하기

router.post('/write', authUtil.isLoggedin, async(req, res) => {
    const createCommentQuery = "INSERT INTO receipe_subcomment (comment_id, receipe_id, user_id, content, likesum, create_time) VALUES(?,?,?,?,0,NOW())"
    const createCommentResult = await db.queryParam_Parse(createCommentQuery, [req.body.comment_id, req.body.receipe_id, req.decoded.id, req.body.content]);
    if (!createCommentResult) { //DB에러
        res.status(200).send(defaultRes.successFalse(statuscode.DB_ERROR, resMessage.DB_ERROR));        
    }
    else {//DB연결 성공
        const listUpdateQuery = "UPDATE receipe_comment SET subcomment_sum = subcomment_sum + 1 WHERE comment_id = ?";
        const listUpdateResult = await db.queryParam_Parse(listUpdateQuery, [req.body.comment_id]);
        if (!listUpdateResult) { //DB에러
            res.status(200).send(defaultRes.successFalse(statuscode.DB_ERROR, resMessage.DB_ERROR));        
        }
        else {//DB연결 성공
        res.status(200).send(defaultRes.successTrue(statuscode.OK, resMessage.HEALTHLIST_SELECT));
        }
    }
})
//댓글 확인
router.get('/view/:comment_id',authUtil.isLoggedin, async(req, res) => {
    var finalResult = [];
    var a = []
    const checkcommentQurey = "SELECT comment_id, receipe_id, content, likesum, create_time, nickname, cancerNm, stageNm, progressNm, relationNm from receipe_subcomment A, user B WHERE A.user_id = B.user_id AND comment_id = ? ORDER BY create_time DESC";
    const checkcommentResult = await db.queryParam_Parse(checkcommentQurey, req.params.comment_id)

    if (!checkcommentResult) { //DB에러
        res.status(200).send(defaultRes.successFalse(statuscode.DB_ERROR, resMessage.DB_ERROR));        
    }
    else {//DB연결 성공
        for (var i = 0; i < checkcommentResult.length; i++){
            const checkcommentlikeQurey = 'SELECT * FROM receipe_subcomment_like WHERE user_id = ? AND subcomment_id = ?';
            const checkcommentlikeResult = await db.queryParam_Parse(checkcommentlikeQurey, [req.decoded.id, checkcommentResult[i].comment_id])
            if (!checkcommentlikeResult) { //DB에러
                res.status(200).send(defaultRes.successFalse(statuscode.DB_ERROR, resMessage.DB_ERROR)); 
            }  
            else {
                if(checkcommentlikeResult[0]==null){
                    const like = {
                        "like_status" : false
                    }
                   
                    var finalResult = Object.assign(checkcommentResult[i],like);
                    a.push(finalResult)
                }
                else{
                    const like = {
                        "like_status" : true
                    }
                    var finalResult = Object.assign(checkcommentResult[i],like);
                    a.push(finalResult)
                }
            }     
        }
        res.status(200).send(defaultRes.successTrue(statuscode.OK, resMessage.HEALTHLIST_UPDATE, a));
    }

})

//댓글 수정
router.put('/update', authUtil.isLoggedin, async(req, res) => {
    const listUpdateQuery = "UPDATE receipe_subcomment SET content = ? WHERE subcomment_id = ?";
    const listUpdateResult = await db.queryParam_Parse(listUpdateQuery, [req.body.content, req.body.subcomment_id]);
    if(!listUpdateResult){
        res.status(200).send(defaultRes.successFalse(statuscode.DB_ERROR, resMessage.DB_ERROR));        
    }
    else{
        res.status(200).send(defaultRes.successTrue(statuscode.OK, resMessage.HEALTHLIST_UPDATE));
    }
        
}) 

//댓글 삭제
router.delete('/delete/:subcomment_id', authUtil.isLoggedin, async(req, res) => {
    const listDeleteQuery = "DELETE FROM receipe_subcomment WHERE subcomment_id = ? AND user_id = ?";
    const listDeleteResult = await db.queryParam_Parse(listDeleteQuery, [req.params.subcomment_id, req.decoded.id]);
    if (!listDeleteResult) { //DB에러
        res.status(200).send(defaultRes.successFalse(statuscode.DB_ERROR, resMessage.DB_ERROR));        
    }
    else {//뿌려준 데이터를 가지고 확인하는거니 데이터는 존재 =>삭제만 하면 됨
        const listUpdateQuery = "UPDATE receipe_comment SET subcomment_sum = subcomment_sum - 1 WHERE comment_id = ?";
        const listUpdateResult = await db.queryParam_Parse(listUpdateQuery, [req.body.comment_id]);
        if (!listUpdateResult) { //DB에러
            res.status(200).send(defaultRes.successFalse(statuscode.DB_ERROR, resMessage.DB_ERROR));        
        }
        else {//DB연결 성공
        res.status(200).send(defaultRes.successTrue(statuscode.OK, resMessage.HEALTHLIST_DELETE));
        }
    }
})

module.exports = router;