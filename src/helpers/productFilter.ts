import { Product } from '../types/Product';

export const productFilter = (products: Product[], query: string) => {
  const preparedQuery = query.toLowerCase();

  return products.filter(product => {
    const productInfo = `${product.name.toLowerCase()} ${product.screen.toLowerCase()} ${product.ram.toLowerCase()} ${String(product.price).toLowerCase()}`;

    return productInfo.includes(preparedQuery);
  });
};
