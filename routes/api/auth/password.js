var express = require('express');
var router = express.Router();
const defaultRes = require('../../../module/utils/utils');
const statusCode = require('../../../module/utils/statusCode');
const resMessage = require('../../../module/utils/responseMessage')
const db = require('../../../module/pool');

const jwtUtils = require('../../../module/jwt');
const nodemailer = require('nodemailer');        // e-mail 보낼 때 사용



router.post('/password/:email/:name', async (req, res) => {

    console.log(req.body);
    const getUser = "SELECT * FROM user WHERE email=? AND name =? ";
    const getUserinfo = await db.queryParam_Parse(getUser, [req.body.email, req.body.name]);
  
  
  
    if (!getUserinfo[0]) {
      res.status(200).send("입력된 정보가 잘못되었습니다.");
    } else { //쿼리문이 성공했을 때
  
      //f 추출
      var random = Math.random().toString(36).substr(2,11); //비밀번호 암호화
      const encryptedPassword = bcrypt.hashSync(random, 10);
  
      const getUpdate = "UPDATE myside.user SET password =? WHERE email =? AND name = ?";
      const getResult = await db.queryParam_Parse(getUpdate, [encryptedPassword, req.body.email, req.body.name]);
  
      let email = req.body.email;
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
          res.status(200).send("실패");
        } else {
          res.status(200).send("성공");
        }
        smtpTransport.close();
      });
    }
  });
  
  
  module.exports = router;
  