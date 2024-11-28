import { useContext } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Card({
  name,
  link,
  likes,
  onCardClick,
  card,
  onLikeClick,
  onCardDelete,
}) {
  const currentUser = useContext(CurrentUserContext);
  const isOwn = card.owner._id === currentUser._id;
  const cardDeleteButtonClassName = `element__button-trash ${
    isOwn ? "element__button-trash" : "element__button-trash_hidden"
  }`;
  const isLiked = card.likes.some((i) => i._id === currentUser._id);
  const cardLikeButtonClassName = `element__button-like ${
    isLiked ? "element__button-like_active" : "element__button-like"
  }`;

  function handleClick() {
    onCardClick(card);
  }

  function handleClickLike() {
    onLikeClick(card);
  }
  function handleCardDelete() {
    onCardDelete(card);
  }
  return (
    <div className="element">
      <button
        onClick={handleCardDelete}
        type="button"
        className={cardDeleteButtonClassName}
      ></button>
      <img
        scr="#"
        alt=" "
        onClick={handleClick}
        className="element__image"
        style={{ backgroundImage: `url(${link})` }}
      />
      <p className="element__title">{name}</p>
      <button
        type="button"
        onClick={handleClickLike}
        className={cardLikeButtonClassName}
      ></button>
      <p className="element__likes">{likes.length}</p>
    </div>
  );
}

export default Card;
