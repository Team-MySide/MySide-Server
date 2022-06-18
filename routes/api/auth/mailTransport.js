const nodemailer = require('nodemailer');
const mailConfig = require("../../../config/mailConfig");

module.exports = {
    sendMailPW: (email, pwd) => {
        try {
          let message = {
            from: 'so02051@naver.com',
            to: email,
            subject: '이웃집닥터 새 비밀번호입니다.',
            html: `<p> 임시비밀번호 : ${pwd} </p>`
          }
          let transporter = nodemailer.createTransport(mailConfig)
          transporter.sendMail(message)
        } catch (error) {
          console.log(error)
        }
    },
    sendMailNum: (email, num) => {
      try {
        let message = {
          from: 'so02051@naver.com',
          to: email,
          subject: '인증번호입니다.',
          html: `<p> ${num} </p>`
        }
        let transporter = nodemailer.createTransport(mailConfig)
        transporter.sendMail(message)
      } catch (error) {
        console.log(error)
      }
  },
};
