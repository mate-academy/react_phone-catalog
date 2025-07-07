import { Product } from '../Components/types/Product';
// import products from '../../public/api/products.json';

export function getNewPhones(prdcts: Product[], year = 2022) {
  return prdcts.reduce((acc, product) => {
    if (
      product.year === year &&
      !acc.some(({ color }) => color === product.color)
    ) {
      acc.unshift(product);
    }

    return acc;
  }, [] as Product[]);
}

export function getHotPrices(prdcts: Product[]) {
  return prdcts.reduce((acc, product) => {
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

export function sortProducts(
  prdcts: Product[],
  sortField: string | null,
): Product[] {
  const copiedProducts = [...prdcts];

  if (sortField) {
    copiedProducts.sort((a, b) => {
      switch (sortField) {
        case 'title':
          return a.name.localeCompare(b.name);

        case 'year':
          return b.year - a.year;

        case 'price':
          return a.price - b.price;

        default:
          return 0;
      }
    });
  }

  return copiedProducts;
}
