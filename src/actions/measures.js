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
