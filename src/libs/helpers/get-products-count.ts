import { ProductsCategories } from '../enums';
import { ProductType } from '../types';
import { ProductsCountsType } from '../types/app/products-counts.type';

const initialProductsCounts: ProductsCountsType = {
  [ProductsCategories.PHONES]: 0,
  [ProductsCategories.TABLETS]: 0,
  [ProductsCategories.ACCESSORIES]: 0,
};

export const getProductsCounts = (
  products: ProductType[],
): ProductsCountsType => (
  products.reduce(
    (counts, { category }) => {
      if (category in counts) {
        return {
          ...counts,
          [category]: counts[category] + 1,
        };
      }

      return counts;
    },
    initialProductsCounts,
  ));
