import { getProducts } from './httpClient';

export const getHotPriceProducts = async () => {
  const res = await getProducts();

  return [...res].slice(0, 12)
    .sort((product1, product2) => {
      return (product2.fullPrice - product2.price)
        - (product1.fullPrice - product1.price);
    });
};
