import { Product } from './Product';

export const filterPr = (
  products: Product[],
  filterBy: string,
) => {
  let newArr = [];

  switch (filterBy) {
    case 'year':
      newArr = products.sort((a, b) => b.year - a.year);
      break;

    case 'price':
      newArr = products.sort((a, b) => a.price - b.price);
      break;

    case 'random':
      newArr = products.sort(() => Math.random() - 0.5);
      break;

    case 'alphabetically':
      newArr = products.sort((a, b) => a.name.localeCompare(b.name));
      break;

    default:
      newArr = products;
  }

  return newArr;
};

export const getLengthByCategory = (products: Product[], category: string) => {
  return products.filter(product => product.category === category).length;
};

export const getCategory = (products: Product[], category: string) => {
  return products.filter(product => product.category === category);
};
