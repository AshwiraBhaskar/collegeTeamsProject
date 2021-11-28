const Quiz = require("../model/Quiz")
const User = require("../model/user")
const jwt = require("jsonwebtoken");
const Chat = require("../model/Chat");
const config = process.env;

const ListAllQuiz = async (req, res) => {
  const quiz_list = await Quiz.find()
  const quizMetaData = quiz_list.map(quizTest => {
    quizTest.questions = []
    return quizTest
  })
  res.send(quizMetaData)
}

const GetProfile = async (req, res) => {
  const accessToken = req.headers["x-access-token"];
  const decoded_access = jwt.verify(accessToken, config.TOKEN_KEY);
  const user = await User.findById(decoded_access["user_id"])
  res.send({
    first_name: user.first_name,
    last_name: user.last_name,
    email: user.email,
    profile_image : user.profile_image,
    admission_date: user.admission_date,
    role: user.role
  })
}

const GetForumData = async (req, res) => {
  const chats = await Chat.find()
  res.send(chats)
}

const PostForumChat = async (req, res) => {
  const {user_name, user_profile_pic, message} = req.body
  let chat = new Chat({
    user_name : user_name, 
    user_profile_pic : user_profile_pic, 
    message : message})
  chat.save()
  .then(dbresp => {
    res.send({msg : "ok"})
    return
  }).catch(dberr => {
    console.log(dberr);
    res.send({error : "failed to post a chat"})
  })
}

const GetQuizData = async (req, res) => {
  const quiz_id = req.params.quiz_id  
  const quiz = await Quiz.findById(quiz_id)
  res.send(quiz)
}

module.exports = {
  ListAllQuiz,
  GetProfile,
  GetForumData,
  PostForumChat,
  GetQuizData
}