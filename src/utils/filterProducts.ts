import { Product } from '@/types/Product';

export type SortOptions = 'newest' | 'alphabetically' | 'cheapest';

interface Options {
  yearRange?: {
    from: number;
    to: number;
  };
  withDiscount?: boolean;
  sortOption?: SortOptions;
  pageOptions?: {
    start: number;
    end: number;
  };
}

export function filterProducts(
  products: Product[],
  { yearRange, withDiscount, sortOption, pageOptions }: Options,
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

  if (sortOption) {
    productsCopy.sort((productA, productB) => {
      switch (sortOption) {
        case 'cheapest':
          const priceA = productA.price ?? productA.fullPrice;
          const priceB = productB.price ?? productB.fullPrice;

          return priceA - priceB;

        case 'alphabetically':
          return productA.name
            .toLowerCase()
            .localeCompare(productB.name.toLowerCase());

        case 'newest':
          return productB.year - productA.year;

        default:
          return 0;
      }
    });
  }

  if (pageOptions) {
    productsCopy = productsCopy.slice(pageOptions.start, pageOptions.end);
  }

  return productsCopy;
}
