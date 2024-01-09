import { ProductType } from '../types/ProductType';

import phoneImgPath from '../images/category/phones.png';
import tabletImgPath from '../images/category/tablets.png';
import accessoriesImgPath from '../images/category/accessories.png';

export const getCategoryData = (productType: ProductType) => {
  switch (productType) {
    case ProductType.PHONE:
      return {
        title: 'Mobile phones',
        imgPath: phoneImgPath,
        linkPath: '/phone',
      };

    case ProductType.TABLET:
      return {
        title: 'Tablets',
        imgPath: tabletImgPath,
        linkPath: '/tablets',
      };

    case ProductType.ACCESSORY:
      return {
        title: 'Accessories',
        imgPath: accessoriesImgPath,
        linkPath: '/accessories',
      };

    default:
      return {
        title: '',
        imgPath: '',
        linkPath: '',
      };
  }
};
