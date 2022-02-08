var express = require('express');
var router = express.Router();

const authUtil = require("../../../module/utils/authUtils");   // 토큰 있을 때 사용ßß
const defaultRes = require('../../../module/utils/utils');
const statusCode = require('../../../module/utils/statusCode');
const resMessage = require('../../../module/utils/responseMessage')
const db = require('../../../module/pool');
var moment = require('moment');

router.post('/:receipe_id',async (req, res) => {

    receipe_list = req.body.receipe_list;

    insertIngredQuery = 'INSERT INTO receipe_ingredient' + '(receipe_id,ingredient_content, ingredient_type,  regidate)' + 'VALUES(?,?,?,?)' 

    for(var key in receipe_list){
        console.log(key, typeof receipe_list[key])
        data = JSON.parse(receipe_list[key])

        console.log(typeof data)
        console.log("receipe_list[key].ingredient_content", data.ingredient_content)

        InsertReceipeResult = await db.queryParam_Arr(insertIngredQuery, [
            req.params.receipe_id,
            data.ingredient_content,
            data.ingredient_type,
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
