import { ProductType } from '../types/ProductType';

export const getCategoryTitle = (productType: ProductType) => {
  switch (productType) {
    case ProductType.PHONE:
      return 'Mobile phones';

    case ProductType.TABLET:
      return 'Tablets';

    case ProductType.ACCESSORY:
      return 'Accessories';

    default:
      return '';
  }
};
