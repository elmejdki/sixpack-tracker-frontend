import { SET_USER_DATA } from '../action_types';
import { host } from '../usefull_vars';

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
      dispatch(setUserData(data));
    }

    // TODO: handle errors with redux
    return {
      error: data.message,
    };
  } catch (err) {
    // TODO: handle errors with redux
    return {
      error: err.message,
    };
  }
};
