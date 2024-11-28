import { useRef, useEffect } from "react";
import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup({ isOpen, onClose, isLoading, onUpdateAvatar }) {
  const avatarRef = useRef("");

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateAvatar({ avatar: avatarRef.current.value });
    avatarRef.current.value = "";
  }
  useEffect(() => {
    avatarRef.current.value = "";
  }, [onClose]);

  return (
    <PopupWithForm
      name="change_avatar"
      title="Cambiar Foto de Perfil"
      buttonTitle={isLoading ? "Guardando..." : "Guardar"}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <input
        type="url"
        ref={avatarRef}
        className="form__input"
        name="avatar"
        id="change-avatar"
        placeholder="Enlace a la imagen"
        required
      />
      <span id="change-avatar-error" className="form__error-visible"></span>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;
