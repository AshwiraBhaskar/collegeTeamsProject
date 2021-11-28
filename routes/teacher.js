const { CreateQuiz } = require('../controller/teacher');
const verifyToken = require('../middleware/verifytoken');
var router = require('express').Router(); 


router.post("/quiz/create", CreateQuiz);
router.delete("/quiz/:quiz_id", CreateQuiz);
router.put("/quiz/:quiz_id", CreateQuiz);
//individual result to student and full result to teacher





module.exports = router;
