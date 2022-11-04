import { Product } from '../types/Product';

export const getBrandNewProduct = (products: Product[]) => {
  const newProduct: Product[] = [];

  products.forEach(product => {
    if (product.discount) {
      return;
    }

    newProduct.push(product);
  });

  return newProduct;
};
