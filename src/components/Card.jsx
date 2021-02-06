import React from 'react';
import cardDeleteButtonImage from '../images/__deleteButtonImage/card__deleteButtonImage.svg';
import CurrentUserContext from '../contexts/CurrentUserContext';

function Card({
  onCardClick, onCardLike, onCardDelete, card,
}) {
  const { name = '', link = '', likes = [] } = card;

  const currentUser = React.useContext(CurrentUserContext);

  const isOwn = card.owner === currentUser._id;
  const cardDeleteButtonClassName = (`card__deleteButton${isOwn ? '' : ' card__deleteButton_hidden'}`);

  const isLiked = likes.some((like) => like === currentUser._id);
  const cardLikeButtonClassName = (`card__likeButton${isLiked ? ' card__likeButton_active' : ''}`);

  const handleCardClick = () => onCardClick(card);
  const handleCardLike = () => onCardLike(card);
  const handleCardDelete = () => onCardDelete(card);

  return (
    <li className="card">
      <button type="button" className={cardDeleteButtonClassName} onClick={handleCardDelete}>
        <img className="card__deleteButtonImage" src={cardDeleteButtonImage} alt="Удалить" />
      </button>
      <div
        aria-hidden="true"
        className="card__imageContainer"
        style={{ backgroundImage: `url('${link}')` }}
        onClick={handleCardClick}
      />
      <p className="card__title">{name}</p>
      <button aria-label="Like" type="button" className={cardLikeButtonClassName} onClick={handleCardLike} content="" />
      <p className="card__likeCounter">{likes.length}</p>
    </li>
  );
}

export default Card;
