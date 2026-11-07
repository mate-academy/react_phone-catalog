import { CATEGORY } from '../constants/category';
import type { Product } from '../types/Product';

export function getLimitedProducts(products: Product[], sameCategory = false) {
  let phonesCount = 0;
  let tabletsCount = 0;
  let accessoriesCount = 0;

  if (sameCategory) {
    return products.slice(0, 15);
  }

  const limitedProducts: Product[] = [];

  for (const product of products) {
    if (product.category === CATEGORY.PHONES && phonesCount < 5) {
      phonesCount++;
      limitedProducts.push(product);
    }

    if (product.category === CATEGORY.TABLETS && tabletsCount < 5) {
      tabletsCount++;
      limitedProducts.push(product);
    }

    if (product.category === CATEGORY.ACCESSORIES && accessoriesCount < 5) {
      accessoriesCount++;
      limitedProducts.push(product);
    }
  }

  return limitedProducts;
}
