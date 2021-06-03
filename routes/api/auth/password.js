var express = require('express');
var router = express.Router();
const defaultRes = require('../../../module/utils/utils');
const statusCode = require('../../../module/utils/statusCode');
const resMessage = require('../../../module/utils/responseMessage')
const db = require('../../../module/pool');
const bcrypt = require('bcrypt');
const jwtUtils = require('../../../module/jwt');
const nodemailer = require('nodemailer');        // e-mail 보낼 때 사용
const senderInfo = require('../config/senderInfo.json');



router.post('/password/:email/:name', async (req, res) => {

    console.log(req.params);
    const getUser = "SELECT * FROM user WHERE email=? AND name =? ";
    const getUserinfo = await db.queryParam_Parse(getUser, [req.params.email, req.params.name]);
  
  
  
    if (!getUserinfo[0]) {
        res.status(200).send(defaultRes.successFalse(statusCode.OK, resMessage.NOT_CORRECT_INFO));      // 올바르지 않은 정보 입니다
    } else { //쿼리문이 성공했을 때
  
      //f 추출
      var random = Math.random().toString(36).substr(2,11); //비밀번호 암호화
      const encryptedPassword = bcrypt.hashSync(random, 10);
  
      const getUpdate = "UPDATE myside.user SET password =? WHERE email =? AND name = ?";
      const getResult = await db.queryParam_Parse(getUpdate, [encryptedPassword, req.params.email, req.params.name]);
  
      let email = req.params.email;
      var password = random;
      console.log(email);
      console.log(password);
  
  
      const smtpTransport = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
          user: senderInfo.user, // 보내는 메일의 주소 
          pass: senderInfo.pass  // 보내는 메일의 비밀번호
        }
      })
      
      const mailOptions = {
        from: senderInfo.user,
        to: email,
        subject: '안녕하세요. 이웃집닥터입니다.',
        text: "임시 비밀번호 : " + password
      };
  
      await smtpTransport.sendMail(mailOptions, (error, responses) => {
        if (error) {
          console.log(error);
          res.status(200).send(defaultRes.successTrue(statusCode.OK, resMessage.FIND_PASSWORD_FAIL));      // 올바르지 않은 정보 입니다
        } else {
            res.status(200).send(defaultRes.successTrue(statusCode.OK, resMessage.FIND_PASSWORD_SUCCESS, getResult[0]));      // 아이디 찾기 성공 
        }
        smtpTransport.close();
      });
    }
  });
  
  
  module.exports = router;
  