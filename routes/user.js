const express = require("express");
const router = express.Router();
const { User } = require("../routes/user");
const Joi = require("joi");
const jwt = require("jsonwebtoken");

router.get("/getUser", (req, res) => {
  // 200
  return res.status(200).send({ message: "Get Reqeust for user", data: "user get successfully" });
});

router.post("/signUp", async (req, res) => {
  const { error, value } = signUpValidationSchema().validate(req.body);
  if (error) return res.status(400).send({ massage: "Bad Request", error: error.details });
  try {
    let user = await User.findOne({ email: req.body.email });
    if (user) return res.status(400).send({ message: "Bad Request", data: "user is already exist" });
    // 200
    user = new User({
      firstName: value.firstName,
      lastName: value.lastName,
      email: value.email,
      password: value.password,
      enabled: true,
    });
    user = await user.save();
    return res.status(200).send({ message: "User has been created.", data: user });
  } catch (error) {
    console.log("error in sign up", error);
    return res.status(500).send({ message: "Something went wrong", data: "server not working" });
  }
});

router.post("/signIn", async (req, res) => {
  const { error, value } = signInValidationSchema().validate(req.body);
  if (error) return res.status(400).send({ massage: "Bad Request", error: error.details });
  try {
    // check user is exist in our platform 
    let user = await User.findOne({ email: value.userName });
    // check user is not found
    if (!user) return res.status(400).send({ message: "Bad Request", data: "user is not exist." });
    // check its enabled or not
    if (!user.enabled) return res.status(400).send({ message: "Bad Request", data: "User has been disabled. Please contact admin." });
    // if(!user.isEmailVeirfied) return res.status(400).send({ message : "Bad Request" , data : "Please verify your email. Please contact admin." });
    if (user.password != value.password) return res.status(400).send({ message: "Bad Request", data: "Invalid password." });
    const token = generateAuthToken(user);
    return res.status(200).send({ message: "Login successfully.", data: token });
  } catch (error) {
    console.log("error in sign up", error);
    return res.status(500).send({ message: "Something went wrong", data: "server not working" });
  }
});

const generateAuthToken = (user) => {
  const token = jwt.sign({ _id: user._id, firstName: user.firstName }, "Secret@123", { expiresIn: "1d" }, { algorithm: "RS256" });
  return token;
}

const signUpValidationSchema = () => {
  const schema = Joi.object({
    firstName: Joi.string().required().min(2).max(50).trim().label("First Name"),
    lastName: Joi.string().required().min(2).max(50).trim().label("Last Name"),
    email: Joi.string().email().required().lowercase().label("Email ID"),
    password: Joi.string().required().min(8).max(15).trim().label("Password")
  });

  return schema;
}

const signInValidationSchema = () => {
  const schema = Joi.object({
    userName: Joi.string().email().required().lowercase().label("User Name"),
    password: Joi.string().required().min(8).max(15).trim().label("Password")
  });

  return schema;
}



module.exports = router;
