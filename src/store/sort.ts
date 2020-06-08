import { Action } from 'redux';

const SORT_BY = 'SORT_BY';

type SortByAction = Action<typeof SORT_BY> & {
  field: string;
};

export const sortBy = (field: string): SortByAction => ({ type: SORT_BY, field });

type AllowedAction = SortByAction;

type SortState = {
  field: string;
};

const defaultSortState: SortState = {
  field: 'age',
};

const sortReducer = (
  sortState = defaultSortState,
  action: AllowedAction,
): SortState => {
  switch (action.type) {
    case SORT_BY:
      return { field: action.field };
    default:
      return sortState;
  }
};

export default sortReducer;
