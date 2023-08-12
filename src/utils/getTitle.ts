import { ProductType } from '../types/ProductType';

export const getTitle = (type: ProductType) => {
  switch (type) {
    case ProductType.phone:
      return 'Mobile phones';

    case ProductType.tablet:
      return 'Tablets';

    case ProductType.accessory:
      return 'Accessories';

    default:
      return '';
  }
};
