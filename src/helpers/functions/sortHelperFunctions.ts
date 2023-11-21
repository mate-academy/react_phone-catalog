import { Product } from '../../type/Product';

export function filterProductsByDiscount(products: Product[]): Product[] {
  return products.filter(product => product.discount > 0);
}

export function sortProductsByAbsoluteDiscount(products: Product[]): Product[] {
  return products.sort((productA: Product, productB: Product) => {
    const absoluteDiscountA = (productA.price * productA.discount) / 100;
    const absoluteDiscountB = (productB.price * productB.discount) / 100;

    return Number(absoluteDiscountA) - Number(absoluteDiscountB);
  });
}

export function filterProductsWithoutDiscount(products: Product[]): Product[] {
  return products.filter(product => product.discount === 0);
}

export function sortProductsByPrice(products: Product[]): Product[] {
  return products.sort((productA: Product, productB: Product) => {
    return productB.price - productA.price;
  });
}

export function filterProductsByType(
  products: Product[], type: string,
): Product[] {
  return products.filter(product => product.type === type);
}

export function filterProductsById(
  products: Product[], id: string,
) {
  return products.filter(
    product => product.id !== id,
  );
}
