import { LOGIN, LOGOUT } from '../action_types';

export const login = token => ({
  type: LOGIN,
  token,
});

export const logout = () => ({
  type: LOGOUT,
});
