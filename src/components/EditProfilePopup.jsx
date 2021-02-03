import React from 'react';

import PopupWithForm from './PopupWithForm';
import CurrentUserContext from '../contexts/CurrentUserContext';

function EditProfilePopup({ isOpen, onClose, onUpdateUser }) {
  const currentUser = React.useContext(CurrentUserContext);

  const [name, setName] = React.useState('');
  const [description, setDescription] = React.useState('');

  const handleChangeName = (evt) => setName(evt.target.value);
  const handleChangeDescription = (evt) => setDescription(evt.target.value);

  const handleSubmit = (evt) => {
    evt.preventDefault();
    onUpdateUser({
      name,
      about: description,
    });
  };

  React.useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser]);

  return (

    <PopupWithForm
      name="editProfile"
      title="Редактировать Профиль"
      buttonTitle="Cохранить"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <label className="popup__formField">
        <input
          type="text"
          minLength="2"
          maxLength="40"
          required
          title="Имя"
          placeholder="Имя"
          id="profileNameInput"
          className="popup__formInputText popup__formInputText_firstInput"
          value={name || ''}
          onChange={(evt) => handleChangeName(evt)}
        />
        <span className="popup__formInputError" id="profileNameInputError" />
      </label>
      <label className="popup__formField">
        <input
          type="text"
          minLength="2"
          maxLength="200"
          required
          title="О себе"
          placeholder="О себе"
          id="profileAboutInput"
          className="popup__formInputText popup__formInputText_secondInput"
          value={description || ''}
          onChange={(evt) => handleChangeDescription(evt)}
        />
        <span className="popup__formInputError" id="profileAboutInputError" />
      </label>
    </PopupWithForm>

  );
}

export default EditProfilePopup;
