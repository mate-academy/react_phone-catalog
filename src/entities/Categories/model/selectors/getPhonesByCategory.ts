import { createSelector } from '@reduxjs/toolkit';
import { CategoriesEnum } from '../types/category';
import { getAccessories, getPhones, getTablets } from '../../../Product';

export const getPhonesByCategory = (category: CategoriesEnum) =>
  createSelector(
    [getPhones, getTablets, getAccessories],
    (phones, tables, accessories) => {
      switch (category) {
        case CategoriesEnum.PHONES:
          return phones;

        case CategoriesEnum.TABLETS:
          return tables;

        case CategoriesEnum.ACCESSORIES:
          return accessories;
      }
    },
  );
