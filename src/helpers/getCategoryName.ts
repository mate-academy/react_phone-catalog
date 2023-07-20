import { ProductType } from '../types/ProductType';

export const getCategoryName = (type: ProductType) => {
  switch (type) {
    case ProductType.phone:
      return 'phones';

    case ProductType.tablet:
      return 'tablets';

    case ProductType.accessory:
      return 'accessories';

    default:
      return '';
  }
};
