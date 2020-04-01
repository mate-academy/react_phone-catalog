import axios from 'axios';
import { dynamicUrlCreator } from '../../utils/apiHelper';
import {
  fetchPhonesStart,
  fetchPhonesSuccess,
  fetchPhonesError,
} from './phoneDetailActions';

export const fetchPhonesDetail = (id: string) => (dispatch: any) => {
  dispatch(fetchPhonesStart());
  axios
    .get(dynamicUrlCreator(id))
    .then(response => dispatch(fetchPhonesSuccess(response.data)))
    .catch(error => dispatch(fetchPhonesError(error)));
};
