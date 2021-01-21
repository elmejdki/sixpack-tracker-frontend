import { SET_MEASUREMENTS, ADD_MEASUREMENT } from '../action_types';

export default (state = [], action) => {
  switch (action.type) {
    case SET_MEASUREMENTS:
      return action.measurements;
    case ADD_MEASUREMENT:
      return [
        ...state,
        action.measurement,
      ];
    default:
      return state;
  }
};
