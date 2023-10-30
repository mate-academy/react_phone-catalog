type ChangeQueryAction = { type: 'query/CHANGE', payload: string };

const change = (query: string): ChangeQueryAction => (
  { type: 'query/CHANGE', payload: query }
);

const initialQuery = '';

type Action = ChangeQueryAction;

const queryReducer = (query = initialQuery, action: Action) => {
  switch (action.type) {
    case 'query/CHANGE':
      return action.payload;

    default:
      return query;
  }
};

export default queryReducer;
export const actions = { change };
