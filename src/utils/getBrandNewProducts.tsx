import { getProducts } from './httpClient';

export const getBrandNewProducts = async () => {
  const res = await getProducts();

  return [...res]
    .sort((product1, product2) => {
      return (product2.fullPrice - product1.fullPrice);
    });
};
