var express = require('express');
var router = express.Router();

const authUtil = require("../../../module/utils/authUtils");   // 토큰 있을 때 사용ßß

const defaultRes = require('../../../module/utils/utils');
const statuscode = require('../../../module/utils/statusCode');
const resMessage = require('../../../module/utils/responseMessage');
const db = require('../../../module/pool');
const { Health } = require('aws-sdk');
const { EXPRIED_TOKEN } = require('../../../module/utils/responseMessage');
var moment = require('moment');
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
router.post('/main/write', authUtil.isLoggedin, async(req, res) => {
    const createCommentQuery = "INSERT INTO receipe_comment (receipe_id, user_id, comment_content, likesum, subcomment_sum, comment_time) VALUES(?,?,?,0,0,?)"
    const createCommentResult = await db.queryParam_Parse(createCommentQuery, [req.body.receipe_id, req.decoded.id, req.body.comment_content,moment().format('YYYY-MM-DD HH:mm:ss')]);
    if (!createCommentResult) { //DB에러
        res.status(200).send(defaultRes.successFalse(statuscode.INTERNAL_SERVER_ERROR, resMessage.DB_ERROR));        
    }
    else {//DB연결 성공
        const listUpdateQuery = "UPDATE receipe SET receipe_commentsum = receipe_commentsum + 1 WHERE receipe_id = ?";
        const listUpdateResult = await db.queryParam_Parse(listUpdateQuery, [req.body.receipe_id]);
        if (!listUpdateResult) { //DB에러
            res.status(200).send(defaultRes.successFalse(statuscode.INTERNAL_SERVER_ERROR, resMessage.DB_ERROR));        
        }
        else {//DB연결 성공
        console.log()
        res.status(200).send(defaultRes.successTrue(statuscode.OK, "댓글 입력 성공"));
        }
    }
})

