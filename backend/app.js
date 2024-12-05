const express = require("express");
const cardsRoutes = require("./routes/cards.js");
const usersRoutes = require("./routes/users.js");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const auth = require("./middleware/auth");
const cors = require("cors");
const { isCelebrateError } = require("celebrate");
const { requestLogger, errorLogger } = require("./middleware/logger");

const { PORT = 3000 } = process.env;

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose
  .connect("mongodb://localhost:27017/aroundb")
  .then(() => {
    console.log("conectado a la base de datos");
  })
  .catch((err) => {
    console.log("algo salio mal", err);
  });
app.use(
  cors({
    origin: "http://localhost:3001",
  })
);
app.use(requestLogger);
app.post("/signup", usersRoutes);
app.post("/signin", usersRoutes);
app.use(auth);

app.use("/cards", cardsRoutes);
app.use("/users", usersRoutes);

app.use(errorLogger);

app.use((err, req, res, next) => {
  const { statusCode = 500, message } = err;

  if (isCelebrateError(err)) {
    const validationError = err.details.get("body");
    const errorMessage = validationError
      ? validationError.details[0].message
      : "Error de validación";

    return res.status(400).json({
      status: "error",
      message: errorMessage,
    });
  }
  if (err.name === "CastError") {
    return res.status(404).send({ message: "ID de usuario no válido" });
  }
  if (err.name === "ValidationError") {
    return res.status(404).send({
      message: "Los datos no son suficientes para actualizar el usuario",
    });
  }
  res.status(statusCode).send({
    message:
      statusCode === 500 ? "Se ha producido un error en el servidor" : message,
  });

  next();
});

app.listen(PORT, () => {
  console.log(`App corriendo en el puerto: ${PORT}`);
});
