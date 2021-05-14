var express = require('express');
var router = express.Router();

const authUtil = require("../../../module/utils/authUtils");   // 토큰 있을 때 사용ßß

const defaultRes = require('../../../module/utils/utils');
const statusCode = require('../../../module/utils/statusCode');
const resMessage = require('../../../module/utils/responseMessage');
const db = require('../../../module/pool');

router.get('/cancer/:cancer',async (req, res) => {
        let SelectQuery = 
        'SELECT food_id, name,img,category,cancerNm,background_color,wishes,views,likes,nutrition1 '
        + 'FROM food_thumbnail A, cancer_food B '
        + 'WHERE A.name = B.food '
        + 'AND cancerNm = ? '
    
        let SelectResult = await db.queryParam_Arr(SelectQuery,req.params.cancer);
    
        if(!SelectResult){
            res.status(200).send(defaultRes.successFalse(statusCode.DB_ERROR, resMessage.DB_ERROR));  
        }else{
            res.status(200).send(defaultRes.successTrue(statusCode.OK, "위암에 좋은 랭킹별 추천음식 조회 성공", SelectRankResult));    
        }
 });

 router.get('/cancer/nutrition/:cancer',async (req, res) => {
    let SelectQuery = 
    'SELECT food_id, name,img,category,cancerNm,background_color,wishes,views,likes,nutrition1 '
    + 'FROM food_thumbnail A, cancer_food B '
    + 'WHERE A.name = B.food '
    + 'AND cancerNm = ? '

    let SelectResult = await db.queryParam_Arr(SelectQuery,req.params.cancer);

    if(!SelectResult){
        res.status(200).send(defaultRes.successFalse(statusCode.DB_ERROR, resMessage.DB_ERROR));  
    }else{
        res.status(200).send(defaultRes.successTrue(statusCode.OK, "위암에 좋은 성분이 풍부한 음식 조회 성공", SelectRankResult));    
    }
});
 

router.get('/nutrition/:keyword', async (req, res) => {

    const SelectNutQuery = 'SELECT name FROM nutrition WHERE name_kr = ?'; 
    const SelectNutResult = await db.queryParam_Arr(SelectNutQuery, [req.params.keyword]);
    
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