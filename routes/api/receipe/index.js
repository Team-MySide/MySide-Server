var express = require('express');
var router = express.Router();



router.use("/", require("./receipe"));
router.use("/comment", require("./comment"));
router.use("/comment/sub", require("./comment_sub.js"));
router.use("/comment/like", require("./comment_like.js"));





module.exports = router;