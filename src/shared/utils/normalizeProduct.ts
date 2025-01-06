import { Product } from '../../types/Product';
import { ProductItem } from '../../types/ProductItem';

export const normalizeProduct = (product: Product | ProductItem) => ({
  id: (product as Product).id || (product as ProductItem).itemId,
  name: product.name,
  image: (product as Product)?.images?.[0] || (product as ProductItem).image,
  priceRegular:
    (product as Product)?.priceRegular || (product as ProductItem)?.price,
  priceDiscount:
    (product as Product)?.priceDiscount || (product as ProductItem)?.fullPrice,
  screen: product.screen,
  capacity: product.capacity,
  ram: product.ram,
  category: product.category,
});
