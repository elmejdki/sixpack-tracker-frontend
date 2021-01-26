import {
  ADD_MEASURE, EDIT_MEASURE, REMOVE_MEASURE, SET_MEASURES,
} from '../action_types';

export const setMeasures = measures => ({
  type: SET_MEASURES,
  measures,
});

export const addMeasure = measure => ({
  type: ADD_MEASURE,
  measure,
});

export const editMeasure = (id, update) => ({
  type: EDIT_MEASURE,
  id,
  update,
});

export const removeMeasure = id => ({
  type: REMOVE_MEASURE,
  id,
});

export const startSetMeasures = () => async (dispatch, getState) => {
  try {
    const { auth: { token } } = getState();
    const response = await fetch(
      'http://localhost:3000/measures',
      {
        headers: new Headers({
          Authorization: token,
          'Content-Type': 'application/x-www-form-urlencoded',
        }),
      },
    );

    const measures = await response.json();

    // TODO: Please add an error handler I mean a reducer for it
    if (response.status !== 200) {
      return {
        error: measures.message,
      };
    }

    return dispatch(setMeasures(measures));
  } catch (err) {
    return {
      error: err.message,
    };
  }
};
