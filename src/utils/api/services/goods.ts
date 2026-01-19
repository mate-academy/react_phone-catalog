import { client } from '../fetchClient';

export const getGoods = <T>(sourse: string) => {
  return client.get<T[]>(sourse);
};
