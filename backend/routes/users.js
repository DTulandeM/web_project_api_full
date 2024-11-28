const router = require("express").Router();
const {
  getUsersId,
  login,
  signUpUsers,
  updateUsers,
  updateAvatar,
} = require("../controllers/users.js");

router.get("/me", getUsersId);

router.post("/signup", signUpUsers);

router.post("/signin", login);

router.patch("/me", updateUsers);

router.patch("/me/avatar", updateAvatar);

module.exports = router;
