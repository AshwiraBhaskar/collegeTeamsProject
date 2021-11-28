const User = require("../model/user")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

const Login = async (req, res) => {
  // Our login logic starts here
  try {
    // Get user input
    const { email, password } = req.body;
    // Validate user input
    if (!(email && password)) {
      res.status(500).send("All input is required");
      return
    }
    // Validate if user exist in our database
    const user = await User.findOne({ email });

    if (user && (await bcrypt.compare(password, user.password))) {
      // Create access token
      const access_token = jwt.sign(
        { user_id: user._id, email },
        process.env.TOKEN_KEY,
        {
          expiresIn: "2h",
        }
      );
      // Create refresh token
      const refresh_token = jwt.sign(
        { user_id: user._id, email },
        process.env.TOKEN_KEY,
        {
          expiresIn: "24h",
        }
      );

      // user
      res.statusCode = 200
      res.json({access_token, refresh_token});
      return
    }
    res.status(500).send({error : "Invalid email or password"});
  } catch (err) {
    console.log(err);
  }

}

const Register = async (req, res) => {
  // Our register logic starts here
  try {
    // Get user input
    const { first_name, last_name, email, password,role } = req.body;

    // Validate user input
    if (!(email && password && first_name && last_name && role)) {
      res.status(400).send("All input is required");
      return
    }

    // check if user already exist
    // Validate if user exist in our database
    const oldUser = await User.findOne({ email });

    if (oldUser) {
      return res.status(409).send("User Already Exist. Please Login");
    }

    //Encrypt user password
    encryptedPassword = await bcrypt.hash(password, 10);

    // Create user in our database
    const user = await User.create({
      first_name,
      last_name,
      email: email.toLowerCase(), // sanitize: convert email to lowercase
      password: encryptedPassword,
      role
    });

    // return new user
    res.status(201).json({msg : "User Registered Successfully"});
    return
  } catch (err) {
    console.log(err);
  }
}

const RefreshToken = (req, res) => {
  let refresh_token = req.headers["x-refresh-token"];
  try {
    let refresh_data = jwt.verify(refresh_token, process.env.TOKEN_KEY)
    // Create access token
    let access_token = jwt.sign(
      { user_id: refresh_data.user_id, email: refresh_data.email },
      process.env.TOKEN_KEY,
      {expiresIn: "2h"}
    );
    // Create refresh token
    refresh_token = jwt.sign(
      { user_id: refresh_data.user_id, email: refresh_data.email },
      process.env.TOKEN_KEY,
      {expiresIn: "24h"}
    );

    // user
    res.statusCode = 200
    return res.json({access_token, refresh_token});
  }catch (err) {
    res.statusCode = 401
    return res.send({error : err});
  }
}

module.exports = {
  Login,
  Register,
  RefreshToken
}