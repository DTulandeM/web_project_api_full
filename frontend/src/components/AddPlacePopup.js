import { useState, useEffect } from "react";
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup({ isOpen, onClose, isLoading, onAddPlace }) {
  const [nameCard, setName] = useState("");
  const [link, setLink] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    onAddPlace({
      name: nameCard,
      link: link,
    });
    setName("");
    setLink("");
  }

  useEffect(() => {
    setLink("");
    setName("");
  }, [onClose]);

  return (
    <PopupWithForm
      name="addimage"
      title="Nuevo Lugar"
      buttonTitle={isLoading ? "Guardando..." : "Crear"}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <input
        type="text"
        className="form__input"
        name="name"
        value={nameCard}
        onChange={(e) => setName(e.target.value)}
        id="addimage-name"
        placeholder="Titulo"
        required
        minLength="2"
        maxLength="30"
      />
      <span id="addimage-name-error" className="form__error-visible"></span>

      <input
        type="url"
        className="form__input"
        name="link"
        value={link}
        onChange={(e) => setLink(e.target.value)}
        id="addimage-link"
        placeholder="Enlace a la imagen"
        required
      />
      <span id="addimage-link-error" className="form__error-visible"></span>
    </PopupWithForm>
  );
}

export default AddPlacePopup;
