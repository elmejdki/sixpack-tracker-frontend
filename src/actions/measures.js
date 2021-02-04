import {
  ADD_MEASURE, EDIT_MEASURE, REMOVE_MEASURE, SET_MEASURES,
} from '../action_types';
import fixMeasureImages from '../helpers/measures';
import errorHandler from '../helpers/error';
import { host } from '../usefull_vars';

export const setMeasures = measures => ({
  type: SET_MEASURES,
  measures,
});

export const addMeasure = measure => ({
  type: ADD_MEASURE,
  measure,
});

export const editMeasure = (id, updates) => ({
  type: EDIT_MEASURE,
  id,
  updates,
});

export const removeMeasure = id => ({
  type: REMOVE_MEASURE,
  id,
});

export const startSetMeasures = () => async (dispatch, getState) => {
  try {
    const { auth: { token } } = getState();
    const response = await fetch(
      `${host}/measures`,
      {
        headers: new Headers({
          Authorization: token,
          'Content-Type': 'application/x-www-form-urlencoded',
        }),
      },
    );

    const measures = await response.json();

    if (response.status !== 200) {
      return errorHandler(dispatch, measures.message, true);
    }

    const fixedMeasureImages = fixMeasureImages(measures);

    return dispatch(setMeasures(fixedMeasureImages));
  } catch (err) {
    return errorHandler(dispatch, err.message, true);
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
      `${host}/measures`,
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
      return errorHandler(dispatch, returnedMeasure.message, true);
    }

    dispatch(addMeasure({
      ...returnedMeasure,
      image: `${host}${returnedMeasure.image}`,
    }));

    return errorHandler(dispatch, 'Measure Added Successfuly', false);
  } catch (err) {
    return errorHandler(dispatch, err.message, true);
  }
};

export const startRemoveMeasure = id => async (dispatch, getState) => {
  try {
    const { auth: { token } } = getState();

    const response = await fetch(
      `${host}/measures/${id}`,
      {
        headers: new Headers({
          Authorization: token,
        }),
        method: 'DELETE',
      },
    );

    const returnedId = await response.json();

    if (response.status !== 200) {
      return errorHandler(dispatch, returnedId.message, true);
    }

    dispatch(removeMeasure(returnedId.id));

    return errorHandler(dispatch, 'Measure was Removed successfuly', false);
  } catch (err) {
    return errorHandler(dispatch, err.message, true);
  }
};

export const startEditMeasure = (id, {
  title,
  image,
  video,
  unit,
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
      `${host}/measures/${id}`,
      {
        method: 'PUT',
        headers: new Headers({
          Authorization: token,
        }),
        body: formData,
      },
    );

    const data = await response.json();

    if (response.status !== 200) {
      return errorHandler(dispatch, data.message, true);
    }

    dispatch(editMeasure(id, {
      title: data.title,
      image: `${host}${data.image}`,
      video: data.video,
      unit: data.unit,
    }));

    return errorHandler(dispatch, 'Measure Edited successfuly', false);
  } catch (err) {
    return errorHandler(dispatch, err.message, true);
  }
};
