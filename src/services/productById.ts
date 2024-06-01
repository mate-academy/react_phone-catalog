import phonesDatabase from '../api/phones.json';
import tabletsDatabase from '../api/tablets.json';
import accessoriesDatabase from '../api/accessories.json';
import { ProductInfo } from '../types/ProductInfo';
import { Category } from '../types/Category';

const databases = {
  [Category.phone]: phonesDatabase,
  [Category.tablet]: tabletsDatabase,
  [Category.accessory]: accessoriesDatabase,
};

export const ProductById = (category: Category, productId: string) => {
  const database = databases[category];

  if (!database) {
    throw new Error('Invalid category');
  }

  return database.find((item: ProductInfo) => item.id === productId);
};
