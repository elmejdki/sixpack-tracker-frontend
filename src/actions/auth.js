import { LOGIN, LOGOUT } from '../action_types';

export const login = token => ({
  type: LOGIN,
  token,
});

export const logout = () => ({
  type: LOGOUT,
});

export const startLogIn = (email, password) => async dispatch => {
  try {
    const credentials = {
      email,
      password,
    };

    console.log(credentials);

    const response = await fetch('http://localhost:3000/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credentials),
    });

    const data = await response.json();

    if (response.status === 200) {
      dispatch(login(data.auth_token));
      localStorage.setItem('token', data.auth_token);
    }

    // TODO: dispatch the error in the errors reducer
    return {
      error: data.message,
    };
  } catch (err) {
    // TODO: dispatch the error in the errors reducer
    return {
      error: err.message,
    };
  }
};

export const startSignUp = (
  avatar, username, email, password, confirmation,
) => async dispatch => {
  try {
    const credentials = {
      avatar,
      username,
      email,
      password,
      password_confirmation: confirmation,
    };

    const response = await fetch('http://localhost:3000/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credentials),
    });

    const data = await response.json();

    if (response.status === 201) {
      dispatch(login(data.auth_token));
      localStorage.setItem('token', data.auth_token);
    }

    // TODO: dispatch the error in the errors reducer
    return {
      error: data.message,
    };
  } catch (err) {
    // TODO: dispatch the error in the errors reducer
    return {
      error: err.message,
    };
  }
};
