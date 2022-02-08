var express = require('express');
var router = express.Router();

const crypto = require('crypto-promise');

const defaultRes = require('../../../module/utils/utils');
const statusCode = require('../../../module/utils/statusCode');
const resMessage = require('../../../module/utils/responseMessage')
const db = require('../../../module/pool');

const jwtUtils = require('../../../module/jwt');

const upload = require('../../../config/multer');
var moment = require('moment');

// 레시피 순서 입력 - 글이미지
router.post('/img/:receipe_id', upload.array('step_img',30), async (req, res) => {
    receipe_list = req.body.receipe_list;

    // console.log("req.body", req.body)
    // console.log("req.files", req.files)
    console.log("receipe_list", typeof receipe_list)
    console.log("receipe_list[0]", receipe_list[0])
    console.log("receipe_list[key].step_num", receipe_list[0].step_num)

    // 지금 이미지 없을 때가 안들어간다. 

    const InsertReceipeQuery = 
    'INSERT INTO receipe_step (receipe_id, step_num, step_content, step_img, regiDate) VALUES (?,?,?,?,?)'

    for(var key in receipe_list){
        console.log(key, typeof receipe_list[key])
        data = JSON.parse(receipe_list[key])
        
        // console.log(typeof data)
        // console.log("receipe_list[key].step_num", data.step_num)

        if(req.files[key]){
            InsertReceipeResult = await db.queryParam_Arr(InsertReceipeQuery, [
                req.params.receipe_id,
                data.step_num,
                data.step_content,
                req.files[key].location,
                moment().format('YYYY-MM-DD HH:mm:ss'),
            ]);

        }else{
            InsertReceipeResult = await db.queryParam_Arr(InsertReceipeQuery, [
                req.body.receipe_id,
                data.step_num,
                data.step_content,
                '',
                moment().format('YYYY-MM-DD HH:mm:ss'),
            ]);
        }
    }

      console.log('InsertReceipeResult', InsertReceipeResult);
 
    if (!InsertReceipeResult) { //DB에러
        res.status(200).send(defaultRes.successFalse(statusCode.DB_ERROR, resMessage.DB_ERROR));        
    }
    else {//데이터베이스 연결 성공
            res.status(200).send(defaultRes.successTrue(statusCode.OK, "레시피 요리순서 입력 성공 - 글이미지.", InsertReceipeResult));
    }
    
});
// 레시피 순서 입력 - 영상
router.post('/video/:receipe_id', async (req, res) => {
    link = req.body.link
    link_content = req.body.link_content

    const InsertReceipeQuery = 
    'UPDATE receipe SET link= ?, link_comment = ? WHERE receipe_id = ?'
    const InsertReceipeResult = await db.queryParam_Arr(InsertReceipeQuery, [link, link_content, req.params.receipe_id]);
    console.log(InsertReceipeResult);

    if (!InsertReceipeResult) { //DB에러
        res.status(200).send(defaultRes.successFalse(statusCode.DB_ERROR, resMessage.DB_ERROR));        
    }
    else {//데이터베이스 연결 성공
            res.status(200).send(defaultRes.successTrue(statusCode.OK, "레시피 요리순서 입력 성공 - 링크.", InsertReceipeResult));
    }
    
});



module.exports = router;

