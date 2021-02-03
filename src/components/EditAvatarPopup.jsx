import React from 'react';
import PopupWithForm from './PopupWithForm';

function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar }) {
  const [value, setValue] = React.useState('');

  const handleChange = (evt) => setValue(evt.target.value);

  function handleSubmit(evt) {
    evt.preventDefault();
    onUpdateAvatar({
      avatar: value,
    });
  }

  React.useEffect(() => {
    setValue('');
  }, [onClose]);

  return (

    <PopupWithForm
      name="editAvatar"
      title="Обновить Аватар"
      buttonTitle="Сохранить"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <label className="popup__formField">
        <input
          type="url"
          required
          title="Ссылка на картинку"
          placeholder="Ссылка на картинку"
          id="avatarUrlInput"
          className="popup__formInputText"
          value={value || ''}
          onChange={(evt) => handleChange(evt)}
        />
        <span className="popup__formInputError" id="avatarUrlInputError" />
      </label>
    </PopupWithForm>

  );
}

export default EditAvatarPopup;
