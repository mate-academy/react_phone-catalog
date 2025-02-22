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

export function getRandomProducts(products: Product[], count = 10) {
  const randomProducts: Product[] = [];

  for (let i = 1; i <= count; i++) {
    randomProducts.push(products[Math.floor(Math.random() * products.length)]);
  }

  return randomProducts;
}
