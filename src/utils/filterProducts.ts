import { Product } from '@/types/Product';

interface Options {
  yearRange?: {
    from: number;
    to: number;
  };
  withDiscount?: boolean;
}

export function filterProducts(
  products: Product[],
  { yearRange, withDiscount }: Options,
) {
  let productsCopy = [...products];

  if (yearRange) {
    const { from, to } = yearRange;

    productsCopy = productsCopy.filter(
      product => product.year >= from && product.year <= to,
    );
  }

  if (withDiscount) {
    productsCopy = productsCopy.filter(product => product.price);
  }

  return productsCopy;
}
