import { Product } from '../../types/Product';
import { ProductItem } from '../../types/ProductItem';

export const normalizeProduct = (product: Product | ProductItem) => ({
  id: (product as Product).itemId || (product as ProductItem).id,
  name: product.name,
  image: (product as ProductItem)?.images?.[0] || (product as Product).image,
  priceRegular:
    (product as ProductItem)?.priceRegular || (product as Product)?.price,
  priceDiscount:
    (product as ProductItem)?.priceDiscount || (product as Product)?.fullPrice,
  screen: product.screen,
  capacity: product.capacity,
  ram: product.ram,
  category: product.category,
});
