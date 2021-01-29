import { fixMeasurements, sortMeasurements } from '../helpers/measurements';
import { SET_MEASUREMENTS, ADD_MEASUREMENTS } from '../action_types';

export const setMeasurements = measurements => ({
  type: SET_MEASUREMENTS,
  measurements,
});

export const addMeasurements = measurements => ({
  type: ADD_MEASUREMENTS,
  measurements,
});

export const startSetMeasurements = () => async (dispatch, getState) => {
  try {
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

    if (response.status !== 200) {
      // TODO: add later a specific reducer for error handling
      return {
        error: data.message,
      };
    }

    const fixedMeasurements = fixMeasurements(data);
    return dispatch(setMeasurements(fixedMeasurements));
  } catch (err) {
    return {
      // TODO: add later a specific reducer for error handling
      error: err.message,
    };
  }
};

export const startAddMeasurements = measurements => async (dispatch, getState) => {
  try {
    const { auth: { token } } = getState();

    const response = await fetch(
      'http://localhost:3000/measurements',
      {
        headers: new Headers({
          Authorization: token,
          'Content-Type': 'application/json',
        }),
        method: 'POST',
        body: JSON.stringify({ measurements }),
      },
    );

    const data = await response.json();

    if (response.status !== 201) {
      // TODO: add later a specific reducer for error handling
      return {
        error: data.message,
      };
    }

    const sortedMeasurments = sortMeasurements(data);
    const fixedMeasurements = fixMeasurements(sortedMeasurments);
    return dispatch(addMeasurements(fixedMeasurements));
  } catch (err) {
    // TODO: add later a specific reducer for error handling
    return {
      error: err.message,
    };
  }
};
