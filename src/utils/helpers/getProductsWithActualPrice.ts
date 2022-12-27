import { Product } from 'src/types/Product';

export function getProductsWithActualPrice(products: Product[]) {
  return products.map(el => {
    if (el.discount > 0) {
      return {
        ...el,
        priceAfterDiscount: el.price - ((el.price / 100) * el.discount),
      };
    }

    return { ...el };
  });
}
