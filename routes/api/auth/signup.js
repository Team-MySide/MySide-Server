var express = require('express');
var router = express.Router();

const crypto = require('crypto-promise');

const defaultRes = require('../../../module/utils/utils');
const statusCode = require('../../../module/utils/statusCode');
const resMessage = require('../../../module/utils/responseMessage')
const db = require('../../../module/pool');
const jwtUtils = require('../../../module/jwt');

router.post('/', async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    const phone = req.body.phone;
    const name = req.body.name;
    const nickname = req.body.nickname;
    const relationNm = req.body.relationNm;
    const cancerNm = req.body.cancerNm;
    const stageNm = req.body.stageNm;
    const progressNm = req.body.progressNm;

    const gender = req.body.gender;
    const age = req.body.age;
    const height = req.body.height;
    const weight = req.body.weight;
    const disableFood = req.body.disableFood;
    const disease = req.body.disease;

    const selectIdQuery = 'SELECT * FROM user WHERE email = ?'
    const selectIdResult = await db.queryParam_Parse(selectIdQuery, email);
    const signupQuery = 'INSERT INTO user ' 
    +'(email, password, name, phone, relationNm, nickname, cancerNm, stageNm, progressNm, gender, age, height, weight, disable_food, disease,salt) '
    +'VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)';

    if (selectIdResult[0] == null) {
        console.log("일치 없음");
        const buf = await crypto.randomBytes(64);
        const salt = buf.toString('base64');
        const hashedPw = await crypto.pbkdf2(password, salt, 1000, 32, 'SHA512')
        const signupResult = await db.queryParam_Arr(signupQuery, [email, hashedPw.toString('base64'),name, phone, relationNm, nickname,
            cancerNm, stageNm, progressNm, gender, age, height, weight, disableFood, disease, salt
        ]);
        if (!signupResult) {
            res.status(200).send(defaultRes.successFalse(statusCode.DB_ERROR, resMessage.SIGNUP_FAIL));
        } else { //쿼리문이 성공했을 때

            res.status(200).send(defaultRes.successTrue(statusCode.OK, resMessage.SIGNUP_SUCCESS));
        }
    } else {
        console.log("이미 존재");
        res.status(200).send(defaultRes.successFalse(statusCode.OK, resMessage.DUPLICATED_ID_FAIL));
    }
});

module.exports = router;