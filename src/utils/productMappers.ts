import { DetailedBaseProduct } from '../types/DetailedProductTypes';
import { Product } from '../types/Product';

export const mapDetailedToShortProduct = (
  detailedProduct: DetailedBaseProduct,
): Product => {
  return {
    category: detailedProduct.category,
    itemId: detailedProduct.namespaceId,
    name: detailedProduct.name,
    fullPrice: detailedProduct.priceRegular,
    price: detailedProduct.priceDiscount,
    screen: detailedProduct.screen,
    capacity: detailedProduct.capacity,
    color: detailedProduct.color,
    ram: detailedProduct.ram,
    image: detailedProduct.images[0],
  } as Product;
};
