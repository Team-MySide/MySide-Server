var express = require('express');
var router = express.Router();

const upload = require('../../config/multer');
var moment = require('moment');

const defaultRes = require("../../module/utils/utils");
const statusCode = require("../../module/utils/statusCode");
const resMessage = require("../../module/utils/responseMessage");
const db = require("../../module/pool");

router.get('/all', async(req, res) => {


    console.log(req.body)
    let insertQuery =  'GET INTO cancer_food '
    +' (cancerNm, food, ref_link)'
    +' VALUES (?,?,?)';;
    let insertResult = await db.queryParam_Arr(insertQuery, 
            [req.body.cancerNm, req.body.food, req.body.ref_link]);
    
    

    if (!insertResult) {
        res.status(200).send(defaultRes.successFalse(statusCode.DB_ERROR, resMessage.BOARD_INSERT_FAIL));
    } else { //쿼리문이 성공했을 때
  
       res.status(200).send(defaultRes.successTrue(statusCode.OK, resMessage.BOARD_INSERT_SUCCESS));
    }
});
router.get('/', (req, res) => {
    res.sendFile(__dirname + '/list.html')
});


module.exports = router;