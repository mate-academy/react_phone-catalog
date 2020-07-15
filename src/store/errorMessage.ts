import { Action } from 'redux';

const LOAD_ERROR = 'LOAD_ERROR';

type LoadError = Action<typeof LOAD_ERROR> & { errorMessage: string };

export const loadError = (errorMessage: string): LoadError => ({
  type: LOAD_ERROR,
  errorMessage,
});

export const errorReducer = (errorMessage = '', action: LoadError) => {
  switch (action.type) {
    case LOAD_ERROR:
      return action.errorMessage;

    default:
      return errorMessage;
  }
};
