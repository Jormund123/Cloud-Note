const express = require("express");
const User = require("../models/User");
const router = express.Router();
const bcrypt = require("bcryptjs");
const { body, validationResult } = require("express-validator");
var jwt = require("jsonwebtoken");
var fetchuser = require("../middleware/fetchuser");

//jwt authentication is also used to provide a unique token to the user
const JWT_SECRET = "AnandKarna";

//Route 1
//creating a user using: POST"/api/auth/createuser" (No login required)
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
        },
      };
      const authToken = jwt.sign(data, JWT_SECRET);
      res.json({ authToken });
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Something went wrong"); //if we do some wrong with the keywords and variables
    }
  }
);

//next endpoint
//Route 2
//authenticate a user using: POST "/api/auth/login". No login required
router.post(
  "/login",
  [
    body("email", "Invalid Email").isEmail(),
    body(
      "password",
      "The length of the password should be at least 6."
    ).isLength({ min: 6 }),
    body("password", "Password cannot be blank").exists(),
  ],
  async (req, res) => {
    let success = false;
    //if there are errors then bad request and errors are returned
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;
    try {
      let user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({success, error: "Login credientials not valid" });
      }

      const passwordCompare = await bcrypt.compare(password, user.password);
      if (!passwordCompare) {
        
        return res.status(400).json({ success, error: "Login credientials not valid" });
      }

      const data = {
        user: {
          id: user.id,
        },
      };

      const authToken = jwt.sign(data, JWT_SECRET);
      success = true;
      res.json({ success, authToken });
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Something went wrong");
    }
  }
);

//Route 3
//get logged in user details: POST "/api/auth/getuser". login required
router.post(
  "/getuser",
   fetchuser,
  async (req, res) => {
    try {
      userId = req.user.id;
      const user = await User.findById(userId).select("-password"); //when getting the details of the user, password will not be shown
      res.send(user);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Something went wrong");
    }
  }
);

module.exports = router;
