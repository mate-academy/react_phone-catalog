import { Product } from '../types/Product';

export const filterProducts = (
  products: Product[],
  query: string,
) => {
  const normalQuery = query.toLowerCase().trim();
  const fewWords = normalQuery.split(' ');

  const productsIsIncludesQuery = products.filter(product => {
    const productName = product.name.toLowerCase();
    const productScreen = product.screen.toLowerCase();
    const productPrice = String(product.price).toLowerCase();
    const productRam = product.ram.toLowerCase();

    return fewWords.every(word => (
      productName.includes(word) || productScreen.includes(word)
       || productPrice.includes(word) || productRam.includes(word)
    ));
  });

  return productsIsIncludesQuery;
};
