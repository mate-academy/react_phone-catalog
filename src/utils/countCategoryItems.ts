import products from '../../public/api/products.json';

export const countItemsInCategory = (category: string) =>
  products.filter(item => item.category === category).length;
