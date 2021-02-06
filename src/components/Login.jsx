import React from 'react';

function Login({
  onLogin,
}) {
  const [values, setValues] = React.useState({ email: '', password: '' });
  const handleChange = (evt) => setValues({ ...values, [evt.target.name]: evt.target.value });

  const handleSubmit = (evt) => {
    evt.preventDefault();
    onLogin(values);
  };

  return (
    <div className="login">
      <form className="authForm" onSubmit={handleSubmit}>
        <fieldset className="authForm__fieldSet" name="Login">
          <legend className="authForm__title">Вход</legend>
          <label className="authForm__field">
            <input
              className="authForm__inputText"
              name="email"
              type="email"
              placeholder="Email"
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
              placeholder="Пароль"
              minLength="2"
              maxLength="200"
              onChange={(evt) => handleChange(evt)}
              required
            />
          </label>
          <input
            type="submit"
            title="Войти"
            value="Войти"
            className="authForm__submitButton"
          />
        </fieldset>
      </form>
    </div>
  );
}

export default Login;
