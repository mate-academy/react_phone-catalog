import { Product } from '../types/Product';

export const getPath = ({ type, id }: Pick<Product, 'type' | 'id'>) => {
  let dir: string;

  switch (type) {
    case 'phone':
      dir = 'phones';
      break;
    case 'tablet':
      dir = 'tablets';
      break;
    case 'accessory':
      dir = 'accessories';
      break;
    default:
      return '/';
  }

  return `/${dir}/${id}`;
};
