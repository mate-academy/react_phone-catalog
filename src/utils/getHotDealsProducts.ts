import { Product } from '../types/Product';
import { ProductItem } from '../types/ProductItem';
import { getProductItemByID } from './getProductItemByID';

export function getHotDealsProducts(
  products: Product[],
  productItems: ProductItem[],
) {
  const newProducts: Product[] = products.map(prod => {
    let discount = 0;
    const prodItem = getProductItemByID(productItems, prod.itemId);

    if (prodItem) {
      discount = prodItem.priceRegular - prodItem.priceDiscount;
    }

    return {
      ...prod,
      discount: discount ? discount : 0,
      discountPrice: prodItem ? prodItem.priceDiscount : 0,
    };
  });

  const sorted = newProducts.sort((a, b) => {
    if (a.discount && b.discount) {
      return b.discount - a.discount;
    }

    return 0;
  });

  const cleaned: Product[] = sorted.map(item => {
    const { discount, ...rest } = item;

    return rest;
  });

  return cleaned;
}
