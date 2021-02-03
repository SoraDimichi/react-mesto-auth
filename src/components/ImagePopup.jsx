import React from 'react';
import popupCloseButtonImage from '../images/__closeButtonImage/popup__closeButtonImage.svg';

function ImagePopup(props) {
  const {
    card: { link, name } = { link: '', name: '' },
    onClose,
  } = props;

  return (
    <div className={`popup popup_type_image${link && name ? ' popup_opened' : ''}`}>
      <button type="button" className="popup__closeButton" onClick={onClose}>
        <img
          className="popup__closeButtonImage"
          src={popupCloseButtonImage}
          alt="закрыть"
        />
      </button>
      <figure className="popup__lightBoxContainer">
        <img className="popup__lightBoxImage" src={`${link}`} alt={name} />
        <figcaption className="popup__lightBoxFigcaption">{name}</figcaption>
      </figure>
      <div aria-hidden="true" className="popup__overlay" onClick={onClose} />
    </div>
  );
}

export default ImagePopup;
