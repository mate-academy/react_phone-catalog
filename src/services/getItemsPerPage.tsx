import { Product } from '../types/Product';

export const getItemsPerPage = (
  perPage: string | null,
  currPage: number | string,
  products: Product[],
): Product[] => {
  let paginatedProducts = [...products];

  switch (perPage) {
    case '4':
    case '8':
    case '16':
      paginatedProducts = paginatedProducts.splice(
        +perPage * (+currPage - 1),
        +perPage,
      );
      break;

    default:
      break;
  }

  return paginatedProducts;
};
