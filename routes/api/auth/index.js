var express = require('express');
var router = express.Router();

router.use("/signin", require("./signin"));
router.use("/signup", require("./signup"));
router.use("/refresh", require("./refresh"));
router.use("/find", require("./finder"));
router.use("/duplicated", require("./duplicated"));
router.use("/password", require("./password"));
 

module.exports = router;
