import { fixMeasurements, sortMeasurements, restructureMeasurements } from '../helpers/measurements';
import { SET_MEASUREMENTS, ADD_MEASUREMENTS } from '../action_types';
import errorHandler from '../helpers/error';
import { host } from '../usefull_vars';

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
      `${host}/measurements`,
      {
        headers: new Headers({
          Authorization: token,
          'Content-Type': 'application/x-www-form-urlencoded',
        }),
      },
    );

    const data = await response.json();

    if (response.status !== 200) {
      return errorHandler(dispatch, data.message, true);
    }

    const fixedMeasurements = fixMeasurements(data);
    const structuredMeasurements = restructureMeasurements(fixedMeasurements);
    return dispatch(setMeasurements(structuredMeasurements));
  } catch (err) {
    return errorHandler(dispatch, err.message, true);
  }
};

export const startAddMeasurements = measurements => async (dispatch, getState) => {
  try {
    const { auth: { token } } = getState();

    const response = await fetch(
      `${host}/measurements`,
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
      return errorHandler(dispatch, data.message, true);
    }

    const sortedMeasurments = sortMeasurements(data);
    const fixedMeasurements = fixMeasurements(sortedMeasurments);
    const structuredMeasurements = restructureMeasurements(fixedMeasurements);
    dispatch(addMeasurements(structuredMeasurements));

    return errorHandler(dispatch, 'Measurements where added successfully', false);
  } catch (err) {
    return errorHandler(dispatch, err.message, true);
  }
};
