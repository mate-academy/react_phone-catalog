import { CategoryName, Product } from '../types';

export const chooseCurrentProducts = (
  categoryName: string,
  phones: Product[],
  tablets: Product[],
  accessories: Product[],
) => {
  switch (categoryName) {
    case CategoryName.Tablets:
      return tablets;

    case CategoryName.Accessories:
      return accessories;

    default:
      return phones;
  }
};
