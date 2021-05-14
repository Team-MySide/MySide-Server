var express = require('express');
var router = express.Router();

const authUtil = require("../../../module/utils/authUtils");   // 토큰 있을 때 사용ßß

const defaultRes = require('../../../module/utils/utils');
const statusCode = require('../../../module/utils/statusCode');
const resMessage = require('../../../module/utils/responseMessage');
const db = require('../../../module/pool');

router.get('/cancer/recommendation',async (req, res) => {
    
    let SelectCancerResult = [];
    const SelectQuery1 = 
        'SELECT food_id, name,img,category,cancerNm,background_color,wishes,views,likes,nutrition1 '
        + 'FROM food_thumbnail A, cancer_food B '
        + 'WHERE A.name = B.food '
        + "AND B.cancerNm = '위암' "
        + 'LIMIT 2 '; 
    const SelectResult1 = await db.queryParam_Arr(SelectQuery1);
    const SelectQuery2 = 
        'SELECT food_id, name,img,category,cancerNm,background_color,wishes,views,likes,nutrition1 '
        + 'FROM food_thumbnail A, cancer_food B '
        + 'WHERE A.name = B.food '
        + "AND B.cancerNm = '간암' "
        + 'LIMIT 2 '; 
    const SelectResult2 = await db.queryParam_Arr(SelectQuery2);
    const SelectQuery3 = 
        'SELECT food_id, name,img,category,cancerNm,background_color,wishes,views,likes,nutrition1 '
        + 'FROM food_thumbnail A, cancer_food B '
        + 'WHERE A.name = B.food '
        + "AND B.cancerNm = '대장암' "
        + 'LIMIT 2 '; 
    const SelectResult3 = await db.queryParam_Arr(SelectQuery3);
    const SelectQuery4 = 
        'SELECT food_id, name,img,category,cancerNm,background_color,wishes,views,likes,nutrition1 '
        + 'FROM food_thumbnail A, cancer_food B '
        + 'WHERE A.name = B.food '
        + "AND B.cancerNm = '폐암' "
        + 'LIMIT 2 '; 
    const SelectResult4 = await db.queryParam_Arr(SelectQuery4);
    const SelectQuery5 = 
        'SELECT food_id, name,img,category,cancerNm,background_color,wishes,views,likes,nutrition1 '
        + 'FROM food_thumbnail A, cancer_food B '
        + 'WHERE A.name = B.food '
        + "AND B.cancerNm = '유방암' "
        + 'LIMIT 2 '; 
    const SelectResult5 = await db.queryParam_Arr(SelectQuery5);
    const SelectQuery6 = 
        'SELECT food_id, name,img,category,cancerNm,background_color,wishes,views,likes,nutrition1 '
        + 'FROM food_thumbnail A, cancer_food B '
        + 'WHERE A.name = B.food '
        + "AND B.cancerNm = '갑상선암' "
        + 'LIMIT 2 '; 
    const SelectResult6 = await db.queryParam_Arr(SelectQuery6);

    SelectCancerResult.push(SelectResult1);
    SelectCancerResult.push(SelectResult2);
    SelectCancerResult.push(SelectResult3);
    SelectCancerResult.push(SelectResult4);
    SelectCancerResult.push(SelectResult5);
    SelectCancerResult.push(SelectResult6);
    if(!SelectCancerResult){
        res.status(200).send(defaultRes.successFalse(statusCode.DB_ERROR, resMessage.DB_ERROR));  
    }else{
        res.status(200).send(defaultRes.successTrue(statusCode.OK, "질병별 추천 음식 성공", SelectCancerResult));     
    }
});





module.exports = router;