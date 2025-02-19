var express = require('express');
var router = express.Router();

const authUtil = require("../../../module/utils/authUtils");   // 토큰 있을 때 사용ßß

const defaultRes = require('../../../module/utils/utils');
const statusCode = require('../../../module/utils/statusCode');
const resMessage = require('../../../module/utils/responseMessage');
const db = require('../../../module/pool');

router.get('/cancer/:cancer',async (req, res) => {
        let SelectQuery = 
        'SELECT food_id, name,img,category,cancerNm,background_color,foreground_color,wishes,views,likes,nutrition1 '
        + 'FROM food_thumbnail A, (SELECT food,cancerNm FROM cancer_food WHERE cancerNm = ? GROUP BY food) B '
        + 'WHERE A.name = B.food '
        + "AND A.img !=''"
        + 'AND cancerNm = ? '
    
        let SelectResult = await db.queryParam_Arr(SelectQuery,[req.params.cancer,req.params.cancer]);
    
        if(!SelectResult){
            res.status(200).send(defaultRes.successFalse(statusCode.DB_ERROR, resMessage.DB_ERROR));  
        }else{
            res.status(200).send(defaultRes.successTrue(statusCode.OK, "질병 랭킹별 추천음식 조회 성공", SelectResult));    
        }
 });

 router.get('/cancer/nutrition/:cancer',async (req, res) => {//보류
    let SelectQuery = 
    'SELECT food_id, name,img,category,cancerNm,background_color,foreground_color,wishes,views,likes,nutrition1 '
    + 'FROM food_thumbnail A, (SELECT food,cancerNm FROM cancer_food GROUP BY food) B '
    + 'WHERE A.name = B.food '
    + 'AND (nutrition1 IN (SELECT nutrition FROM cancer_nut_good WHERE cancer = ? ) '
    + 'OR nutrition2 IN (SELECT nutrition FROM cancer_nut_good WHERE cancer = ? ) '
    + 'OR nutrition3 IN (SELECT nutrition FROM cancer_nut_good WHERE cancer = ? ) '
    + 'OR nutrition4 IN (SELECT nutrition FROM cancer_nut_good WHERE cancer = ? )) '
    

    console.log(SelectQuery);
    let SelectResult = await db.queryParam_Arr(SelectQuery,[req.params.cancer,req.params.cancer,req.params.cancer,req.params.cancer]);

    if(!SelectResult){
        res.status(200).send(defaultRes.successFalse(statusCode.DB_ERROR, resMessage.DB_ERROR));  
    }else{
        res.status(200).send(defaultRes.successTrue(statusCode.OK, "좋은 성분이 풍부한 음식 조회 성공", SelectResult));    
    }
});

router.get('/food/:category/:tabIdx',async (req, res) => {

    let SelectRankQuery;
    let SelectQuery = 
    'SELECT food_id, name,img,category,cancerNm,background_color,foreground_color,wishes,views,likes,nutrition1 '
    + 'FROM food_thumbnail A, (SELECT food,cancerNm FROM cancer_food GROUP BY food)B '
    + 'WHERE A.name = B.food '
    + "AND A.img !=''"
    + 'AND category = ? '
    if(req.params.tabIdx == 0){//좋아요
       SelectRankQuery = SelectQuery + 'ORDER BY likes '
    }else{ // 추천순 
        SelectRankQuery = SelectQuery + 'ORDER BY regiDate '
    }

    let SelectRankResult = await db.queryParam_Arr(SelectRankQuery,req.params.category);

    if(!SelectRankResult){
        res.status(200).send(defaultRes.successFalse(statusCode.DB_ERROR, resMessage.DB_ERROR));  
    }else{
        res.status(200).send(defaultRes.successTrue(statusCode.OK, "음식 검색 조회 성공", SelectRankResult));    
    }

});


router.get('/food/:keyword',async (req, res) => {

    let SelectQuery = 
    'SELECT food_id, name,img,category,cancerNm,background_color,foreground_color,wishes,views,likes,nutrition1 '
    + 'FROM food_thumbnail A, (SELECT food,cancerNm FROM cancer_food GROUP BY food)B '
    + 'WHERE A.name = B.food '
    + "AND A.img !=''"
    + 'AND name LIKE ? '
   
    let likeKeyword = "%" +req.params.keyword +"%"
     
    let SelectResult = await db.queryParam_Arr(SelectQuery,likeKeyword);
  
    console.log(SelectQuery);
    if(!SelectResult){
        res.status(200).send(defaultRes.successFalse(statusCode.DB_ERROR, resMessage.DB_ERROR));  
    }else{
        res.status(200).send(defaultRes.successTrue(statusCode.OK, "음식 검색 조회 성공", SelectResult));    
    }

});
 

