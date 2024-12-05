const user = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const {
  NotFoundError,
  UnauthorizedError,
} = require("../middleware/errorHandler");

const ERROR_CODE = Object.freeze({
  CONNECTION_REFUSED: 102,
  CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  NOT_FOUND: 404,
  INTERNAL_SERVER: 500,
});

module.exports.getUsersId = (req, res, next) => {
  const { _id } = req.user;
  user
    .findById(_id)
    .then((user) => {
      if (!user) {
        throw new NotFoundError("El usuario no fue encuentrado");
      }

      return res.send(user);
    })
    .catch(next);
};

module.exports.updateUsers = (req, res, next) => {
  const { name, about } = req.body;
  user
    .findByIdAndUpdate(
      req.user._id,
      { name, about },
      { returnDocument: "after", runValidators: true, new: true }
    )
    .then((user) => res.send(user))
    .catch(next);
};

module.exports.updateAvatar = (req, res, next) => {
  const { avatar } = req.body;
  user
    .findByIdAndUpdate(
      req.user._id,
      { avatar },
      { returnDocument: "after", runValidators: true }
    )
    .then((user) => res.send(user))
    .catch(next);
};

module.exports.signUpUsers = (req, res) => {
  bcrypt
    .hash(req.body.password, 10)
    .then((hash) =>
      user.create({
        email: req.body.email,
        password: hash,
      })
    )
    .then((user) => {
      res.status(ERROR_CODE.CREATED).send({ id: user._id, email: user.email });
    })
    .catch((err) => {
      if (err.code === 11000) {
        res.status(ERROR_CODE.BAD_REQUEST).send({
          message: "El usuario ya existe",
        });
      } else {
        res.status(ERROR_CODE.BAD_REQUEST).send({
          message: "Algo ha salido y no se ha creado un usuario",
        });
      }
    });
};

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;
  return user
    .findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, "super-strong-secret", {
        expiresIn: "7d",
      });

      res.send({ token, status: "ok" });
    })
    .catch(next);
};
