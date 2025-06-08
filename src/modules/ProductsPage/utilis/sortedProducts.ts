import { Category, Product } from '../../../types/productTypes';

export const sortByNewestModel = (items: Product[]) => {
  return [...items].sort((a, b) => {
    return b.year - a.year;
  });
};

export const sortByBiggestDiscount = (items: Product[]) => {
  return [...items].sort((a, b) => {
    const priceA = a.fullPrice - a.price;
    const priceB = b.fullPrice - b.price;

    return priceB - priceA;
  });
};

export const countItemsByCategory = (
  productCategory: Category,
  products: Product[],
) => {
  const category = products.filter(item => item.category === productCategory);

  return {
    category,
    length: category.length,
  };
};

export const randomProducts = (arrayOfProduct: Product[]) => {
  const shuffled = [...arrayOfProduct];

  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));

    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }

  return shuffled;
};

export const findProducts = (
  items: Product[],
  findProduct: string,
): Product[] | [] => {
  const query = findProduct.toLowerCase();
  const filteredProducts = items.filter(item => {
    const foundedItem =
      item.name.toLowerCase().includes(query) ||
      item.itemId.toLowerCase().includes(query) ||
      item.color.toLowerCase().includes(query) ||
      item.capacity.toLowerCase().includes(query);

    return foundedItem;
  });

  return filteredProducts;
};
