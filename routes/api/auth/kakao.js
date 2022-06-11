var express = require('express');
var router = express.Router();

const crypto = require('crypto-promise');
const passport = require('passport')
const KakaoStrategy = require('passport-kakao').Strategy;

const defaultRes = require('../../../module/utils/utils');
const statusCode = require('../../../module/utils/statusCode');
const resMessage = require('../../../module/utils/responseMessage')
const db = require('../../../module/pool');
const jwtUtils = require('../../../module/jwt');


//1991517937
passport.use('kakao', new KakaoStrategy({
    clientID: 'cd8faa7a5f914dd4811f603454e6117a',
    callbackURL: '/auth/kakao/callback',     // 위에서 설정한 Redirect URI
  }, async (accessToken, refreshToken, profile, done) => {
    // console.log(profile.id);
    // console.log(accessToken);
    // console.log(refreshToken);
    const selectUserQuery = 'SELECT * FROM user WHERE email = ?'
    const selectUserResult = await db.queryParam_Parse(selectUserQuery, profile.id);
    console.log(selectUserResult[0])
    if (selectUserResult[0] == null){
      console.log('없음')
      const signupQuery = 'INSERT INTO user ' 
      +'(email) '
      +'VALUES (?)';
      const signupResult = await db.queryParam_Arr(signupQuery, [profile.id]);

      done(null, signupResult);
      // res.status(200).send(defaultRes.successTrue(statusCode.OK));


    }else{
      done(null, selectUserResult)
      // res.status(400).send(defaultRes.successFalse(statusCode.UNAUTHORIZED));
      
    }
}))

router.get('/', passport.authenticate('kakao'));

router.get('/callback',passport.authenticate('kakao', {
  failureRedirect: '/',
}), async(res, req) => {
  // res.redirect('/auth');
  console.log('콜백')
  console.log(req.params.profile.id)
  // const selectUserQuery = 'SELECT * FROM user WHERE email = ?'
  // const selectUserResult = await db.queryParam_Parse(selectUserQuery, profile.id);
  // console.log(selectUserResult[0])
  // if (selectUserResult[0] == null){
  //   console.log('없음')
  //   // return (343)
  //   res.status(200).send(defaultRes.successTrue(statusCode.OK));


  // }else{
  //   res.status(400).send(defaultRes.successFalse(statusCode.UNAUTHORIZED));
  //   // return (4443)
  // }
});

module.exports = router;