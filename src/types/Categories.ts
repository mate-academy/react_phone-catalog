import { HOME_CATEGORIES_LIST } from '../modules/constants';

export type CategoryName = (typeof HOME_CATEGORIES_LIST)[number];
export type Categories = Record<CategoryName, number>;
