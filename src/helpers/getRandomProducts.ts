import { ProductInfo } from '../types/ProductInfo';

export const getRandomProducts = (
  category: string,
  count: number,
  products: ProductInfo[],
): ProductInfo[] => {
  const filteredProducts = products.filter(
    product => product.category === category,
  );

  if (filteredProducts.length <= count) {
    return filteredProducts;
  }

  const randomProducts: ProductInfo[] = [];
  const availableProducts = [...filteredProducts];

  while (randomProducts.length < count) {
    const randomIndex = Math.floor(Math.random() * availableProducts.length);

    randomProducts.push(availableProducts[randomIndex]);

    availableProducts.splice(randomIndex, 1);
  }

  return randomProducts;
};
