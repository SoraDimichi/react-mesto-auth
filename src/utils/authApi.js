export const BASE_URL = 'https://auth.nomoreparties.co';

const fetchData = (baseURL, path, params) => fetch(`${baseURL}${path}`, params).then((res) => {
  if (res.ok) {
    return res.json();
  }
  return res.json()
    .then((data) => Promise.reject(new Error(`Ошибка: ${res.status}: ${data.message}`)));
});

export const register = (email, password) => fetchData(`${BASE_URL}`, '/signup', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({ email, password }),
}).catch((err) => console.log(err));

export const authorize = (email, password) => fetchData(`${BASE_URL}`, '/signin', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({ email, password }),
}).then((data) => {
  if (data.token) {
    localStorage.setItem('token', data.token);
    return data;
  } return null;
}).catch((err) => console.log(err));

export const checkToken = (token) => fetchData(`${BASE_URL}`, '/users/me', {
  method: 'GET',
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
  },
}).then((data) => data.data)
  .catch((err) => console.log(err));
