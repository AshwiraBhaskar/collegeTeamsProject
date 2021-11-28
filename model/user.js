const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  first_name: { type: String, required: true },
  last_name: { type: String, default: null },
  email: { type: String, unique: true, required: true },
  password: { type: String , required: true},
  admission_date: {type: Date, default : null},
  role : {
    type: String,
    enum : ['STUDENT', 'TEACHER'],
    default: 'STUDENT'
  }
});

module.exports = mongoose.model("user", userSchema);