import type { Product, Category, ProductDetails } from '../types';
import { getData } from './client';

export function getProducts() {
  return getData<Product[]>('products.json');
}

export function getProductsByCategory(category: Category): Promise<Product[]> {
  return getProducts().then(products =>
    products.filter(product => product.category === category),
  );
}

export function getProductDetails(
  productId: string,
): Promise<ProductDetails | undefined> {
  return getProducts().then(products => {
    const currentProduct = products.find(
      product => product.itemId === productId,
    );

    if (!currentProduct) {
      return undefined;
    }

    return getData<ProductDetails[]>(`${currentProduct.category}.json`).then(
      details => details.find(detailsItem => detailsItem.id === productId),
    );
  });
}

export function getNewestProducts(): Promise<Product[]> {
  return getProducts().then(products =>
    [...products]
      .sort((ProductA, productB) => productB.year - ProductA.year)
      .slice(0, 12),
  );
}

export function getDiscountProducts(): Promise<Product[]> {
  return getProducts().then(products =>
    [...products]

      .sort(
        (productA, productB) =>
          (productB.fullPrice - productB.price) / productB.fullPrice -
          (productA.fullPrice - productA.price) / productA.fullPrice,
      )
      .slice(0, 12),
  );
}
