import { IPhone } from '../types/Phone.interface';

type Sort = 'name' | 'price' | 'all' | 'year';

export const sortPhones = (
  array: IPhone[],
  sort: Sort | string,
) => {
  const prevArr = [...array].sort((a, b) => {
    switch (sort) {
      case 'name':
        return a[sort].localeCompare(b[sort]);

      case 'year':
        return b[sort] - a[sort];
      case 'price':
        return a[sort] - b[sort];
      default:
        return 0;
    }
  });

  return prevArr;
};
