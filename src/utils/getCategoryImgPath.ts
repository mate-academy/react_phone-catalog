import { ProductType } from '../types/ProductType';
import phoneImgPath from '../images/category/phones.png';
import tabletImgPath from '../images/category/tablets.png';
import accessoriesImgPath from '../images/category/accessories.png';

export const getCategoryImgPath = (productType: ProductType) => {
  switch (productType) {
    case ProductType.PHONE:
      return phoneImgPath;

    case ProductType.TABLET:
      return tabletImgPath;

    case ProductType.ACCESSORY:
      return accessoriesImgPath;

    default:
      return '';
  }
};
