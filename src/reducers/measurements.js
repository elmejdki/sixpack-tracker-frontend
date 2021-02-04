import { SET_MEASUREMENTS, ADD_MEASUREMENTS } from '../action_types';

export default (state = [], action) => {
  switch (action.type) {
    case SET_MEASUREMENTS:
      return action.measurements;
    case ADD_MEASUREMENTS:
      return [
        ...action.measurements,
        ...state,
      ];
    default:
      return state;
  }
};
