import { Product } from '../types/Product';

export const filterProducts = (products: Product[], query: string) => {
  const normalizedQuery = query.toLowerCase().trim();
  const queryWords = normalizedQuery.split(' ');

  const productsIcludesQuery = products.filter(product => {
    const productName = product.name.toLowerCase();
    const productScreen = product.screen.toLowerCase();
    const productRam = product.ram.toLowerCase();
    const productPrice = String(product.price).toLowerCase();

    return queryWords.every(word => (
      productName.includes(word)
       || productScreen.includes(word)
       || productPrice.includes(word)
       || productRam.includes(word)
    ));
  });

  return productsIcludesQuery;
};
