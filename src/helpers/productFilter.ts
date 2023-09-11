import { Product } from '../types/Product';

export const productFilter = (products: Product[], query: string) => {
  const preparedQuery = query.toLowerCase().trim();

  const productsIncludeQuery = products.filter(product => {
    const productInfo = `${product.name.toLowerCase()} ${product.screen.toLowerCase()} ${product.ram.toLowerCase()} ${String(product.price).toLowerCase()}`;

    return productInfo.includes(preparedQuery);
  });

  return productsIncludeQuery;
};
