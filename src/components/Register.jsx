import React from 'react';
import { NavLink } from 'react-router-dom';
import AuthForm from './AuthForm';

function Register({ onRegister }) {
  const [values, setValues] = React.useState({ email: '', password: '' });
  const handleChange = (evt) => setValues({ ...values, [evt.target.name]: evt.target.value });

  const handleSubmit = (evt) => {
    evt.preventDefault();
    onRegister(values);
  };

  return (
    <div className="register">
      <AuthForm
        title="Регистрация"
        onSubmit={handleSubmit}
        buttonTitle="Зарегестрироваться"
        mame="Login"
        onChange={(evt) => handleChange(evt)}
      >
        <NavLink to="/sign-in" className="authForm__navLink">
          Уже зарегистрированы? Войти
        </NavLink>
      </AuthForm>
    </div>
  );
}

export default Register;
