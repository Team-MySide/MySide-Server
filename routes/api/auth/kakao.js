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

passport.use('kakao', new KakaoStrategy({
    clientID: 'cd8faa7a5f914dd4811f603454e6117a',
    callbackURL: '/auth/kakao/callback',     // 위에서 설정한 Redirect URI
  }, async (accessToken, refreshToken, profile, done) => {
    console.log(profile.id);
    console.log(accessToken);
    console.log(refreshToken);
}))

router.get('/', passport.authenticate('kakao'));

router.get('/callback', passport.authenticate('kakao', {
  failureRedirect: '/admin',
}), (res, req) => {
  res.redirect('/auth');
  console.log('ddd');
});

module.exports = router;