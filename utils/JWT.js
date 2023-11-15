const { sign, verify } = require("jsonwebtoken");

const createToken = (name) => {
  const accessToken = sign({ tokenParam: name }, "access-token");
  return accessToken;
};

module.exports =createToken;
