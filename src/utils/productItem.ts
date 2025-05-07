import { CartItem } from '../types/CartItem';
import { Product } from '../types/Product';

export const productItem = {
  getColor(color: string) {
    return color.toLowerCase().replaceAll(' ', '-');
  },

  getLink(namespaceId: string, capacity: string, color: string) {
    const normalizedColor = this.getColor(color);

    return `${namespaceId}-${capacity}-${normalizedColor}`.toLowerCase();
  },

  getTitle(productID = '') {
    const title = [];

    for (const el of productID.split('-')) {
      if (el.includes('gb')) {
        title.push(el.toUpperCase());
        continue;
      }

      title.push(el[0].toUpperCase() + el.slice(1));
    }

    return title.join(' ');
  },

  getTechSpecs(product: Product) {
    const {
      screen,
      resolution,
      processor,
      ram: RAM,
      capacity,
      camera,
      zoom,
      cell,
    } = product;

    return {
      screen,
      resolution,
      processor,
      ram: RAM,
      capacity,
      camera,
      zoom,
      cell,
    };
  },

  updateLikedProducts(
    setter: React.Dispatch<React.SetStateAction<string[]>>,
    productId: string,
  ) {
    setter(prevItems => {
      const newItems = [...prevItems];
      const isIncluded = prevItems.findIndex(item => item === productId);

      return isIncluded >= 0
        ? newItems.filter(item => item !== productId)
        : [...newItems, productId];
    });
  },

  updateAddedProducts(
    setter: React.Dispatch<React.SetStateAction<CartItem[]>>,
    productId: string,
  ) {
    setter(prevItems => {
      const newItems = [...prevItems];
      const isIncluded = prevItems.findIndex(({ item }) => item === productId);

      return isIncluded >= 0
        ? newItems.filter(({ item }) => item !== productId)
        : [...newItems, { item: productId, count: 1 }];
    });
  },

  isLiked(likedItems: string[], productId: string) {
    return likedItems.findIndex(item => item === productId) >= 0;
  },

  isAdded(addedItems: CartItem[], productId: string) {
    const addedItemsIds = addedItems.map(({ item }) => item);

    return addedItemsIds.findIndex(item => item === productId) >= 0;
  },
};
