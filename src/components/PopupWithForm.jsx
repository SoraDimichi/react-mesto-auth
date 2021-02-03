import React from 'react';
import popupCloseButtonImage from '../images/__closeButtonImage/popup__closeButtonImage.svg';

function PopupWithForm({
  buttonTitle, onClose, children, name, title, isOpen, onSubmit,
}) {
  return (
    <div className={`popup popup_type_${name}${isOpen ? ' popup_opened' : ''}`}>
      <button type="button" className="popup__closeButton" onClick={onClose}>
        <img
          className="popup__closeButtonImage"
          src={popupCloseButtonImage}
          alt="закрыть"
        />
      </button>
      <form className="popup__form" onSubmit={onSubmit}>
        <fieldset className="popup__formFieldSet" name={name}>
          <legend className="popup__formTitle">{title}</legend>
          {children}
          <input
            type="submit"
            title={buttonTitle}
            value={buttonTitle}
            className="popup__formSubmitButton"
          />
        </fieldset>
      </form>
      <div aria-hidden="true" className="popup__overlay" onClick={onClose} />
    </div>
  );
}

export default PopupWithForm;
