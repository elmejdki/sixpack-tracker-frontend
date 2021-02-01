import { startSetUserData } from './user_data';
import { startSetMeasurements } from './measurements';
import { startSetMeasures } from './measures';
import { LOGIN, LOGOUT } from '../action_types';
import errorHandler from '../helpers/error';
import { host } from '../usefull_vars';

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

    const response = await fetch(`${host}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credentials),
    });

    const data = await response.json();

    if (response.status === 200) {
      localStorage.setItem('token', data.auth_token);
      dispatch(login(data.auth_token));

      await dispatch(startSetUserData());
      await dispatch(startSetMeasures());
      await dispatch(startSetMeasurements());

      return errorHandler(dispatch, 'login successfuly', false);
    }

    return errorHandler(dispatch, data.message, true);
  } catch (err) {
    return errorHandler(dispatch, err.message, true);
  }
};

export const startSignUp = (
  avatar, username, email, password, confirmation,
) => async dispatch => {
  try {
    const formData = new FormData();
    if (avatar) {
      formData.append('avatar', avatar);
    }
    formData.append('username', username);
    formData.append('email', email);
    formData.append('password', password);
    formData.append('password_confirmation', confirmation);

    const response = await fetch(`${host}/signup`, {
      method: 'POST',
      body: formData,
    });

    const data = await response.json();

    if (response.status === 201) {
      localStorage.setItem('token', data.auth_token);
      dispatch(login(data.auth_token));

      await dispatch(startSetUserData());
      await dispatch(startSetMeasures());
      await dispatch(startSetMeasurements());

      return errorHandler(dispatch, 'signup successfuly', false);
    }

    return errorHandler(dispatch, data.message, true);
  } catch (err) {
    return errorHandler(dispatch, err.message, true);
  }
};