//댓글 확인
router.get('/main/view/:receipe_id', authUtil.isLoggedin, async(req, res) => {
    var finalResult = [];
    var a = []
    const checkcommentQurey = "SELECT comment_id, receipe_id, comment_content, likesum, subcomment_sum, comment_time, nickname, cancerNm, stageNm, progressNm, relationNm from receipe_comment A, user B WHERE A.user_id = B.user_id AND receipe_id = ? ORDER BY comment_time DESC";
    const checkcommentResult = await db.queryParam_Parse(checkcommentQurey, req.params.receipe_id)
    if (!checkcommentResult) { //DB에러
        res.status(200).send(defaultRes.successFalse(statuscode.INTERNAL_SERVER_ERROR, resMessage.DB_ERROR));        
    }
    else {//DB연결 성공
        for (var i = 0; i < checkcommentResult.length; i++){
            const checkcommentlikeQurey = 'SELECT * FROM receipe_comment_like WHERE user_id = ? AND comment_id = ?';
            const checkcommentlikeResult = await db.queryParam_Parse(checkcommentlikeQurey, [req.decoded.id, checkcommentResult[i].comment_id])
            if (!checkcommentlikeResult) { //DB에러
                res.status(200).send(defaultRes.successFalse(statuscode.INTERNAL_SERVER_ERROR, resMessage.DB_ERROR)); 
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
        
            res.status(200).send(defaultRes.successTrue(statuscode.OK, "댓글 조회 성공", a));
    
    }

})

//댓글 수정
router.put('/main/update', authUtil.isLoggedin, async(req, res) => {
    const listUpdateQuery = "UPDATE receipe_comment SET comment_content = ? WHERE comment_id = ? AND user_id";
    const listUpdateResult = await db.queryParam_Parse(listUpdateQuery, [req.body.comment_content, req.body.comment_id, req.decoded.id]);
    if(!listUpdateResult){
        res.status(200).send(defaultRes.successFalse(statuscode.INTERNAL_SERVER_ERROR, resMessage.DB_ERROR));        
    }
    else{
        res.status(200).send(defaultRes.successTrue(statuscode.OK, "댓글 수정 성공"));
    }
        
}) 


//댓글 삭제
router.delete('/main/delete/:receipe_id/:comment_id', authUtil.isLoggedin, async(req, res) => {
    const listDeleteQuery = "DELETE FROM receipe_comment WHERE comment_id = ? AND user_id = ?";
    const listDeleteResult = await db.queryParam_Parse(listDeleteQuery, [req.params.comment_id, req.decoded.id]);
    if (!listDeleteResult) { //DB에러
        res.status(200).send(defaultRes.successFalse(statuscode.INTERNAL_SERVER_ERROR, resMessage.DB_ERROR));        
    }
    else {//뿌려준 데이터를 가지고 확인하는거니 데이터는 존재 =>삭제만 하면 됨
        const listUpdateQuery = "UPDATE receipe SET receipe_commentsum = receipe_commentsum - 1 WHERE receipe_id = ?";
        const listUpdateResult = await db.queryParam_Parse(listUpdateQuery, [req.params.receipe_id]);
        if (!listUpdateResult) { //DB에러
            res.status(200).send(defaultRes.successFalse(statuscode.INTERNAL_SERVER_ERROR, resMessage.DB_ERROR));        
        }
        else {//DB연결 성공
        res.status(200).send(defaultRes.successTrue(statuscode.OK, "댓글 삭제 성공"));
        }
    }
})

//레시피 확인
/*
receipe_id, receipe_type, receipe_name, receipe_content, receipe_img, receipe_foodtype, receipe_difficulty, 
receipe_time, receipe_volume, receipe_caution, receipe_mainfood, receipe_likesum, receipe_sharesum, receipe_savesum, 
receipe_commentsum, receipe_fakesave, user_id, regidate, link, link_comment

, email, name, phone, password, relationCd, relationNm, , cancerCd, , stageCd, , progressCd, 
, gender, age, height, weight, disable_food, disease, accessToken, refreshToken, salt

cancer_food_id, cancerNm, food, ref_link, ref_site

receipe_id, receipe_type, receipe_name, receipe_content, receipe_img, receipe_foodtype, receipe_difficulty, 
receipe_time, receipe_volume, receipe_caution, receipe_mainfood, receipe_likesum, receipe_sharesum, receipe_savesum, 
receipe_commentsum, receipe_fakesave, user_id, regidate, link, link_comment, nickname, cancerNm, stageNm, progressNm
*/
router.get('/main/receipe/view/:receipe_id', authUtil.isLoggedin, async(req, res) => {
    var finalResult = [];
    var a = []
    const checkcommentQurey = 
    'SELECT receipe_id, receipe_type, receipe_name, receipe_content, receipe_img, receipe_foodtype, receipe_difficulty, ' +
    'receipe_time, receipe_volume, receipe_caution, receipe_mainfood, receipe_likesum, receipe_sharesum, receipe_savesum, ' +
    'receipe_commentsum, receipe_fakesave, B.user_id, regidate, link, link_comment, nickname, cancerNm, stageNm, progressNm ' + 
    'from receipe A, user B ' +
    'WHERE A.user_id = B.user_id AND receipe_id = ? ';
    const checkcommentResult = await db.queryParam_Parse(checkcommentQurey, req.params.receipe_id)
    if (!checkcommentResult) { //DB에러
        res.status(200).send(defaultRes.successFalse(statuscode.INTERNAL_SERVER_ERROR, resMessage.DB_ERROR));        
    }
    else {//DB연결 성공
        
        const checkcommentlikeQurey = 'SELECT * FROM receipe_ingredient WHERE receipe_id = ?';
        const checkcommentlikeResult = await db.queryParam_Parse(checkcommentlikeQurey, req.params.receipe_id)

        if (!checkcommentlikeResult) { //DB에러
            res.status(200).send(defaultRes.successFalse(statuscode.INTERNAL_SERVER_ERROR, resMessage.DB_ERROR)); 
        }  
        else {
                const receipe_ingredient = {
                    "receipe_ingredient" : checkcommentlikeResult
                }
                   
                a.push(checkcommentResult)

                a.push(receipe_ingredient)
                /*
                food_id, name, img, title, foreground_color, category, background_color, link, nutrition1, 
                nutrition2, nutrition3, nutrition4, wishes, likes, views, comments, info_tag, info, info_link, regiDate

                cancer_food_id, cancerNm, food, ref_link, ref_site
                */
                const checkmainfoodQurey = 'SELECT food_id, name, img, background_color, nutrition1, nutrition2, nutrition3, nutrition4, cancer_food_id, cancerNm FROM food_thumbnail A,cancer_food B WHERE A.name = B.food AND food = ?';
                const checkmainfoodResult = await db.queryParam_Parse(checkmainfoodQurey, checkcommentResult[0].receipe_mainfood)
                if (!checkmainfoodResult) { //DB에러
                    res.status(200).send(defaultRes.successFalse(statuscode.INTERNAL_SERVER_ERROR, resMessage.DB_ERROR)); 
                }  
                else{
                    const mainfood = {
                        "mainfood" : checkmainfoodResult
                    }
                       
                    a.push(mainfood)
                    const checkstepQurey = 'SELECT step_id, receipe_id, step_num, step_content, step_img FROM receipe_step WHERE receipe_id = ?';
                    const checkstepResult = await db.queryParam_Parse(checkstepQurey, req.params.receipe_id)
                    if (!checkstepResult) { //DB에러
                        res.status(200).send(defaultRes.successFalse(statuscode.INTERNAL_SERVER_ERROR, resMessage.DB_ERROR)); 
                    }  
                    else{
                        const receipe_step = {
                            "step" : checkstepResult
                        }


                        a.push(receipe_step)
                        console.log(a)

                        res.status(200).send(defaultRes.successTrue(statuscode.OK, "댓글 조회 성공", a));
                    }
                }
                
            }       
    }

})
module.exports = router;