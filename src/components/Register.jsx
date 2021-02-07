import React from 'react';
import { NavLink } from 'react-router-dom';

function Register({ onRegister }) {
  const [values, setValues] = React.useState({ email: '', password: '' });
  const handleChange = (evt) => setValues({ ...values, [evt.target.name]: evt.target.value });

  const handleSubmit = (evt) => {
    evt.preventDefault();
    onRegister(values);
  };

  return (
    <div className="register">
      <form className="authForm" onSubmit={handleSubmit}>
        <fieldset className="authForm__fieldSet" name="Register">
          <legend className="authForm__title">Регистрация</legend>
          <label className="authForm__field">
            <input
              className="authForm__inputText"
              name="email"
              type="email"
              placeholder="Email*"
              minLength="2"
              maxLength="20"
              pattern="^[^@]+@[^@]+\.[^@]+$"
              onChange={(evt) => handleChange(evt)}
              required
            />
          </label>
          <label className="authForm__field">
            <input
              className="authForm__inputText"
              name="password"
              type="password"
              autoComplete="on"
              placeholder="Пароль*"
              minLength="2"
              maxLength="200"
              onChange={(evt) => handleChange(evt)}
              required
            />
          </label>
          <label className="authForm__field">
            <input
              className="authForm__inputText"
              name="name"
              type="text"
              autoComplete="on"
              placeholder="Ваше Имя"
              minLength="2"
              maxLength="50"
              onChange={(evt) => handleChange(evt)}
            />
          </label>
          <label className="authForm__field">
            <input
              className="authForm__inputText"
              name="about"
              type="text"
              autoComplete="on"
              placeholder="Чем вы занимаетесь?"
              minLength="2"
              maxLength="200"
              onChange={(evt) => handleChange(evt)}
            />
          </label>
          <label className="authForm__field">
            <input
              className="authForm__inputText"
              name="avatar"
              type="url"
              autoComplete="on"
              placeholder="Ссылка на аватар"
              minLength="2"
              maxLength="200"
              onChange={(evt) => handleChange(evt)}
            />
          </label>
          <input
            type="submit"
            title="Зарегистрироваться"
            value="Зарегистрироваться"
            className="authForm__submitButton"
          />
        </fieldset>
        <NavLink to="/sign-in" className="authForm__navLink">
          Уже зарегистрированы? Войти
        </NavLink>
      </form>
    </div>
  );
}

export default Register;
