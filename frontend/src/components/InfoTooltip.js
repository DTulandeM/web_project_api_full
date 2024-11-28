import React from "react";
import checkIcon from "../images/check-icon.svg";
import errorIcon from "../images/error-icon.svg";

function InfoTooltip({ isOpen, onClose, isLoggedIn }) {
  return (
    <>
      <section
        id="popup-notification"
        className={
          isOpen ? "popup-notification popup-show" : "popup-notification"
        }
      >
        <button
          onClick={onClose}
          type="button"
          id="button__close-notification"
          className="popup-notification__button-close"
        ></button>
        <img
          className="popup-notification__image"
          src={isLoggedIn ? checkIcon : errorIcon}
          alt={isLoggedIn ? "Éxito" : "Error"}
        />
        <p className="popup-notification__text">
          {isLoggedIn
            ? "¡Correcto! Ya estás registrado."
            : "Uy, algo salió mal. Por favor, inténtalo de nuevo."}
        </p>
      </section>
      <div id="cover" className={isOpen ? "popup__overlay " : ""}></div>
    </>
  );
}

export default InfoTooltip;
