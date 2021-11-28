const express = require("express");
require("dotenv").config();
const User = require("./model/user");
const authRouter = require("./routes/auth")
const studentRouter = require("./routes/student")
const teacherRouter = require("./routes/teacher")
const userRouter = require("./routes/user")
var cors = require('cors')

var corsOptions = {
  origin: process.env.FRONTEND_URL,
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}

// import database.js and connect to Database
require("./config/database").connect();

// instantiate express app
const app = express();
app.use(express.json());
app.use(cors(corsOptions));


const { API_PORT } = process.env;
const port = process.env.PORT || API_PORT;


// Routes
app.use("/auth", authRouter)
app.use("/student", studentRouter)
app.use("/teacher", teacherRouter)
app.use("/user", userRouter)

// server listening 
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});