import { Product } from '../types/Product';

export const getSuggestedProducts = (products: Product[]) => {
  const randomProducts = [];
  const totalProducts = products.length;

  for (let i = 0; i < totalProducts; i += 1) {
    const randomIndex = Math.floor(Math.random() * totalProducts);
    const randomProduct = products[randomIndex];

    randomProducts.push(randomProduct);
  }

  return randomProducts;
};
