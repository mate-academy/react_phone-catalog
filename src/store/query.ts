import { Action } from 'redux';

const SET_QUERY = 'SET_QUERY';

type SetQueryAction = Action<typeof SET_QUERY> & {
  query: string;
};

export const setQuery = (query: string) => ({
  type: SET_QUERY,
  query,
});

type AlowwedActions = SetQueryAction;

const queryReducer = (query = '', action: AlowwedActions): string => {
  switch (action.type) {
    case SET_QUERY:
      return action.query;
    default:
      return query;
  }
};

export default queryReducer;
