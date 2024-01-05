import { PerPage } from '../types/PerPage';

export const getProductsPerPage = (productPerPage: PerPage) => {
  switch (productPerPage) {
    case '8':
      return 8;
    case '4':
      return 4;

    default:
      return 16;
  }
};
