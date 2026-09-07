import { Product } from '../types/Product';

export const productsToShown = (
  products: Product[],
  perPage: string | null,
  currentPage: string | number,
) => {
  let visibleProducts = [...products];

  // if (perPage) {
  //   visibleProducts.splice(+perPage * (+currentPage - 1), +perPage);
  // }
  switch (perPage) {
    case '4':
    case '8':
    case '16':
      visibleProducts = visibleProducts.splice(
        +perPage * (+currentPage - 1),
        +perPage,
      );
      break;

    default:
      break;
  }

  return visibleProducts;
};
