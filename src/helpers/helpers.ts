import { Product } from '../utils/types/Product';

export const getSuggestedProducts = (
  products: Product[],
  size: number,
): Product[] => {
  if (products.length === 0) {
    return [];
  }

  const items = [...products];
  const newItems = [];

  const maxSize = Math.min(size, items.length);

  for (let i = 0; i < maxSize; i++) {
    const idx = Math.floor(Math.random() * items.length);

    newItems.push(items[idx]);
    items.splice(idx, 1);
  }

  return newItems;
};

export const scrollTop = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
};

export const getTotalPriceOfProducts = (items: Product[]) => {
  const totalPriceOfProducts = items.reduce((acc, cartItem) => {
    const quantity = cartItem.quantity || 0;

    return acc + quantity * cartItem.price;
  }, 0);

  return totalPriceOfProducts;
};

export const getTotalAmountOfItems = (items: Product[]) => {
  const totalAmountOfItems = items.reduce((acc, cartItem) => {
    return acc + (cartItem.quantity || 0);
  }, 0);

  return totalAmountOfItems;
};
