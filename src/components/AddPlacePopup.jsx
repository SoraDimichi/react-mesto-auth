import React from 'react';
import PopupWithForm from './PopupWithForm';

function AddPlacePopup({ isOpen, onClose, onAddPlace }) {
  const [name, setName] = React.useState('');
  const [link, setLink] = React.useState('');

  const handleChangeName = (evt) => setName(evt.target.value);
  const handleChangeLink = (evt) => setLink(evt.target.value);

  const handleSubmit = (evt) => {
    evt.preventDefault();
    onAddPlace({
      name,
      link,
    });
  };

  React.useEffect(() => {
    setName('');
    setLink('');
  }, [onClose]);

  return (

    <PopupWithForm
      name="addCard"
      title="Новое Место"
      buttonTitle="Создать"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <label className="popup__formField">
        <input
          type="text"
          minLength="1"
          maxLength="30"
          required
          title="Название"
          placeholder="Название"
          id="placeNameInput"
          className="popup__formInputText popup__formInputText_firstInput"
          value={name}
          onChange={(evt) => handleChangeName(evt)}
        />
        <span className="popup__formInputError" id="placeNameInputError" />
      </label>
      <label className="popup__formField">
        <input
          type="url"
          required
          title="Ссылка на картинку"
          placeholder="Ссылка на картинку"
          id="placeUrlInput"
          className="popup__formInputText popup__formInputText_secondInput"
          value={link}
          onChange={(evt) => handleChangeLink(evt)}
        />
        <span className="popup__formInputError" id="placeUrlInputError" />
      </label>
    </PopupWithForm>

  );
}

export default AddPlacePopup;
