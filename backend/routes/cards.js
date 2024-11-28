const router = require("express").Router();
const {
  getCards,
  createCards,
  deleteCardsId,
  likeCard,
  dislikeCard,
} = require("../controllers/cards.js");

router.get("/", getCards);
router.post("/", createCards);
router.delete("/:_id", deleteCardsId);
router.put("/likes/:_id", likeCard);
router.delete("/likes/:_id", dislikeCard);

module.exports = router;
