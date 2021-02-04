import { SET_USER_DATA } from '../action_types';
import errorHandler from '../helpers/error';
import { host } from '../usefull_vars';
import avatar from '../assets/images/avatar.png';

export const setUserData = data => ({
  type: SET_USER_DATA,
  data,
});

export const startSetUserData = () => async (dispatch, getState) => {
  try {
    const { auth: { token } } = getState();
    const response = await fetch(`${host}/info`, {
      headers: {
        Authorization: token,
        'Content-Type': 'application/json',
      },
    });

    const data = await response.json();

    if (response.status === 200) {
      dispatch(setUserData({
        ...data,
        avatar: data.avatar ? `${host}${data.avatar}` : avatar,
      }));
    }

    return errorHandler(dispatch, data.message, true);
  } catch (err) {
    return errorHandler(dispatch, err.message, true);
  }
};
