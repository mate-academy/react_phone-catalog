import { createSelector } from '@reduxjs/toolkit';
import {
  getAccessoriesCount,
  getPhonesCount,
  getTabletsCount,
} from '../../../Product';
import { CategoriesEnum, CateroryItemsType } from '../types/category';
import { RoutePaths } from '../../../../shared/config/routeConfig';

export const getCateroryItems = createSelector(
  [getPhonesCount, getTabletsCount, getAccessoriesCount],
  (phones, tables, accessories) => {
    const categoriesItemList: CateroryItemsType[] = [
      {
        imagePath: '/img/categories/phones.png',
        link: `${RoutePaths.products}${CategoriesEnum.PHONES}`,
        title: CategoriesEnum.PHONES,
        count: phones,
      },
      {
        imagePath: '/img/categories/tablets.png',
        link: `${RoutePaths.products}${CategoriesEnum.TABLETS}`,
        title: CategoriesEnum.TABLETS,
        count: tables,
      },
      {
        imagePath: '/img/categories/accessories.png',
        link: `${RoutePaths.products}${CategoriesEnum.ACCESSORIES}`,
        title: CategoriesEnum.ACCESSORIES,
        count: accessories,
      },
    ];

    return categoriesItemList;
  },
);
