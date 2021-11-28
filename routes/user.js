const { CreateQuiz } = require('../controller/teacher');
const { ListAllQuiz, GetProfile, GetForumData, PostForumChat, GetQuizData } = require('../controller/user');
const verifyToken = require('../middleware/verifytoken');
var router = require('express').Router(); 


router.use(verifyToken)

// Dashboard
router.get("/quiz/list", ListAllQuiz);
router.get("/quiz/:quiz_id", GetQuizData);

router.get("/forum/", GetForumData);
router.post("/forum/post_chat", PostForumChat);

router.get("/profile/", GetProfile);
// router.put("/profile/update", UpdateProfile);


module.exports = router;
