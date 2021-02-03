import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import headerLogo from '../images/__logo/header__logo.svg';
import CurrentUserContext from '../contexts/CurrentUserContext';

function Header({ loggedIn, onLogout }) {
  const currentUser = React.useContext(CurrentUserContext);
  const location = useLocation();

  return (
    <header className="header">
      <NavLink to="/" className="header__homeLink">
        <img className="header__logo" src={headerLogo} alt="Логотип" />
      </NavLink>
      {
        loggedIn
          ? (
            <>
              <p className="header__email">{currentUser.login.email}</p>
              <button className="header__authButton" type="button" onClick={onLogout}>Выйти</button>
            </>
          )
          : (
            <NavLink to={location.pathname === '/sign-up' ? 'sign-in' : 'sign-up'} className="header__navLink">
              {location.pathname === '/sign-up' ? 'Войти' : 'Регистрация'}
            </NavLink>
          )
        }
    </header>
  );
}

export default Header;
