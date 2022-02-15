var express = require('express');
var router = express.Router();



router.use("/", require("./receipe"));
router.use("/comment", require("./comment"));
router.use("/comment/sub", require("./comment_sub.js"));
router.use("/comment/like", require("./comment_like.js"));
router.use("/recommendation", require("./recommend.js"));
router.use("/month", require("./month"));
router.use("/like", require("./like"));
router.use("/save", require("./save"));
router.use("/share", require("./share"));
router.use("/mypage", require("./mypage"));
router.use("/mainfood", require("./mainfood"));
router.use("/cookstep", require("./cookstep"));
router.use("/ingredient", require("./ingredient"));
router.use("/search", require("./search"));

module.exports = router;