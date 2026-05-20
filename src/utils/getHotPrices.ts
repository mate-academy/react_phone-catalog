import { Product } from '@/features/products/types/product';
import { ProductDetails } from '@/features/products/types/productDetails';

export const getHotPrices = (
  products: Product[],
  details: ProductDetails[],
  limit: number,
) => {
  return products
    .map(product => {
      const matched = details.find(d => d.id === product.itemId);

      return {
        ...product,
        priceRegular: matched?.priceRegular,
        priceDiscount: matched?.priceDiscount,
      };
    })
    .filter(p => p.priceRegular && p.priceDiscount)
    .sort(
      (a, b) =>
        b.priceRegular! -
        b.priceDiscount! -
        (a.priceRegular! - a.priceDiscount!),
    )
    .slice(0, limit);
};
