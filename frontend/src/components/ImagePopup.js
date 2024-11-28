function ImagePopup(props) {
  return (
    <section
      id="popup-imagen"
      className={props.isOpen ? "popup-imagen popup-show" : "popup-imagen"}
    >
      <button
        onClick={props.onClose}
        type="button"
        id="button__close-showimage"
        className="popup-imagen__button-close"
      ></button>
      <img className="popup-imagen__review" src={props.link} alt="" />
      <p className="popup-imagen__subtitle">{props.name}</p>
      <div id="cover" className={props.isOpen ? "popup__overlay " : ""}></div>
    </section>
  );
}
export default ImagePopup;
