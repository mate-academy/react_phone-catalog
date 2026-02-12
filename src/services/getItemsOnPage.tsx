import { Product } from '../types/Product';

export const getItemsOnPage = (
  perPage: string | null,
  currPage: number | string,
  products: Product[],
): Product[] => {
  let newProducts = [...products];

  switch (perPage) {
    case '4':
    case '8':
    case '16':
      newProducts = newProducts.splice(+perPage * (+currPage - 1), +perPage);
      break;

    default:
      break;
  }

  return newProducts;
};
