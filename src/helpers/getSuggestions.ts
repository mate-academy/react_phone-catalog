import { Product } from '../types/Product';

export const getSuggestedProducts = (
  allProducts: Product[],
  currentProductId: string,
  numberOfSuggestions: number,
) => {
  const productsCopy = allProducts
    .filter(product => product.id !== currentProductId);

  const randomProducts = [];

  for (let i = 0; i < numberOfSuggestions; i += 1) {
    const randomIndex = Math.floor(Math.random() * productsCopy.length);
    const selectedProduct = productsCopy.splice(randomIndex, 1)[0];

    randomProducts.push(selectedProduct);
  }

  return randomProducts;
};
