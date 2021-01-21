import { SET_MEASUREMENTS, ADD_MEASUREMENT } from '../action_types';

export const setMeasurements = measurements => ({
  type: SET_MEASUREMENTS,
  measurements,
});

export const addMeasurement = measurement => ({
  type: ADD_MEASUREMENT,
  measurement,
});

export const startSetMeasurements = () => async (dispatch, getState) => {
  const { auth: { token } } = getState();

  const response = await fetch(
    'http://localhost:3000/measurements',
    {
      headers: new Headers({
        Authorization: token,
        'Content-Type': 'application/x-www-form-urlencoded',
      }),
    },
  );

  const data = await response.json();

  if (
    response.status !== 200) {
    // TODO: add later a specific reducer for error handling
    return {
      error: data.message,
    };
  }

  return dispatch(setMeasurements(data));
};
