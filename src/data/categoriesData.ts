import { ROUTES } from '@routes/index';
import { countItemsInCategory } from '@utils/countCategoryItems';
import { CategoryItemTypes } from 'types/categoryTypes';
import { CategoryColors } from '@enums/CategoryColors';

import categoryPhoneImg from '/img/category-phones.webp';
import categoryTabletImg from '/img/category-tablets.png';
import categoryAccessoriesImg from '/img/category-accessories.png';

export const categoryItems: CategoryItemTypes[] = [
  {
    title: 'Mobile phones',
    link: ROUTES.PHONES,
    image: categoryPhoneImg,
    tag: 'phones',
    count: countItemsInCategory('phones'),
    bgColor: CategoryColors.FIRST_BOX,
  },
  {
    title: 'Tablets',
    link: ROUTES.TABLETS,
    image: categoryTabletImg,
    tag: 'tablets',
    count: countItemsInCategory('tablets'),
    bgColor: CategoryColors.SECOND_BOX,
  },
  {
    title: 'Accessories',
    link: ROUTES.ACCESSORIES,
    image: categoryAccessoriesImg,
    tag: 'accessories',
    count: countItemsInCategory('accessories'),
    bgColor: CategoryColors.THIRD_BOX,
  },
];
