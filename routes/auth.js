const { Register, Login, RefreshToken } = require('../controller/authentication');
var router = require('express').Router(); 


// Register
router.post("/register",Register);

// Login
router.post("/login", Login);

// Refresh Token
router.get("/refresh", RefreshToken)


module.exports = router;
