import React from 'react';
import success from '../images/__infoTooltipImage/popup__infoTooltipImage_success.svg';
import fail from '../images/__infoTooltipImage/popup__infoTooltipImage_fail.svg';
import popupCloseButtonImage from '../images/__closeButtonImage/popup__closeButtonImage.svg';

function InfoTooltip({
  name, message, onClose, isOpen,
}) {
  return (
    <div className={`popup popup_type_${name} ${isOpen ? ' popup_opened' : ''}`}>
      <button type="button" className="popup__closeButton" onClick={onClose}>
        <img
          className="popup__closeButtonImage"
          src={popupCloseButtonImage}
          alt="закрыть"
        />
      </button>
      <div className="popup__infoTooltipContainer">
        <img
          className="popup__infoTooltipImage"
          alt="успех или провал"
          src={message && message.includes('успешно') ? success : fail}
        />
        <h2 className="popup__infoTooltipMessage">{message}</h2>
      </div>
      <div aria-hidden="true" className="popup__overlay" onClick={onClose} />
    </div>
  );
}

export default InfoTooltip;
