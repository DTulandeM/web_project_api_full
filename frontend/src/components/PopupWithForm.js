import FormValidator from "./FormValidator";
import { useRef, useEffect } from "react";

function PopupWithForm(props) {
  const formRef = useRef("");

  useEffect(() => {
    const settings = {
      formSelector: ".form",
      inputSelector: ".form__input",
      submitButtonSelector: ".form__button",
      inactiveButtonClass: "form__button_disabled",
      inputErrorClass: "form__input_type_error",
      errorClass: "form__error_visible",
    };
    const formValidator = new FormValidator(formRef.current, settings);

    formValidator.enableValidation();
    formValidator._toggleButtonState();
    if (props.isOpen) {
      formValidator.resetValidation();
    }
  }, [props.isOpen]);

  return (
    <div
      name={`popup-${props.name}`}
      className={props.isOpen ? "popup popup-show " : "popup"}
    >
      <button
        type="button"
        onClick={props.onClose}
        name={`button__close-${props.name}`}
        className="popup__button-close"
      ></button>
      <form
        ref={formRef}
        onSubmit={props.onSubmit}
        name={`form-${props.name}`}
        className="popup form"
        noValidate
      >
        <h1 className="form__title">{props.title}</h1>
        <fieldset className="form__fieldset">
          {props.children}
          <button
            ref={formRef}
            name={props.name}
            type="submit"
            className="form__button"
          >
            {props.buttonTitle}
          </button>
        </fieldset>
      </form>
      <div id="cover" className={props.isOpen ? "popup__overlay " : ""}></div>
    </div>
  );
}
export default PopupWithForm;
