import { Product } from '../components/types/Product';

export function getNewPhones(products: Product[], year = 2022) {
  return products.reduce((acc, product) => {
    if (
      product.year === year &&
      !acc.some(({ color }) => color === product.color)
    ) {
      acc.unshift(product);
    }

    return acc;
  }, [] as Product[]);
}

export function getHotPrices(products: Product[]) {
  return products.reduce((acc, product) => {
    if (
      product.category === 'phones' &&
      product.price < product.fullPrice &&
      !acc.some(({ color }) => color === product.color)
    ) {
      acc.push(product);
    }

    return acc;
  }, [] as Product[]);
}

export function sortProducts(products: Product[], sortField: string | null) {
  const prepearedProducts = [...products];

  if (sortField) {
    prepearedProducts.sort((product1, product2) => {
      switch (sortField) {
        case 'title':
          return product1.name.localeCompare(product2.name);

        case 'age':
          return product2.year - product1.year;

        case 'price':
          return product1.price - product2.price;

        default:
          return 0;
      }
    });
  }

  return prepearedProducts;
}

export function getSuggestedProducts(products: Product[], count = 10) {
  const randomProducts: Product[] = [];

  for (let i = 1; i <= count; i++) {
    randomProducts.push(products[Math.floor(Math.random() * products.length)]);
  }

  return randomProducts;
}
