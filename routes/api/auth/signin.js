var express = require('express');
var router = express.Router();

const crypto = require('crypto-promise');

const defaultRes = require('../../../module/utils/utils');
const statusCode = require('../../../module/utils/statusCode');
const resMessage = require('../../../module/utils/responseMessage')
const db = require('../../../module/pool');

const jwtUtils = require('../../../module/jwt');

router.post('/', async (req, res) => {
    email = req.body.email;
    password = req.body.password

    const selectUserQuery = 'SELECT * FROM user WHERE email = ?'
    const selectUserResult = await db.queryParam_Parse(selectUserQuery, email);

    if (selectUserResult[0] == null) {
        // 아이디가 존재하지 않으면
        res.status(200).send(defaultRes.successFalse(statusCode.OK, "아이디가 존재하지 않습니다."));
    } else {
        const salt = selectUserResult[0].salt;
        const hashedEnterPw = await crypto.pbkdf2(password, salt, 1000, 32, 'SHA512')
        const dbPw = selectUserResult[0].password

        if (hashedEnterPw.toString('base64') == dbPw) {
            const tokens = jwtUtils.sign(selectUserResult[0]);
            const accessToken = tokens.token;
            const refreshToken = tokens.refreshToken;
            const TokenUpdateQuery = "UPDATE user SET accessToken = ?, refreshToken = ? WHERE email= ?";
            const TokenUpdateResult = await db.queryParam_Parse(TokenUpdateQuery, [accessToken, refreshToken, email]);

            let nickname = selectUserResult[0].nickname;
            let relationNm = selectUserResult[0].relationNm;
            let cancerNm = selectUserResult[0].cancerNm;

            if(relationNm=="보호자"){
                nickname = "("+nickname+")"+"보호자";
            }
   
            if (!TokenUpdateResult) {
                res.status(200).send(defaultRes.successFalse(statusCode.DB_ERROR, "refreshtoken DB등록 오류 "));
            } else {
                res.status(200).send(defaultRes.successTrue(statusCode.OK, "로그인 성공", {
                    tokens,nickname,relationNm,cancerNm
                }));
            }
        } else {
            //비밀번호가 일치하지 않음
            res.status(200).send(defaultRes.successFalse(statusCode.OK, "정보가 정확하지 않음"));
        }
    }
});

router.post('/social', async (req, res) => {
    email = req.body.email;

    const selectUserQuery = 'SELECT * FROM user WHERE email = ?'
    const selectUserResult = await db.queryParam_Parse(selectUserQuery, email);

    if (selectUserResult[0] == null) {
        // 아이디가 존재하지 않으면
        res.status(200).send(defaultRes.successTrue(statusCode.NO_CONTENT, "카카오 존재x",{email}));
    } else {

        const tokens = jwtUtils.sign(selectUserResult[0]);
        const accessToken = tokens.token;
        const refreshToken = tokens.refreshToken;
        const TokenUpdateQuery = "UPDATE user SET accessToken = ?, refreshToken = ? WHERE email= ?";
        const TokenUpdateResult = await db.queryParam_Parse(TokenUpdateQuery, [accessToken, refreshToken, email]);

        let nickname = selectUserResult[0].nickname;
        let relationNm = selectUserResult[0].relationNm;
        let cancerNm = selectUserResult[0].cancerNm;

        if(relationNm=="보호자"){
            nickname = "("+nickname+")"+"보호자";
        }

        if (!TokenUpdateResult) {
            res.status(200).send(defaultRes.successFalse(statusCode.DB_ERROR, "refreshtoken DB등록 오류 "));
        } else {
            res.status(200).send(defaultRes.successTrue(statusCode.OK, "로그인 성공", {
                tokens,nickname,relationNm,cancerNm
            }));
        }

    }
});



module.exports = router;