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



    
});

// 레시피 유형 API (레시피 id 생성)
// type = 0: 글이미지 
// type = 1: 영상
router.post('/insert_type', async (req, res) => {

   receipe_type = req.body.receipe_type

    const InsertReceipeQuery = 
    'INSERT INTO receipe (user_id, receipe_type, receipe_fakesave) VALUES (?,?, 0)'

    const InsertReceipeResult = await db.queryParam_Arr(InsertReceipeQuery, [req.body.user_id, receipe_type]);
    console.log(InsertReceipeResult);
    receipe_id = InsertReceipeResult.insertId

    if (!InsertReceipeResult) { //DB에러
        res.status(200).send(defaultRes.successFalse(statusCode.INTERNAL_SERVER_ERROR, resMessage.DB_ERROR));        
    }
    else {//데이터베이스 연결 성공
            res.status(200).send(defaultRes.successTrue(statusCode.OK, "레시피 유형 입력 성공.", receipe_id));
    }
    
});


// 레시피 입력하기
router.post('/insert/:recipe_id', upload.array('img',31),async (req, res) => {

    // 2. 레시피 요리순서(글 이미지)
    receipe_list = req.body.receipe_list;
    const InsertCookStepQuery = 
    'INSERT INTO receipe_step (receipe_id, step_num, step_content, step_img, regiDate) VALUES (?,?,?,?,?)'

    for(var key in receipe_list){
        console.log(key, typeof receipe_list[key])
        data = JSON.parse(receipe_list[key])
        
        // console.log(typeof data)
        // console.log("receipe_list[key].step_num", data.step_num)

        if(req.files[key]){
            InsertReceipeResult2 = await db.queryParam_Arr(InsertCookStepQuery, [
                req.params.recipe_id,
                data.step_num,
                data.step_content,
                req.files[key].location,
                moment().format('YYYY-MM-DD HH:mm:ss'),
            ]);

        }else{
            InsertReceipeResult2 = await db.queryParam_Arr(InsertCookStepQuery, [
                req.params.recipe_id,
                data.step_num,
                data.step_content,
                '',
                moment().format('YYYY-MM-DD HH:mm:ss'),
            ]);
        }
    }

      console.log('InsertReceipeResult2', InsertReceipeResult2);
    // 2-2 요리 순서 (영상)
    link = req.body.link
    link_content = req.body.link_content

    const InsertReceipeStepQuery = 
    'UPDATE receipe SET link= ?, link_comment = ? WHERE receipe_id = ?'
    const InsertReceipeStepResult = await db.queryParam_Arr(InsertReceipeStepQuery, [link, link_content, req.params.recipe_id]);
    console.log(InsertReceipeStepResult);

    // 3. 재료입력
    ingredient_list = req.body.ingredient_list;

    insertIngredQuery = 'INSERT INTO receipe_ingredient' + '(receipe_id,ingredient_content, ingredient_type,  regidate)' + 'VALUES(?,?,?,?)' 

    for(var key in ingredient_list){
        console.log(key, typeof ingredient_list[key])
        data = JSON.parse(ingredient_list[key])

        console.log(typeof data)
        console.log("ingredient_list[key].ingredient_content", data.ingredient_content)

        InsertReceipeResult3 = await db.queryParam_Arr(insertIngredQuery, [
            req.params.recipe_id,
            data.ingredient_content,
            data.ingredient_type,
            moment().format('YYYY-MM-DD HH:mm:ss'),
        ]);
    }

    console.log('InsertReceipeResult3', InsertReceipeResult3);
    console.log('req.files.length ; ', req.files.length);
    lastnum = req.files.length-1
    // 4. 레시피 입력
    receipe_name = req.body.receipe_name
    receipe_content = req.body.receipe_content

    receipe_foodtype = req.body.receipe_foodtype
    receipe_difficulty =req.body.receipe_difficulty
    receipe_time = req.body.receipe_time
    receipe_volume = req.body.receipe_volume
    receipe_caution = req.body.receipe_caution
    receipe_fakesave = req.body.receipe_fakesave

    const InsertReceipeQuery = 
    'UPDATE receipe SET receipe_name=?, receipe_content=?, receipe_img=?,' + 
    ' receipe_foodtype=?, receipe_difficulty=?,receipe_time=?, receipe_volume=?, '+
    ' receipe_caution=?, receipe_mainfood=?,'+
    'receipe_fakesave=?, regiDate=? WHERE receipe_id = ?;'
   
    const InsertReceipeResult4 = await db.queryParam_Arr(InsertReceipeQuery, [receipe_name, receipe_content, req.files[lastnum].location, 
        receipe_foodtype, receipe_difficulty,receipe_time, receipe_volume, 
        receipe_caution,req.body.receipe_mainfood,
        receipe_fakesave, moment().format('YYYY-MM-DD HH:mm:ss'), req.params.recipe_id]);
    console.log(InsertReceipeResult4);
    
    //  5. 부재료 입력하기
  
    ingredient_content = req.body.ingredient_content;
 
    insertIngredQuery = 'INSERT INTO receipe_subingredient' + '(receipe_id, content,  regidate)' + 'VALUES(?,?,?)' 


    for(var key in ingredient_content){

        console.log("ingredient_content", ingredient_content[key])

        InsertReceipeResult5 = await db.queryParam_Arr(insertIngredQuery, [
            req.params.recipe_id,
            ingredient_content[key],
            moment().format('YYYY-MM-DD HH:mm:ss'),
        ]);    
    }

    console.log('InsertReceipeResult', InsertReceipeResult5);


     if (!(InsertReceipeResult2 && InsertReceipeResult3 && InsertReceipeResult4 && InsertReceipeResult5)) { //DB에러
         res.status(200).send(defaultRes.successFalse(statusCode.INTERNAL_SERVER_ERROR, resMessage.DB_ERROR));        
     }
     else {//데이터베이스 연결 성공
             res.status(200).send(defaultRes.successTrue(statusCode.OK, resMessage.RECIPE_INSERT ));
     }
     
 });


module.exports = router;