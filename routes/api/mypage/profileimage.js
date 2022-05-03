var express = require('express');
var router = express.Router();

const crypto = require('crypto-promise');
const jwtUtils = require('../../../module/jwt');

const defaultRes = require('../../../module/utils/utils');
const statusCode = require('../../../module/utils/statusCode');
const resMessage = require('../../../module/utils/responseMessage')
const db = require('../../../module/pool');
var moment = require('moment');
const sharp = require("sharp");
const upload = require('../../../config/multer_profile');
const s3Storage = require('multer-sharp-s3');

router.post('/' ,upload.single('img'), async (req, res) => {
  var img1 = req.file.mypage.Location
  var img2 = req.file.comment.Location
  var img3 = req.file.recipe.Location
  const InsertProfileImageQuery = 'UPDATE user SET profile_image= ?, comment_image = ?, recipe_profile_image = ? WHERE user_id = ?'
  
  const InsertProfileImageResult = await db.queryParam_Arr(InsertProfileImageQuery, [img1,img2,img3, req.body.user_id]);
  console.log(InsertProfileImageResult);

  if (!InsertProfileImageResult) { //DB에러
    res.status(200).send(defaultRes.successFalse(statusCode.INTERNAL_SERVER_ERROR, resMessage.PROFILE_IMAGE_FAIL));        
  }
  else {//데이터베이스 연결 성공
    res.status(200).send(defaultRes.successTrue(statusCode.OK, resMessage.PROFILE_IMAGE_INSERT ));
  }
});

module.exports = router;