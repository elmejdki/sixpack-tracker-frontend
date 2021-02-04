import {
  ADD_MEASURE, EDIT_MEASURE, REMOVE_MEASURE, SET_MEASURES,
} from '../action_types';

export default (state = [], action) => {
  switch (action.type) {
    case SET_MEASURES:
      return action.measures;
    case ADD_MEASURE:
      return [...state, action.measure];
    case EDIT_MEASURE:
      return state.map(measure => {
        if (measure.id === action.id) {
          return {
            ...measure,
            ...action.updates,
          };
        }

        return measure;
      });
    case REMOVE_MEASURE:
      return state.filter(measure => measure.id !== action.id);
    default:
      return state;
  }
};
