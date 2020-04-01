import { ActionType } from '../../utils/constants';

export const fetchPhonesStart = () => ({
  type: ActionType.FETCH_PHONES_START,
});

export const fetchPhonesSuccess = (phone: Phone[]) => ({
  type: ActionType.FETCH_PHONES_SUCCESS,
  payload: {
    phone,
  },
});

export const fetchPhonesError = (error: string) => ({
  type: ActionType.FETCH_PHONES_ERROR,
  payload: {
    error,
  },
});
