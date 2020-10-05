import { AnyAction } from 'redux';

const START_LOADING = 'START_LOADING';
const FINISH_LOADING = 'FINISH_LOADING';
const SET_LOADED = 'SET_LOADED';

export  const startLoading = () => ( {type:  START_LOADING} );
export const finishLoading = () => ( {type:  FINISH_LOADING} );
export const setLoaded = () => ( {type:  SET_LOADED} );

const initialState = {
  isLoading: false,
  isLoaded: false,
}

const loadingReducer = (state = initialState, action: AnyAction) => {
    switch (action.type) {
      case START_LOADING:
        return {
          ...state,
          isLoading: true,
        };

      case FINISH_LOADING:
        return {
          ...state,
          isLoading: false,
        };

      case SET_LOADED:
        return {
          ...state,
          isLoaded: true,
        };

      default:
        return state;
    }
  }

  export default loadingReducer;
