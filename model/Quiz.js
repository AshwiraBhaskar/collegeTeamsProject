const mongoose = require("mongoose");

const OptionType = new mongoose.Schema({
  option_text : {type : String, default : "Default Option"},
  option_is_correct : {type : Boolean, default: false}
})
const QuestionType = new mongoose.Schema({
  question: { type: String, required: true },
  options: {type: [
    
  ], required: true}
})


const quizSchema = new mongoose.Schema({
  title: { type: String, default: null },
  start_time: { type: String, default: null },
  end_time: { type: String, unique: null },
  duration: { type: Number, required: true },
  questions: {type: [QuestionType], required: true}
});

module.exports = mongoose.model("quiz", quizSchema);