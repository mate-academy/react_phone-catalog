import { ProductType } from '../types/ProductType';

export const getCategoryLinkPath = (productType: ProductType) => {
  switch (productType) {
    case ProductType.PHONE:
      return '/phone';

    case ProductType.TABLET:
      return '/tablets';

    case ProductType.ACCESSORY:
      return '/accessories';

    default:
      return '';
  }
};
