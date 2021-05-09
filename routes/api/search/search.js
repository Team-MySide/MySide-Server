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

 
    console.log(SelectCancerResult[0].cancerNm);
    if(!SelectCancerResult){
        res.status(200).send(defaultRes.successFalse(statusCode.DB_ERROR, resMessage.DB_ERROR));     // 마이페이지  조회 실패
    }else{
        res.status(200).send(defaultRes.successTrue(statusCode.OK, "마이페이지 조회 성공", SelectCancerResult[0]));      // 마이페이지  조회 성공
    }
});

router.get('/nutrition/:text', authUtil.checkLogin,async (req, res) => {
     
     let resData = {};
     if(req.decoded =='NL'){//비로그인 
        
     }else{
         
     }

    const SelectNutQuery = 'SELECT name FROM nutrition WHERE name_kr = ?'; 
    const SelectNutResult = await db.queryParam_Arr(SelectNutQuery, [req.params.text]);
    
    if(!SelectNutResult[0]){
        res.status(200).send(defaultRes.successFalse(statusCode.OK,"정확한 영양성분을 입력해 주세요" )); 
    }
    console.log(SelectNutResult)
    let nutrition = SelectNutResult[0].name;

    const SelectQuery = 
    `SELECT A.food_id,name,img,category,background_color,wishes,likes,B.cancerNm, '${nutrition}' AS nutrition FROM `
    + "( SELECT A.* FROM myside.food_thumbnail A , myside.food_detail B  WHERE A.name = B.name "
    +` AND ${nutrition}>0 ORDER BY ${nutrition} DESC ) A`
    +',cancer_food B WHERE A.name =B.food' 

    console.log(SelectQuery)

    const SelectResult = await db.queryParam_None(SelectQuery);

    if(!SelectResult){
        res.status(200).send(defaultRes.successFalse(statusCode.DB_ERROR, resMessage.DB_ERROR));    
    }else{
        res.status(200).send(defaultRes.successTrue(statusCode.OK, "영양성분 조회 성공", SelectResult)); 
    }
});



router.get('/recently', authUtil.isLoggedin,async (req, res) => {

    const SelectQuery = 'SELECT text FROM search_log WHERE user_id = ? LIMIT 10'; 
    const SelectResult = await db.queryParam_Arr(SelectQuery, [req.decoded.id]);
    console.log(SelectResult);

 
    if(!SelectResult){
        res.status(200).send(defaultRes.successFalse(statusCode.DB_ERROR, resMessage.DB_ERROR));     // 마이페이지  조회 실패
    }else{
        let resData= [];
        for(let i = 0;i<SelectResult.length;i++){
               resData.push(SelectResult[i].text);
        }
        res.status(200).send(defaultRes.successTrue(statusCode.OK, "최근 검색어 조회 성공", resData));      // 마이페이지  조회 성공
    }
});

module.exports = router;