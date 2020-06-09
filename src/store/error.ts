import { AnyAction } from 'redux';

const SET_ERROR_MESSAGE = 'SET_ERROR_MESSAGE';

export  const setErrorMessage = (errorMessage: string) => ( {type:  SET_ERROR_MESSAGE, errorMessage} );

const initialState = {
  errorMessage: '',
}

const errorReducer = (state = initialState, action: AnyAction) => {
    switch (action.type) {
    case SET_ERROR_MESSAGE:
      return {
        ...state,
        errorMessage: action.errorMessage,
      };

      default:
        return state;
    }
  }

  export default errorReducer;
