const express = require("express");
const User = require("../models/User");
const router = express.Router();
const bcrypt = require('bcryptjs');
const { body, validationResult } = require("express-validator");
var jwt = require('jsonwebtoken');

//jwt authentication is also used to provide a unique token to the user
const JWT_SECRET ='AnandKarna';

//creating a user using: POST"/api/auth/createuser" (Doesn't require Auth)
router.post(
  "/createuser",
  [
    body("name", "The length of the username should be alteast 5.").isLength({
      min: 5,
    }),
    body("email", "Invalid Email").isEmail(),
    body(
      "password",
      "The length of the password should be at least 6."
    ).isLength({ min: 6 }),
  ],
  async (req, res) => {
    //if there are errors then bad request and errors are returned
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    //check whether the user with this email exists already
    let user = await User.findOne({ email: req.body.email });

    try {
      if (user) {
        return res
          .status(400)
          .json({ error: "Sorry a user with this email already exists" });
      }

      const salt = await bcrypt.genSalt(10);
      const secPass = await bcrypt.hash(req.body.password, salt);
      //creating a new user
      user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: secPass,
      });

      //jwt authentication
      const data = {
        user: {
          id: user.id,
        }
      }
      const authToken = jwt.sign(data, JWT_SECRET);
      res.json({authToken});
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Something went wrong"); //if we do some wrong with the keywords and variables
    }
  }
);

module.exports = router;
