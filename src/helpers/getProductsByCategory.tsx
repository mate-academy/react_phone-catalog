import { UpgratedProduct } from "../types/UpgratedProduct";

export const getProductsByCategory = (
  products: UpgratedProduct[],
  category: string,
) => {
  return [...products].filter(product => product.category === category);
};
