import { fetchData } from '../../shared/utils/fetchData';

export const getDevices = (devisec: string) =>
  fetchData(`/public/api/${devisec}.json`);
