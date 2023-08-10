import { Phone } from '../types/phone';
import { PhoneDetails } from '../types/phoneDetails';
import { client } from '../utils/fetchClient';

export const getData = () => {
  return client.get<Phone[]>('.json');
};

export const getPhoneDetails = (phoneId: string) => {
  return client.get<PhoneDetails>(`/${phoneId}.json`);
};

export const randomizeData = (data: Phone[]) => {
  const newArray = [...data];

  for (let i = newArray.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));

    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }

  return newArray;
};

export const getSortedProducts = (
  data: Phone[],
  sortBy: string,
) => {
  const sortedData = [...data].sort((a, b) => {
    const absolutelyDiscountA = a.fullPrice - a.price;
    const absolutelyDiscountB = b.fullPrice - b.price;

    switch (sortBy) {
      case 'new':
        return b.price - a.price;
      case 'hotPrice':
        return (absolutelyDiscountB - absolutelyDiscountA);
      case 'name':
        return a.name.localeCompare(b.name);
      case 'price':
        return a.price - b.price;
      case 'age':
      default:
        return b.year - a.year;
    }
  });

  return sortedData;
};
