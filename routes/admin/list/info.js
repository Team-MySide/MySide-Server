var express = require('express');
var router = express.Router();

const upload = require('../../../config/multer');
var moment = require('moment');

const defaultRes = require("../../../module/utils/utils");
const statusCode = require("../../../module/utils/statusCode");
const resMessage = require("../../../module/utils/responseMessage");
const db = require("../../../module/pool");

router.get('/', (req, res) => {
    res.sendFile(__dirname + '/info.html')
});
router.get('/about', async (req, res) => {

    let resData ={
        name : "",
        title : "",
        category: "",
        link : "",
        background_color: "",
        nutrition1 : "",
        nutrition2 : "",
        nutrition3 : "",
        nutrition4 : "",
        efficacy: "",
        combination: "",
        select_tip : "",
        care: "",
        status : [],
        cancer : []
    }

    let selectThumbQuery = "SELECT name,title,category,background_color,link,nutrition1 ,nutrition2,nutrition3,nutrition4 FROM food_thumbnail WHERE name =?  "
    let selectThumbResult = await db.queryParam_Parse(selectThumbQuery,[req.query.food]);

    if(selectThumbResult[0] != null){
        resData.name = selectThumbResult[0].name;
        resData.title = selectThumbResult[0].title;
        resData.category = selectThumbResult[0].category;
        resData.link = selectThumbResult[0].link;
        resData.nutrition1 = selectThumbResult[0].nutrition1;
        resData.nutrition2 = selectThumbResult[0].nutrition2;
        resData.nutrition3 = selectThumbResult[0].nutrition3;
        resData.nutrition4 = selectThumbResult[0].nutrition4;
        resData.background_color = selectThumbResult[0].background_color;
    }

    let selectDetailQuery = "SELECT efficacy,combination,select_tip,care FROM food_detail WHERE name =?  Limit 1";
    let selectDetailResult = await db.queryParam_Parse(selectDetailQuery ,[req.query.food]);

    if(selectDetailResult[0] != null){
        resData.care = selectDetailResult[0].care;
        resData.efficacy = selectDetailResult[0].efficacy;
        resData.combination = selectDetailResult[0].combination;
        resData.select_tip = selectDetailResult[0].select_tip;
    }

    let selectStatusQuery = "SELECT status FROM food_detail WHERE name =?  ";
    let selectStatusResult = await db.queryParam_Parse(selectStatusQuery,[req.query.food]);

    if(selectStatusResult[0] != null){
        for(let i =0; i<selectStatusResult.length;i++){
            resData.status.push(selectStatusResult[i].status);
        }
    }
    let selectCancerQuery = "SELECT cancerNm,ref_site,ref_link FROM cancer_food WHERE food =? ";
    let selectCancerResult = await db.queryParam_Parse(selectCancerQuery,[req.query.food]);
    resData.cancer = selectCancerResult;

    console.log(resData);
    res.status(200).send(defaultRes.successTrue(statusCode.OK, "성공",resData));
});

router.post('/', async (req, res) => {
    const UpdateThumbQuery = 'UPDATE food_thumbnail SET title =?,category =?,link =?,nutrition1 =?,nutrition2 =?,nutrition3=?,nutrition4 = ?,background_color =?  WHERE name = ?'; 
    const UpdateThumbResult = await db.queryParam_Arr(UpdateThumbQuery , [req.body.title,req.body.category,req.body.link,req.body.nutrition1,req.body.nutrition2,req.body.nutrition3,req.body.nutrition4,req.body.background_color,req.body.name]);
    console.log(UpdateThumbResult);
    
    const UpdateDetailQuery = 'UPDATE food_detail SET efficacy =?, combination =? ,select_tip =?, care =? WHERE name = ?'; 
    const UpdateDetailResult = await db.queryParam_Arr(UpdateDetailQuery , [req.body.efficacy,req.body.combination,req.body.select_tip,req.body.care,req.body.name]);

    let DeleteCancerQuery =  'DELETE FROM cancer_food WHERE food = ?';
    let DeleteCancerResult = await db.queryParam_Parse(DeleteCancerQuery,  [req.body.name]);
    
    
    if(req.body.cancerNm){
        let insertCancerQuery =  'INSERT INTO cancer_food (cancerNm, food, ref_link, ref_site) VALUES (?,?,?,?)';
        if(Array.isArray(req.body.cancerNm)){
            for(let i = 0 ;i <req.body.cancerNm.length;i++){
                let insertCancerResult = await db.queryParam_Arr(insertCancerQuery, [req.body.cancerNm[i], req.body.name, req.body.ref_link[i],req.body.ref_site[i]]);
            }
        }else{
            let insertCancerResult = await db.queryParam_Arr(insertCancerQuery, [req.body.cancerNm, req.body.name, req.body.ref_link,req.body.ref_site]);
        }
    }

    res.sendFile(__dirname + '/list.html')
});



module.exports = router;