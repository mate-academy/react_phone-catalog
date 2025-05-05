export type ErrorMessage = string | null;

export type ErrorState = {
  message: ErrorMessage;
};

type ErrorAction =
  | { type: 'SET_ERROR'; payload: ErrorMessage }
  | { type: 'CLEAR_ERROR' };

export const initialErrorState: ErrorState = {
  message: null,
};

export const errorReducer = (state: ErrorState, action: ErrorAction) => {
  switch (action.type) {
    case 'SET_ERROR':
      return {
        ...state,
        message: action.payload,
      };

    case 'CLEAR_ERROR':
      return {
        ...state,
        message: null,
      };

    default:
      return state;
  }
};
