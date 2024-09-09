import { createSelector } from '@reduxjs/toolkit';
import { CategoriesEnum, CateroryItemsType } from '../types/category';
import { RoutePaths } from '../../../../shared/config/routeConfig';
import { StateSchema } from '../../../../app/providers/StoreProvider/config/StateSchema';

export const getCateroryItems = createSelector(
  (state: StateSchema) => state.categories.countProducts,
  ({ phones, tablets, accessories }) => {
    const categoriesItemList: CateroryItemsType[] = [
      {
        imagePath: 'img/categories/phones.png',
        link: `${RoutePaths.products}${CategoriesEnum.PHONES}`,
        title: CategoriesEnum.PHONES,
        count: phones,
      },
      {
        imagePath: 'img/categories/tablets.png',
        link: `${RoutePaths.products}${CategoriesEnum.TABLETS}`,
        title: CategoriesEnum.TABLETS,
        count: tablets,
      },
      {
        imagePath: 'img/categories/accessories.png',
        link: `${RoutePaths.products}${CategoriesEnum.ACCESSORIES}`,
        title: CategoriesEnum.ACCESSORIES,
        count: accessories,
      },
    ];

    return categoriesItemList;
  },
);
