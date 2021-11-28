const { Dashboard } = require('../controller/student');
const verifyToken = require('../middleware/verifytoken');
var router = require('express').Router(); 


router.use(verifyToken)
router.get("/", Dashboard);
module.exports = router;
