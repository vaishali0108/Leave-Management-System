const express = require("express");
const router = express.Router();

const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");


// ================= SIGNUP =================
router.post("/signup", async (req, res) => {

 try {

   const { name, email, password, role } = req.body;

   // check user exists
   const userExists = await User.findOne({ email });

   if (userExists) {
     return res.status(400).json({
       message: "User already exists"
     });
   }

   // hash password
   const hashedPassword = await bcrypt.hash(password, 10);

   // create user
   const user = new User({
     name,
     email,
     password: hashedPassword,
     role
   });

   await user.save();

   // create JWT token
   const token = jwt.sign(
     { id: user._id, role: user.role },
     process.env.JWT_SECRET || "secretkey",
     { expiresIn: "1d" }
   );

   res.status(201).json({
     message: "User created successfully",
     token,
     user
   });

 } catch (error) {
   console.log(error);
   res.status(500).json({
     message: "Server error"
   });
 }

});


// ================= LOGIN =================
router.post("/login", async (req, res) => {

 try {

   const { email, password } = req.body;

   const user = await User.findOne({ email });

   if (!user) {
     return res.status(400).json({
       message: "User not found"
     });
   }

   const isMatch = await bcrypt.compare(password, user.password);

   if (!isMatch) {
     return res.status(400).json({
       message: "Wrong password"
     });
   }

   // create token
   const token = jwt.sign(
     { id: user._id, role: user.role },
     process.env.JWT_SECRET || "secretkey",
     { expiresIn: "1d" }
   );

   res.json({
     message: "Login successful",
     token,
     user
   });

 } catch (err) {

   console.log(err);

   res.status(500).json({
     message: "Server error"
   });

 }

});

module.exports = router;