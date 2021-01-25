import { SET_USER_DATA } from '../action_types';

export const setUserData = data => ({
  type: SET_USER_DATA,
  data,
});

export const startSetUserData = () => async (dispatch, getState) => {
  try {
    const { auth: { token } } = getState();
    const response = await fetch('http://localhost:3000/info', {
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
