const bcrypt = require("bcrypt");
const User = require("../models/user.model");
const jwtToken = require("../utils/JWT");

const signup = async (req, res) => {
  // console.log(req.body)
  const { username, email, password } = req.body;

  const singleUser = await User.findOne({ where: { email: email } });

  if (singleUser) return res.status(400).send("user already exist");

  const salt = await bcrypt.genSalt();
  const hashPassword = await bcrypt.hash(password, salt);

  const newUser = await User.create({
    username,
    email,
    password: hashPassword,
  });
  const accessToken = jwtToken(username);
    res.cookie("accessTokenName", accessToken, {
      maxAge: 60*60*1000,
    })
  return res.status(200).send(newUser);
};

const login = async (req, res) => {
  const {username, password } = req.body;
  const user = await User.findOne({
    where: {
      username: username
    },
  });

  if (!user) return res.status(404).send("wrong username");

  const isValid = await bcrypt.compare( password,user.password);

  if (!isValid) {
   return res.send("wrong password");
  }else{

    const accessToken = jwtToken(user.username);
    res.cookie("accessTokenName", accessToken, {
      maxAge: 60*60*1000,
    })
    return res.status(200).send("Login Success!");
  }

  
};

module.exports = {
  signup,
  login,
};
