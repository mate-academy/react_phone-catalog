import { ProductDetails } from '../types/types';

export const getProductById = (
  allProducts: ProductDetails[],
  pathname: string,
) => {
  const productId = pathname.split('/').slice(-1)[0];

  const product = allProducts
    .flatMap(data => data)
    .find(({ id }) => id === productId);

  return product ? product : null;
};
