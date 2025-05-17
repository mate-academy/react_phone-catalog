export type ErrorItem = {
  id: string;
  message: string;
};

export type ErrorState = {
  errors: ErrorItem[];
};

type ErrorAction =
  | { type: 'ADD_ERROR'; payload: ErrorItem }
  | { type: 'REMOVE_ERROR'; payload: string }
  | { type: 'CLEAR_ERRORS' };

export const initialErrorState: ErrorState = {
  errors: [],
};

export const errorReducer = (state: ErrorState, action: ErrorAction) => {
  switch (action.type) {
    case 'ADD_ERROR':
      return {
        ...state,
        errors: [...state.errors, action.payload],
      };

    case 'REMOVE_ERROR':
      return {
        ...state,
        errors: state.errors.filter(error => error.id !== action.payload),
      };

    case 'CLEAR_ERRORS':
      return {
        ...state,
        errors: [],
      };

    default:
      return state;
  }
};
