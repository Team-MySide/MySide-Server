var express = require('express');
var router = express.Router();

//const upload = require('../../config/multer');
var moment = require('moment');

const defaultRes = require("../../module/utils/utils");
const statusCode = require("../../module/utils/statusCode");
const resMessage = require("../../module/utils/responseMessage");
const db = require("../../module/pool");

router.post('/', async(req, res) => {


    console.log(req.body)
    let insertQuery =  'INSERT INTO faq '
    +' (category, title, content, regiDate)'
    +' VALUES (?,?,?,?)';;
    let insertResult = await db.queryParam_Arr(insertQuery, 
            [req.body.category, req.body.title, req.body.content,moment().format('YYYY-MM-DD HH:mm:ss')]);
    
    

    if (!insertResult) {
        res.status(200).send(defaultRes.successFalse(statusCode.DB_ERROR, resMessage.BOARD_INSERT_FAIL));
    } else { //쿼리문이 성공했을 때
  
       res.status(200).send(defaultRes.successTrue(statusCode.OK, resMessage.BOARD_INSERT_SUCCESS));
    }
});
router.get('/', (req, res) => {
    res.sendFile(__dirname + '/faq.html')
});


module.exports = router;