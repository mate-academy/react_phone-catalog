import { Product } from '../types/Product';

export const filterProducts = (products: Product[], query: string) => {
  const normalizedQuery = query.toLowerCase().trim();

  const productsIncludeQuery = products.filter(product => {
    const productInfo = `${product.name.toLowerCase()} ${product.screen.toLowerCase()} ${product.ram.toLowerCase()} ${String(product.price).toLowerCase()}`;

    return productInfo.includes(normalizedQuery);
  });

  return productsIncludeQuery;
};
