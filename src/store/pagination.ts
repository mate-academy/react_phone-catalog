import { Action } from 'redux';

const SET_PAGE = 'SET_PAGE';
const SET_PER_PAGE = 'SET_PER_PAGE';

type SetPageAction = Action<typeof SET_PAGE> & { page: number };
type SetPerPageAction = Action<typeof SET_PER_PAGE> & { perPage: number };

export const setPage = (page: number): SetPageAction => ({
  type: SET_PAGE,
  page,
});

export const setPerPage = (perPage: number): SetPerPageAction => ({
  type: SET_PER_PAGE,
  perPage,
});

type AllowedActions = SetPageAction | SetPerPageAction;

type PaginationState = {
  page: number;
  perPage: number;
};

const defaultPaginationState = {
  page: 1,
  perPage: 16,
};

const queryReducer = (
  paginationState = defaultPaginationState,
  action: AllowedActions,
): PaginationState => {
  switch (action.type) {
    case SET_PAGE:
      return {
        ...paginationState,
        page: action.page,
      };

    case SET_PER_PAGE:
      return {
        ...paginationState,
        perPage: action.perPage,
        page: 1,
      };
    default:
      return paginationState;
  }
};

export default queryReducer;
