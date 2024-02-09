import { IPhone } from '../types';

export const getMultipleRandomPhones = (arr: IPhone[], num: number) => {
  const shuffled = [...arr].sort(() => 0.5 - Math.random());

  return shuffled.slice(0, num);
};
