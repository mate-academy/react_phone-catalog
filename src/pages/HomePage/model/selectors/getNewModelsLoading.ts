import { createSelector } from '@reduxjs/toolkit';
import { HomePageSchema } from '../types/homePageSchema';
import { getHomePageState } from './getHomePageState';

export const getNewModelsLoading = createSelector(
  getHomePageState,
  (homePageState: HomePageSchema) => homePageState.newModelProductsLoading,
);
