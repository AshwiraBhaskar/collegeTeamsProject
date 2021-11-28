const Quiz = require("../model/Quiz")
const CreateQuiz = async (req, res) => {
  const title = req.params.quiz_name
  const quiz = req.body
  console.log(quiz.questions)
  // quiz.title = title
  const data = await Quiz.create(quiz)
  res.send(data)
}

module.exports = {CreateQuiz}