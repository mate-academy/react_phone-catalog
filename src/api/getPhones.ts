import { client } from '../utils/fetchClient';

export const getPhones = () => {
  return client.get('/phones.json');
};
