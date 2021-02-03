import React from 'react';
import AuthForm from './AuthForm';

function Login({ onLogin }) {
  const [values, setValues] = React.useState({ email: '', password: '' });
  const handleChange = (evt) => setValues({ ...values, [evt.target.name]: evt.target.value });

  const handleSubmit = (evt) => {
    evt.preventDefault();
    onLogin(values);
  };

  return (
    <div className="login">
      <AuthForm
        title="Вход"
        onSubmit={handleSubmit}
        buttonTitle="Войти"
        mame="Login"
        onChange={(evt) => handleChange(evt)}
      />
    </div>
  );
}

export default Login;
