import { MenuItems } from '../types/MenuItems';
import { ProductItem } from '../types/ProductItem';
import { client } from './fetch';

export const getProductItems = {
  fetchByCategory(category: string): Promise<ProductItem[]> {
    return client.get<ProductItem[]>(`${category}.json`);
  },

  fetchAllCategories() {
    const allPromises: Promise<ProductItem[]>[] = [];

    Object.values(MenuItems).forEach(category => {
      allPromises.push(getProductItems.fetchByCategory(category));
    });

    return Promise.allSettled(allPromises);
  },

  fetchDetails(category: string, id: string): Promise<ProductItem | undefined> {
    return this.fetchByCategory(category).then((result: ProductItem[]) =>
      this.getById(result, id),
    );
  },

  getById(
    products: ProductItem[] | undefined,
    id: string,
  ): ProductItem | undefined {
    if (products) {
      return products.find(product => product.id === id);
    }

    return;
  },

  getColorVariant(
    products: ProductItem[],
    item: ProductItem,
    selectedColor: string,
  ): ProductItem | undefined {
    const { namespaceId, capacity } = { ...item };

    return products
      .filter(itm => itm.namespaceId === namespaceId)
      .filter(itm2 => itm2.capacity === capacity)
      .find(itm3 => itm3.color === selectedColor);
  },

  getCapacityVariant(
    products: ProductItem[],
    item: ProductItem,
    selectedCapacity: string,
  ): ProductItem | undefined {
    const { namespaceId, color } = { ...item };

    return products
      .filter(itm => itm.namespaceId === namespaceId)
      .filter(itm3 => itm3.color === color)
      .find(itm2 => itm2.capacity === selectedCapacity);
  },
};
