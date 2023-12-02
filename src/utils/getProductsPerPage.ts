import { PerPage } from '../types/PerPage';

export const getProductsPerPage = (
  productPerPage: PerPage,
  total: number,
) => {
  switch (productPerPage) {
    case 'all':
      return total;
    case '16':
      return 16;
    case '8':
      return 8;
    case '4':
      return 4;

    default:
      return 4;
  }
};
