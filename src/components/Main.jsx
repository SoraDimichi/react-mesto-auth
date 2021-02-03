import React from 'react';

import profileEditButtonImage from '../images/__editButton/profile__editButton.svg';
import profileEditAvatarImage from '../images/__avatar/profile__avatarButton.svg';

import Card from './Card';
import CurrentUserContext from '../contexts/CurrentUserContext';

function Main({
  onEditAvatar, onEditProfile, onAddPlace, cards, onCardClick, onCardLike, onCardDelete,
}) {
  const currentUser = React.useContext(CurrentUserContext);
  const { name, about, avatar } = currentUser;

  return (
    <div className="main">
      <section className="profile">

        <div className="profile__avatar" style={{ backgroundImage: `url('${avatar}')` }} />
        <button type="button" className="profile__avatarButton" onClick={onEditAvatar}>
          <img src={profileEditAvatarImage} alt="изменить" />
        </button>
        <h1 className="profile__name">{name}</h1>
        <p className="profile__about">{about}</p>
        <button type="button" className="profile__openPopupButton" onClick={onEditProfile}>
          <img
            className="profile__openPopupButtonImage"
            src={profileEditButtonImage}
            alt="Отредактировать"
          />
        </button>
        <button type="button" className="profile__addButton" onClick={onAddPlace}>
          +
        </button>

      </section>

      <ul className="cards">
        {cards.map((card) => (
          <Card
            card={card}
            key={card._id}
            onCardClick={onCardClick}
            onCardLike={onCardLike}
            onCardDelete={onCardDelete}
          />
        ))}
      </ul>
    </div>
  );
}

export default Main;
