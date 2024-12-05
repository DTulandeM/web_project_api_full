const jwt = require("jsonwebtoken");
const { UnauthorizedError } = require("./errorHandler");

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith("Bearer ")) {
    throw new UnauthorizedError("Usuario no cuenta autorización ");
  }
  const token = authorization.replace("Bearer ", "");

  let payload;
  try {
    payload = jwt.verify(token, "super-strong-secret");
  } catch (err) {
    throw new UnauthorizedError("La verificación del usuario fue incorrecta ");
  }
  req.user = payload;

  next();
};
