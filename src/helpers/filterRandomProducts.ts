import { Product } from '../types/ProductCard';

export const filterRandomProducts = (products: Product[]) => {
  const finalProducts: Product[] = [];

  const amountOfProducts = products.length;

  for (let i = 0; i < 8; i++) {
    // Push a random product to the array

    let productToAdd = products[Math.ceil(amountOfProducts * Math.random())];

    while (finalProducts.includes(productToAdd)) {
      productToAdd = products[Math.ceil(amountOfProducts * Math.random())];
    }

    finalProducts.push(productToAdd);
  }

  return finalProducts;
};
