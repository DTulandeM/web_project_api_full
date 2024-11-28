import { useState, useEffect, useContext } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import PopupWithForm from "./PopupWithForm";

function EditProfilePopup({
  isOpen,
  onClose,
  title = "Editar perfil",
  name = "profile",
  onUpdateUser,
  isLoading,
}) {
  const [nameInp, setNameInp] = useState("");
  const [description, setDescription] = useState("");
  const currentUser = useContext(CurrentUserContext);

  function handleSubmit(e) {
    e.preventDefault();

    onUpdateUser({
      name: nameInp,
      about: description,
    });
  }

  useEffect(() => {
    setNameInp(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser, onClose]);

  return (
    <PopupWithForm
      name={name}
      title={title}
      buttonTitle={isLoading ? "Guardando..." : "Guardar"}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <input
        type="text"
        name="name"
        value={nameInp || ""}
        onChange={(e) => setNameInp(e.target.value)}
        className="form__input"
        id="profile-name"
        placeholder="Nombre"
        required
      />
      <span id="profile-name-error" className="form__error-visible"></span>
      <input
        type="text"
        name="about"
        value={description || ""}
        onChange={(e) => setDescription(e.target.value)}
        className="form__input"
        id="profile-aboutme"
        placeholder="Acerca de mí"
        required
      />
      <span id="profile-aboutme-error" className="form__error-visible"></span>
    </PopupWithForm>
  );
}

export default EditProfilePopup;
