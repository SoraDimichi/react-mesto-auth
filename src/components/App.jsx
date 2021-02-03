import React from 'react';
import {
  Route,
  Switch,
  useHistory,
  Redirect,
  withRouter,
} from 'react-router-dom';

import Header from './Header';
import Main from './Main';
import Login from './Login';
import Register from './Register';
import Footer from './Footer';

import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import InfoTooltip from './InfoTooltip';

import ImagePopup from './ImagePopup';

import ProtectedRoute from './ProtectedRoute';
import CurrentUserContext from '../contexts/CurrentUserContext';
import api from '../utils/api';
import * as auth from '../utils/authApi';

function App() {
  const history = useHistory();
  const [currentUser, setUserInfo] = React.useState({ login: {} });
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [cards, setCards] = React.useState([]);
  const [infoTooltipMessage, setInfoTooltipMessage] = React.useState('');
  const [isInfoTooltipPopupOpen, setInfoTooltipPopup] = React.useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [selectedCard, setIsSelectedCard] = React.useState(undefined);

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }
  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }
  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }
  function handleCardClick(card) {
    setIsSelectedCard(card);
  }

  function closeAllPopups() {
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsSelectedCard(undefined);
    setInfoTooltipPopup(false);
  }

  const handleDeleteCard = (card) => {
    api.deleteCard(card._id).then(() => {
      const newCards = cards.filter((cardIsDeleted) => cardIsDeleted._id !== card._id);
      setCards(newCards);
    }).catch((err) => {
      console.log(err);
      setInfoTooltipMessage('Что-то пошло не так!\nПопробуйте ещё раз.');
      setInfoTooltipPopup(true);
    });
  };

  const handleUpdateUser = (data) => {
    api.patchUserInfo(data).then((result) => {
      setUserInfo((prevState) => ({ ...prevState, ...result }));
      closeAllPopups();
    }).catch((err) => {
      console.log(err);
      setInfoTooltipMessage('Что-то пошло не так!\nПопробуйте ещё раз.');
      setInfoTooltipPopup(true);
    });
  };

  const handleAddPlaceSubmit = (data) => {
    api.postNewCard(data).then((newCard) => {
      setCards([newCard, ...cards]);
      closeAllPopups();
    }).catch((err) => {
      console.log(err);
      setInfoTooltipMessage('Что-то пошло не так!\nПопробуйте ещё раз.');
      setInfoTooltipPopup(true);
    });
  };

  const handleCardLike = (card) => {
    const isLiked = card.likes.some((like) => like._id === currentUser._id);
    api.like(card._id, isLiked).then((newCard) => {
      const newCards = cards.map((cardIsLiked) => (
        cardIsLiked._id === card._id ? newCard : cardIsLiked
      ));
      setCards(newCards);
    }).catch((err) => {
      console.log(err);
      setInfoTooltipMessage('Что-то пошло не так!\nПопробуйте ещё раз.');
      setInfoTooltipPopup(true);
    });
  };

  const handleUpdateAvatar = (data) => {
    api.patchUserAvatar(data).then((result) => {
      setUserInfo((prevState) => ({ ...prevState, ...result }));
      closeAllPopups();
    }).catch((err) => {
      console.log(err);
      setInfoTooltipMessage('Что-то пошло не так!\nПопробуйте ещё раз.');
      setInfoTooltipPopup(true);
    });
  };

  const handleRegister = ({ email, password }) => {
    auth.register(email, password).then((res) => {
      if (res) {
        history.push('/sign-in');
        setInfoTooltipMessage('Вы успешно зарегистрировались!');
      }
    }).catch((err) => {
      setInfoTooltipMessage('Что-то пошло не так!\nПопробуйте ещё раз.');
      console.log(err);
    })
      .finally(() => setInfoTooltipPopup(true));
  };

  const handleLogin = ({ email, password }) => {
    auth.authorize(email, password).then((data) => {
      if (data) {
        history.push('/');
        setLoggedIn(true);
        setInfoTooltipMessage('Вы успешно вошли в приложение!');
      }
    }).catch((err) => {
      setInfoTooltipMessage('Что-то пошло не так!\nПопробуйте ещё раз.');
      console.log(err);
    })
      .finally(() => setInfoTooltipPopup(true));
  };

  const handleLogout = () => {
    setLoggedIn(false);
    localStorage.removeItem('token');
  };

  const token = localStorage.getItem('token');

  React.useEffect(() => {
    const handleTokenCheck = () => {
      if (token) {
        auth.checkToken(token).then((data) => {
          setUserInfo((prevState) => ({ ...prevState, login: { ...data } }));
          setLoggedIn(true);
          history.push('/');
        }).catch((err) => {
          console.log(err);
        });
      }
    };
    handleTokenCheck();
    if (loggedIn) {
      Promise.all([api.getUserInfo(), api.getInitialCards()]).then(([userData, initialCards]) => {
        setUserInfo((prevState) => ({ ...prevState, ...userData }));
        setCards(initialCards);
      }).catch((err) => {
        console.log(err);
        setInfoTooltipMessage('Что-то пошло не так!');
        setInfoTooltipPopup(true);
      });
    }
  }, [loggedIn, history, token]);

  return (
    <CurrentUserContext.Provider value={currentUser}>

      <div className="page">

        <Header
          loggedIn={loggedIn}
          onLogout={handleLogout}
        />
        <main className="content">
          <Switch>
            (
            <Route path="/sign-in">
              <Login onLogin={handleLogin} />
            </Route>
            )
            (
            <Route path="/sign-up">
              <Register onRegister={handleRegister} />
            </Route>
            )
            <ProtectedRoute
              path="/"
              component={Main}
              loggedIn={loggedIn}
              onAddPlace={handleAddPlaceClick}
              onEditProfile={handleEditProfileClick}
              onEditAvatar={handleEditAvatarClick}
              onCardClick={handleCardClick}
              onCardLike={handleCardLike}
              onCardDelete={handleDeleteCard}
              cards={cards}
              setCards={setCards}
            />
            <Route>
              {loggedIn ? <Redirect to="/" /> : <Redirect to="/sign-in" />}
            </Route>
          </Switch>
        </main>
        <Footer />

        <InfoTooltip
          name="infoTooltip"
          message={infoTooltipMessage}
          isOpen={isInfoTooltipPopupOpen}
          onClose={closeAllPopups}
        />

        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
        />

        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
        />

        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlaceSubmit}
        />

        <ImagePopup
          card={selectedCard}
          onClose={closeAllPopups}
        />

      </div>

    </CurrentUserContext.Provider>
  );
}

export default withRouter(App);
