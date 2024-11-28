import { useContext } from "react";
import Card from "./Card";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Main(props) {
  const currentUser = useContext(CurrentUserContext);
  return (
    <main>
      <section id="profile" className="profile">
        <div
          onClick={props.onEditAvatarClick}
          className="profile__avatar-circle"
        >
          <figure
            className="profile__avatar"
            style={{ backgroundImage: `url(${currentUser.avatar})` }}
          ></figure>
        </div>
        <div className="profile__info">
          <div className="profile__name-button">
            <h1 className="profile__name">{currentUser.name}</h1>
            <button
              onClick={props.onEditProfileClick}
              type="button"
              className="profile__edit-button"
            ></button>
          </div>
          <p className="profile__about-me">{currentUser.about}</p>
        </div>

        <button
          onClick={props.onAddPlaceClick}
          type="button"
          className="profile__add-button"
        ></button>
      </section>
      <section id="elements" className="elements">
        {props.cards.map((card) => (
          <Card
            key={card._id}
            onCardClick={props.onCardClick}
            card={card}
            name={card.name}
            link={card.link}
            likes={card.likes}
            onLikeClick={props.onLikeClick}
            onCardDelete={props.onCardDelete}
          />
        ))}
      </section>
    </main>
  );
}
export default Main;
