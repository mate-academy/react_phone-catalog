import { ProductType } from '../types';

const RANDOM_PRODUCTS_COUNT = 10;

export const getRandomProducts = (
  products: ProductType[],
  count = RANDOM_PRODUCTS_COUNT,
) => {
  const length = Math.min(count, products.length);

  const productsCopy = [...products];

  const randomProducts = [];

  for (let i = 0; i < length; i += 1) {
    const randomIndex = Math.floor(Math.random() * productsCopy.length);
    const selectedProduct = productsCopy.splice(randomIndex, 1)[0];

    randomProducts.push(selectedProduct);
  }

  return randomProducts;
};
