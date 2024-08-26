/* eslint-disable max-len */
import { createSelector } from '@reduxjs/toolkit';
import { HomePageSchema } from '../types/homePageSchema';
import { getHomePageState } from './getHomePageState';

export const getHotPriceProducts = createSelector(
  getHomePageState,
  (homePageState: HomePageSchema) => homePageState.hotProducts,
);
