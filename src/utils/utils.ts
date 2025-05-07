import { ProductGeneral } from '../types/ProductGeneral';
import { ErrorText } from '../constants/errorText';
import { CartItem } from '../types/CartItem';

export const getItemsPerScroll = (width: number) => {
  if (width > 1020) {
    return 4;
  } else if (width > 773) {
    return 3;
  } else if (width > 464) {
    return 2;
  } else {
    return 1;
  }
};

export const getCatagoryNameANDError = (category: string) => {
  switch (category) {
    case 'tablets':
      return { name: 'Tablets', errorText: ErrorText.noTablets };
    case 'phones':
      return { name: 'Mobile phones', errorText: ErrorText.noPhones };
    default:
    case 'accessories':
      return { name: 'Accessories', errorText: ErrorText.noAccessories };
  }
};

export const getCountOf = {
  itemsInCart(
    addedItems: ({ item: ProductGeneral; count: number } | CartItem)[],
  ) {
    return addedItems.reduce((prev, { count }) => prev + count, 0);
  },

  sumInCart(
    addedItems: {
      item: ProductGeneral;
      count: number;
    }[],
  ) {
    return addedItems.reduce((prev, { item, count }) => {
      const price = item.price * count;

      return prev + price;
    }, 0);
  },
};