router.get('/total/:keyword', async (req, res) => {

    let nutrition ="";
    let SelectQuery = ""
    let SelectResult = "";
    try{
        //1. 영양성분인지 부터 확인
        const SelectNutQuery = 'SELECT name FROM nutrition WHERE name_kr = ?'; 
        const SelectNutResult = await db.queryParam_Arr(SelectNutQuery, [req.params.keyword]);
        
        if(SelectNutResult[0]){
        nutrition = SelectNutResult[0].name;

        SelectQuery = 
            `SELECT A.food_id,name,img,category,background_color,foreground_color,wishes,likes,B.cancerNm, '${nutrition}' AS nutrition, 'nutrition' AS flag FROM `
            + "( SELECT A.* FROM myside.food_thumbnail A , myside.food_detail B  WHERE A.name = B.name "
            +` AND ${nutrition}>0 ORDER BY ${nutrition} DESC ) A`
            +',cancer_food B WHERE A.name =B.food' 

        SelectResult = await db.queryParam_None(SelectQuery);
        console.log(SelectResult)

        }else{
            let SelectCancerQuery = 
            "SELECT food_id, name,img,category,cancerNm,background_color,foreground_color,wishes,views,likes,nutrition1 ,'cancer' AS flag "
            + 'FROM food_thumbnail A, cancer_food B '
            + 'WHERE A.name = B.food '
            + 'AND cancerNm = ? '
            + 'ORDER BY likes '
            let SelectCancerResult = await db.queryParam_Arr(SelectCancerQuery ,req.params.keyword);
            console.log(SelectCancerResult)
            let SelectFoodQuery = 
            "SELECT food_id, name,img,category,cancerNm,background_color,foreground_color,wishes,views,likes,nutrition1, 'food'AS flag "
            + 'FROM food_thumbnail A, cancer_food B '
            + 'WHERE A.name = B.food '
            + 'AND name = ?  '
            + 'ORDER BY likes '
            let SelectFoodResult = await db.queryParam_Arr(SelectFoodQuery ,req.params.keyword);
            console.log(SelectFoodResult)

            SelectResult = [
                ...SelectCancerResult,
                ...SelectFoodResult
            ];
        }
        res.status(200).send(defaultRes.successTrue(statusCode.OK, "통합 검색 성공",SelectResult));
    }catch(err){
        res.status(200).send(defaultRes.successFalse(statusCode.DB_ERROR, resMessage.DB_ERROR));  
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
    `SELECT A.food_id,name,img,category,background_color,foreground_color,wishes,likes,B.cancerNm, '${req.params.keyword}' AS nutrition,${nutrition} AS num FROM `
    +`( SELECT A.*,${nutrition} FROM myside.food_thumbnail A , myside.food_detail B  WHERE A.name = B.name `
    +` AND ${nutrition}>0 AND A.img !='' GROUP BY A.name  ) A`
    +',(SELECT food,cancerNm FROM cancer_food GROUP BY food)B  WHERE A.name =B.food ' 
    +` ORDER BY ${nutrition} DESC`
   

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
        res.status(200).send(defaultRes.successFalse(statusCode.DB_ERROR, resMessage.DB_ERROR));     
    }else{
        let resData= [];
        for(let i = 0;i<SelectResult.length;i++){
               resData.push(SelectResult[i].text);
        }
        res.status(200).send(defaultRes.successTrue(statusCode.OK, "최근 검색어 조회 성공", resData));     
    }
});

router.get('/popular', async (req, res) => {

    const PopularQuery = "SELECT name FROM food_thumbnail ORDER BY views desc LIMIT 4";
    const PopularReslut = await db.queryParam_None(PopularQuery);
    console.log(PopularReslut[0]['name'])
    return_data = []



    if(!PopularReslut){
        res.status(200).send(defaultRes.successFalse(statusCode.DB_ERROR, resMessage.DB_ERROR));    
    }else{
        for(let i = 0;i<PopularReslut.length;i++){
            return_data.push(PopularReslut[i]['name']);
        }
        console.log(return_data)
        res.status(200).send(defaultRes.successTrue(statusCode.OK, "인기검색어 top4 조회 성공", return_data)); 
    }

});

router.get('/suggest/keyword', async (req, res) => {

    resData =["비타민C", "베타카로틴", "마그네슘", "타우린", "비타민D"]
   res.status(200).send(defaultRes.successTrue(statusCode.OK, "추천검색어 조회 성공", resData));      

});

module.exports = router;