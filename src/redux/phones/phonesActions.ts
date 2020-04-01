import { ActionType } from '../../utils/constants';

export const fetchPhonesStart = () => ({
  type: ActionType.FETCH_PHONES_START,
});

export const fetchPhonesSuccess = (phones: Phone[]) => ({
  type: ActionType.FETCH_PHONES_SUCCESS,
  payload: {
    phones,
  },
});

export const fetchPhonesError = (error: string) => ({
  type: ActionType.FETCH_PHONES_ERROR,
  payload: {
    error,
  },
});
