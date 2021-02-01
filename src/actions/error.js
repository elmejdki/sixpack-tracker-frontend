import { SET_ERROR, REMOVE_ERROR } from '../action_types';

export const login = error => ({
  type: SET_ERROR,
  error,
});

export const logout = () => ({
  type: REMOVE_ERROR,
});
