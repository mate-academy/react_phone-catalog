import { SortFields } from '../enums';
import { ProductType, SearchParamsType } from '../types';

type GetPreperedProductsType = (
  products: ProductType[],
  params: SearchParamsType,
) => ProductType[];

export const getPreperedProducts: GetPreperedProductsType = (
  products, {
    query,
    sort,
  },
) => {
  let preperedProducts = [...products];

  if (query) {
    preperedProducts = preperedProducts.filter(({ name }) => {
      const preperedQuery = query.toLowerCase().trim();
      const preperedName = name.toLowerCase().trim();

      return preperedName.includes(preperedQuery);
    });
  }

  if (sort) {
    preperedProducts = preperedProducts.sort((productA, productB) => {
      switch (sort) {
        case SortFields.Alphabetically:
          return productA[sort].localeCompare(productB[sort]);

        case SortFields.Cheapest:
          return productA[sort] - productB[sort];

        case SortFields.Newest:
          return productA.year - productB.year;

        default:
          return 0;
      }
    });
  }

  return preperedProducts;
};
