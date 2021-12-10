const express = require("express");
const User = require("../models/User");
const router = express.Router();

const { body, validationResult } = require("express-validator");

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

      //creating a new user
      user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
      });
      res.json(user);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Something went wrong"); //if we do some wrong with the keywords and variables
    }
  }
);

module.exports = router;
