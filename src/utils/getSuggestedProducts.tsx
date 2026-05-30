import { Product } from '../types/ProductType';

export const getSuggestedProducts = (item: Product, products: Product[]) => {
  return products.filter(
    // el => el.itemId.includes(item.namespaceId) && (item.capacity === el.capacity || item.color === el.color),
    el =>
      el.price >= item.priceDiscount - 50 &&
      el.price <= item.priceDiscount + 100 &&
      el.category === item.category,
  );
};
