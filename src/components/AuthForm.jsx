import React from 'react';

function AuthForm({
  buttonTitle,
  name,
  title,
  onChange,
  onSubmit,
  children,
}) {
  return (
    <form className="authForm" onSubmit={onSubmit}>
      <fieldset className="authForm__fieldSet" name={name}>
        <legend className="authForm__title">{title}</legend>
        <label className="authForm__field">
          <input
            className="authForm__inputText"
            name="email"
            type="email"
            placeholder="Email"
            minLength="2"
            maxLength="20"
            pattern="^[^@]+@[^@]+\.[^@]+$"
            onChange={onChange}
            required
          />
        </label>
        <label className="authForm__field">
          <input
            className="authForm__inputText"
            name="password"
            type="password"
            autoComplete="on"
            placeholder="Пароль"
            minLength="2"
            maxLength="200"
            onChange={onChange}
            required
          />
        </label>
        <input
          type="submit"
          title={buttonTitle}
          value={buttonTitle || ''}
          className="authForm__submitButton"
        />
      </fieldset>
      {children}
    </form>
  );
}

export default AuthForm;
