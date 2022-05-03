var express = require('express');
var router = express.Router();

const defaultRes = require('../../../module/utils/utils');
const statusCode = require('../../../module/utils/statusCode');
const resMessage = require('../../../module/utils/responseMessage')
const db = require('../../../module/pool');


router.put('/', async (req, res) => {

    receipe_id = req.body.receipe_id
    let UpdateWishQuery;

    UpdateWishQuery = 'UPDATE receipe SET receipe_sharesum = receipe_sharesum+ 1 WHERE receipe_id = ?'
    console.log('0')

    const UpdateWishResult = await db.queryParam_Parse(UpdateWishQuery, receipe_id);
    
    if(!UpdateWishResult){
        res.status(200).send(defaultRes.successFalse(statusCode.DB_ERROR, resMessage.DB_ERROR));    
    }else{
        res.status(200).send(defaultRes.successTrue(statusCode.OK, "공유 상태 변경 성공"));      
    }
});

module.exports = router;