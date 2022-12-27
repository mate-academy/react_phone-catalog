import { Product } from '../types/Product';

export const getHotPriceProducts = (products: Product[]) => {
  return products
    .filter(product => product.discount > 0)
    .sort((product1, product2) => (
      ((product2.price / 100) * product2.discount)
      - ((product1.price / 100) * product1.discount)
    ));
};

export const getBrandNewProducts = (products: Product[]) => {
  return products
    .filter(product => product.discount === 0)
    .sort((product1, product2) => (
      ((product2.price / 100) * product2.discount)
      - ((product1.price / 100) * product1.discount)
    ));
};

export const getSuggestedProducts = (
  products: Product[],
  category?: string,
  productOnScreen?: string,
) => {
  return products
    .filter(product => (product.type === category)
      && (productOnScreen !== product.id))
    .sort((product1, product2) => (
      product2.price - product1.price
    ));
};

export const getProductLink = (searchProduct: Product) => {
  switch (searchProduct.type) {
    case 'phone':
      return `../phones/${searchProduct.id}`;

    case 'tablet':
      return `../tablets/${searchProduct.id}`;

    case 'accessories':
      return `../accessories/${searchProduct.id}`;

    default:
      return '';
  }
};
