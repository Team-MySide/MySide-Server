var express = require('express');
var router = express.Router();

const crypto = require('crypto-promise');
const jwtUtils = require('../../../module/jwt');

const defaultRes = require('../../../module/utils/utils');
const statusCode = require('../../../module/utils/statusCode');
const resMessage = require('../../../module/utils/responseMessage')
const db = require('../../../module/pool');
var moment = require('moment');
// const upload = require('../../../config/multer');


// 레시피 보여주기 API
router.get('/list/:receipe_id', async (req, res) => {

    const Query = 'SELECT * FROM receipe WHERE receipe_id = ?'

    const Result = await db.queryParam_Parse(Query, req.params.receipe_id);
    const aaa = req.params.receipe_id

    const selectReceipeQuery ='select re.receipe_img, re.receipe_name, re.receipe_foodtype, re.receipe_difficulty, re.receipe_time, '
    +'re.receipe_volume, re.receipe_content, re.receipe_caution, re.receipe_likesum, re.receipe_sharesum, re.receipe_savesum, re.receipe_commentsum, re.link, re.link_comment, '
    +'u.name, u.cancerNm, u.progressNm '
    +'from receipe as re '
    +'left join user as u '
    +'on re.user_id = u.user_id '
    +'where re.receipe_id = ?'

    const a = 'select step_num, step_content, step_img '
    +'from receipe_step '
    +'where receipe_id = ?'
    var b = await db.queryParam_Arr(a, [req.params.receipe_id]);
    const food = 'select ingredient_content, ingredient_type, volume '
    +'from receipe_ingredient '
    +'where receipe_id = ?'
    var food_result = await db.queryParam_Arr(food, [req.params.receipe_id]);
    console.log(food_result[0].ingredient_content)
    const sub_food = 'select content, type, volume '
    +'from receipe_subingredient '
    +'where receipe_id = ?'
    var sub_food_result = await db.queryParam_Arr(sub_food, [req.params.receipe_id]);

    for (var i = 0; i < food_result.length; i++) {
        const bun = 'select cf.cancerNm, ft.nutrition1, ft.nutrition2, ft.nutrition3, ft.nutrition4, ft.wishes, ft.likes '
        +'from food_thumbnail as ft, cancer_food as cf '
        +'where ft.name = "'+food_result[i].ingredient_content+'" and cf.food = "'+food_result[i].ingredient_content+'"'
        var bunresult = await db.queryParam_Arr(bun, [req.params.receipe_id]);
        food_result[i]['sungbun'] = bunresult
        // console.log(food_result[i].ingredient_content)
    }

    for (var i = 0; i < sub_food_result.length; i++) {
        const sub_bun = 'select group_concat(cf.cancerNm) as cancerNm, ft.nutrition1, ft.nutrition2, ft.nutrition3, ft.nutrition4, ft.wishes, ft.likes '
        +'from food_thumbnail as ft, cancer_food as cf '
        +'where ft.name = "'+sub_food_result[i].content+'" and cf.food = "'+sub_food_result[i].content+'"'
        var sub_bunresult = await db.queryParam_Arr(sub_bun, [req.params.receipe_id]);
        sub_food_result[i]['sungbun'] = sub_bunresult
        // console.log(food_result[i].ingredient_content)
    }
    var aa = 'select receipe_id from receipe_ingredient where receipe_ingredient.ingredient_content = '+'"'+food_result[0].ingredient_content+'"'
    let bb = await db.queryParam_Arr(aa);

    console.log('@',bb[0])

    var step = []
    var sungbun = []
    var sub_sungbun = []
    var similar_arr = []
    var selectReceipeResult = await db.queryParam_Arr(selectReceipeQuery, [req.params.receipe_id]);
    console.log(1111);
    for (var i = 0; i < b.length; i++) {
        step.push(b[i])
    }
    selectReceipeResult[0]['step'] = step
    for (var i = 0; i < food_result.length; i++) {
        sungbun.push(food_result[i])
    }
    selectReceipeResult[0]['main_ingredient'] = sungbun

    for (var i = 0; i < sub_food_result.length; i++) {
        sub_sungbun.push(sub_food_result[i])
    }
    console.log('#',3=='3')
    for (var i = 0; i < bb.length; i++) {

        if (bb[i].receipe_id != req.params.receipe_id){
            similar_arr.push(bb[i].receipe_id)
        }
    }
    selectReceipeResult[0]['sub_ingredient'] = sub_sungbun

    let simular = 
    'SELECT ifnull(receipe_id,"") receipe_id, '+
    'ifnull(receipe_name,"") as receipe_name, ifnull(receipe_img,"") as receipe_img, ifnull(receipe_difficulty,"") as receipe_difficulty,'+
    ' ifnull(receipe_time,"") as receipe_time, ifnull(receipe.user_id,"") as receipe_user_id, ifnull(user.name,"") as user_name, ifnull(user.cancerNm,"") as user_cancerNm, ifnull(user.stageNm,"") as user_stageNm,'+
    'ifnull(user.progressNm,"") as user_progressNm FROM receipe join user on receipe.user_id = user.user_id '
    +'where receipe.receipe_id IN ('+similar_arr+')'
    let selectSimilarResult = await db.queryParam_Arr(simular);
    selectReceipeResult[0]['similar_recipe'] = selectSimilarResult


    if (!selectReceipeResult) { //DB에러
        res.status(200).send(defaultRes.successFalse(statusCode.DB_ERROR, resMessage.DB_ERROR));        
    }
    else {//데이터베이스 연결 성공
        if(selectReceipeResult[0]==null){
            res.status(200).send(defaultRes.successFalse(statusCode.OK, "해당 레시피가 없습니다."));
        }
        else{
            res.status(200).send(defaultRes.successTrue(statusCode.OK, "레시피 조회 성공", selectReceipeResult));
        }
    }
    
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