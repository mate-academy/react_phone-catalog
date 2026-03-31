import { Product } from '../types/product';
import { ProductDetails } from '../types/productDetails';

export const useProductsWithDetails = (
  products: Product[],
  details: ProductDetails[],
) => {
  return products.map(product => {
    const matched = details.find(d => d.id === product.itemId);

    return {
      ...product,
      priceRegular: matched?.priceRegular,
      priceDiscount: matched?.priceDiscount,
    };
  });
};
