const SET_QUERY = 'SET_QUERY';

export const actionCreators = {
  addToCart: (query) => ({
    type: SET_QUERY,
    query,
  }),
};

const cartInitialState = {
  query: '',
};

const filterReducer = (state = cartInitialState, action) => {
  switch (action.type) {
    case SET_QUERY:
      return {
        ...state,
        query: action.query,
      };

    default:
      return state;
  }
};

export default filterReducer;
