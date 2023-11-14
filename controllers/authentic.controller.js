const User = require("../models/blog.model");
const signup = async (req, res) => {
  // console.log(req.body)
  const { username, email, password } = req.body;
  const singleUser = await User.findOne({ where: { email: email } });
  if (singleUser) {
    res.status(400).send("user already exist");
  }
  const receivedNewuser = req.body;
  const createdUser = await User.create(receivedNewuser);
  //   console.log("first",createdUser)
  res.status(201).send(createdUser);
};

const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({
    where: {
      email: email,
      password: password,
    },
  });
  if (!user) {
    return res.status(400).send("please signup first");
  }
  return res.status(200).send(user);
};

module.exports = {
  signup,
  login,
};
