import axios from 'axios';
import {
  fetchPhonesStart,
  fetchPhonesSuccess,
  fetchPhonesError,
} from './phonesActions';
import { BASE_URL } from '../../utils/constants';

export const fetchPhones = () => (dispatch: any) => {
  dispatch(fetchPhonesStart());
  axios
    .get(BASE_URL)
    .then(response => dispatch(fetchPhonesSuccess(response.data)))
    .catch(error => dispatch(fetchPhonesError(error)));
};
