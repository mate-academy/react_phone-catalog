import { ProductListItem, Phone, Tablet, Accessory } from '../types/product';

type GenericProduct =
  | (Omit<Phone, 'category'> & { category: 'phones' })
  | (Omit<Tablet, 'category'> & { category: 'tablets' })
  | (Omit<Accessory, 'category'> & { category: 'accessories' });

export const mapToProductListItem = (
  product: GenericProduct,
  index: number,
): ProductListItem => ({
  id: index + 1,
  itemId: product.id,
  category: product.category,
  name: product.name,
  fullPrice: product.priceRegular,
  price: product.priceDiscount,
  screen: product.screen,
  capacity: product.capacity,
  color: product.color,
  ram: product.ram,
  year: product.year || 0,
  image: product.images[0],
});
