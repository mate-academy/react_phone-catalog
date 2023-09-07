import { Product } from '../types/Product';

export const getRandomProducts = (
  allProducts: Product[],
  numberOfSuggestions: number,
) => {
  const productsCopy = [...allProducts];
  const randomProducts = [];

  for (let i = 0; i < numberOfSuggestions; i += 1) {
    const randomIndex = Math.floor(Math.random() * productsCopy.length);
    const selectedProduct = productsCopy.splice(randomIndex, 1)[0];

    randomProducts.push(selectedProduct);
  }

  return randomProducts;
};
