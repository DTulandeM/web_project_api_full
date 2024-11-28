import PopupWithForm from "./PopupWithForm";

function DeleteConfirmationPopup(props) {
  function handleSubmit(e) {
    e.preventDefault();
    props.onCardDelete();
  }
  return (
    <PopupWithForm
      name="delete"
      title="¿Estás seguro?"
      buttonTitle={props.isLoading ? "Guardando..." : "Si"}
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
    />
  );
}
export default DeleteConfirmationPopup;
