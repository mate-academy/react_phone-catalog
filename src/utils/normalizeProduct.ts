import {
  NormalizedProduct,
  Product,
  ProductDetails,
} from '../interfaces/Product';

export const normalizeProduct = (
  item: Product | ProductDetails | NormalizedProduct,
): NormalizedProduct => {
  if ('itemId' in item) {
    // Product format (products.json)
    return {
      id: item.itemId,
      category: item.category,
      name: item.name,
      price: item.price,
      fullPrice: item.fullPrice,
      image: item.image,
      screen: item.screen,
      capacity: item.capacity,
      ram: item.ram,
    };
  }

  if ('priceRegular' in item) {
    // ProductDetails format (phones.json etc)
    return {
      id: item.id,
      category: item.category,
      name: item.name,
      price: item.priceDiscount,
      fullPrice: item.priceRegular,
      image: item.images[0],
      screen: item.screen,
      capacity: item.capacity,
      ram: item.ram,
    };
  }

  // already NormalizedProduct
  return item;
};
