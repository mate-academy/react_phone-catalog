import { ItemsOnPage } from '../types/ItemsOnPage';
import { SortBy } from '../types/SortBy';
import { UpgradedProduct } from '../types/UpgradedProduct';

export const getBrandNewProducts = (products: UpgradedProduct[]) => {
  return [...products]
    .filter(product => product.year === 2022)
    .sort((product1, product2) => product2.year - product1.year);
};

export const getHotPriceProducts = (products: UpgradedProduct[]) => {
  return [...products].sort(
    (product1, product2) =>
      product2.fullPrice -
      product2.price -
      (product1.fullPrice - product1.price),
  );
};

export const getProductsByCategory = (
  products: UpgradedProduct[],
  category: string,
) => {
  return [...products].filter(product => product.category === category);
};

export const getSuggestedProducts = (
  products: UpgradedProduct[],
  id: string,
) => {
  const newProducts = [...products].filter(product => product.itemId !== id);
  const index = Math.floor(Math.random() * (newProducts.length - 10));

  return newProducts.slice(index, index + 10);
};

export const getTrimmedProducts = (
  products: UpgradedProduct[],
  query: string,
  sort?: keyof typeof SortBy,
  perPage?: ItemsOnPage,
  page = 1,
): [UpgradedProduct[], number] => {
  let newProducts = [...products];

  newProducts = newProducts.filter(product =>
    product.name.toLowerCase().includes(query.toLowerCase()),
  );

  const count = newProducts.length;

  switch (sort) {
    case 'age':
      newProducts.sort((product1, product2) => product2.year - product1.year);
      break;

    case 'name':
      newProducts.sort((product1, product2) =>
        product1.name.localeCompare(product2.name),
      );
      break;

    case 'price':
      newProducts.sort((product1, product2) => product1.price - product2.price);
      break;

    default:
      break;
  }

  switch (perPage) {
    case '4':
    case '8':
    case '16':
      newProducts = newProducts.splice(+perPage * (page - 1), +perPage);
      break;

    default:
      break;
  }

  return [newProducts, count];
};
