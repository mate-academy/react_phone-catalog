import { getData } from '../utils/httpClient';

export const getGoodes = (url: string) => {
  return getData(url).then(goodes => goodes);
};
