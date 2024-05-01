import { Category } from '../Types/Category';
import { Product } from '../Types/Product';

export const calculateProductAmount = (productsList: Product[]) => {
  return productsList.reduce(
    (amount, product) => {
      switch (product.category) {
        case Category.Phones:
          return { ...amount, phones: amount.phones + 1 };
        case Category.Tablets:
          return { ...amount, tablets: amount.tablets + 1 };
        case Category.Accessories:
          return { ...amount, accessories: amount.accessories + 1 };
        default:
          return amount;
      }
    },
    { phones: 0, tablets: 0, accessories: 0 },
  );
};
