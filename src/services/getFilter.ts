import { Product } from '../types/Product';

type PropsParams = {
  products: Product[];
  query: string | null;
  sort: string | null;
};

export const getFilter = ({ products, query, sort }: PropsParams) => {
  let preparedProduct = [...products];

  const preparedQuery = query?.trim().toLowerCase();

  if (preparedQuery) {
    preparedProduct = preparedProduct.filter(product => {
      return product.name.toLowerCase().includes(preparedQuery);
    });
  }

  if (sort) {
    preparedProduct = preparedProduct.sort((product1, product2) => {
      switch (sort) {
        case 'name':
          return product1.name.localeCompare(product2.name);

        case 'age':
          return product1.year - product2.year;

        case 'price':
          return product1.price - product2.price;

        default:
          return 0;
      }
    });
  }

  return preparedProduct;
};
