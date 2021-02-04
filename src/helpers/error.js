import { setError, removeError } from '../actions/error';
import { removeDelay } from '../usefull_vars';

const errorHandler = (dispatch, message, isError) => {
  dispatch(setError({
    message,
    isError,
  }));

  setTimeout(() => {
    dispatch(removeError());
  }, removeDelay);

  return {
    error: isError,
  };
};

export default errorHandler;
