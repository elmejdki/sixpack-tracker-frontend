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

export const startAddMeasure = ({
  image, video, unit, title,
}) => async (dispatch, getState) => {
  try {
    const { auth: { token } } = getState();

    const formData = new FormData();

    if (image) {
      formData.append('image', image);
    }

    formData.append('title', title);
    formData.append('video', video);
    formData.append('unit', unit);

    const response = await fetch(
      'http://localhost:3000/measures',
      {
        headers: new Headers({
          Authorization: token,
        }),
        method: 'POST',
        body: formData,
      },
    );

    const returnedMeasure = await response.json();

    if (response.status !== 201) {
      // TODO: handle errors with an errors reducer
      return {
        error: returnedMeasure.message,
      };
    }

    return dispatch(addMeasure(returnedMeasure));
  } catch (err) {
    // TODO: handle errors with an errors reducer
    return {
      error: err.message,
    };
  }
};
