import { UpgratedProduct } from '../types/UpgratedProduct';

export const getBrandNewProducts = (products: UpgratedProduct[]) => {
  return [...products].sort((a, b) => b.year - a.year || b.price - a.price);
};

export const getHotPriceProducts = (products: UpgratedProduct[]) => {
  return [...products].sort((a, b) => {
    const product2 = b.fullPrice - b.price;
    const product1 = a.fullPrice - a.price;

    return product2 - product1;
  });
};

export const getProductsByCategory = (
  products: UpgratedProduct[],
  category: string,
) => {
  return products.filter(product => product.category === category);
};

export const getSuggestedProducts = (
  products: UpgratedProduct[],
  id: string,
  category: string,
) => {
  const newProducts = products
    .filter(product => product.itemId !== id)
    .filter(product => product.category === category);
  const index = Math.floor(Math.random() * (newProducts.length - 10));

  return newProducts.slice(index, index + 10);
};
