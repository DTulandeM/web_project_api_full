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

module.exports.getUsersId = (req, res) => {
  const { _id } = req.user;
  user
    .findById(_id)
    .then((user) => {
      if (!user) {
        return res
          .status(ERROR_CODE.NOT_FOUND)
          .send({ message: "Usuario no encontrado" });
      }
      if (!user) {
        const message = "El usuario no se encuentra";

        throw new NotFoundError(ERROR_CODE.CONNECTION_REFUSED, message);
      }

      return res.send(user);
    })

    .catch((err) => {
      if (err.name === "CastError") {
        return res
          .status(ERROR_CODE.BAD_REQUEST)
          .send({ message: "ID de usuario no válido" });
      }
      res
        .status(ERROR_CODE.INTERNAL_SERVER)
        .send({ message: "Error del servidor" });
    });
};

module.exports.updateUsers = (req, res) => {
  const { name, about } = req.body;
  user
    .findByIdAndUpdate(
      req.user._id,
      { name, about },
      { returnDocument: "after", runValidators: true, new: true }
    )
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.name === "ValidationError") {
        return res.status(ERROR_CODE.BAD_REQUEST).send({
          message: "Los datos no son suficientes para actualizar el usuario",
        });
      }
      res
        .status(ERROR_CODE.INTERNAL_SERVER)
        .send({ message: "Error del servidor" });
    });
};

module.exports.updateAvatar = (req, res) => {
  const { avatar } = req.body;
  user
    .findByIdAndUpdate(
      req.user._id,
      { avatar },
      { returnDocument: "after", runValidators: true }
    )
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.name === "ValidationError") {
        return res.status(ERROR_CODE.BAD_REQUEST).send({
          message: "Los datos no son suficientes para actualizar el usuario",
        });
      }
      res
        .status(ERROR_CODE.INTERNAL_SERVER)
        .send({ message: "Error del servidor" });
    });
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
      console.log("user is ", user);
      if (!user) {
        const message = "El usuario no se encuentra autorizado";

        throw new UnauthorizedError(ERROR_CODE.UNAUTHORIZED, message);
      }
      const token = jwt.sign({ _id: user._id }, "super-strong-secret", {
        expiresIn: "7d",
      });

      res.send({ token, status: "ok" });
      console.log(token);
    })
    .catch(next);
  // .catch((err) => {
  //   res.status(ERROR_CODE.UNAUTHORIZED).send({
  //     message: "El usuario no se encuentra autorizado",
  //     err,
  //   });
  // });
};
