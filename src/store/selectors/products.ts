//#regin imports
import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '..';
import { Product } from '../../modules/shared/types/Product';
//#endregion

export const selectProductById = (id: string) =>
  createSelector(
    (state: RootState) => state.products.items,
    products => products.find(product => product.itemId === id),
  );

export const selectCategoryById = (id: string) =>
  createSelector(
    (state: RootState) => state.products.items,
    products => products.find(product => product.itemId === id)?.category,
  );

export const selectProductsByCategory = (category: string) => {
  return createSelector(
    (state: RootState) => state.products.items,
    products => products.filter(item => item.category === category),
  );
};

export const selectCategoryCounts = createSelector(
  (state: RootState) => state.products.items,
  products => ({
    phones: products.filter(p => p.category === 'phones').length,
    tablets: products.filter(p => p.category === 'tablets').length,
    accessories: products.filter(p => p.category === 'accessories').length,
  }),
);

const selectProductItems = (state: RootState) => state.products.items;

const selectTopProductsSelector = (
  compareFn: (a: Product, b: Product) => number,
  limit = 20,
) =>
  createSelector(selectProductItems, products =>
    [...products].sort(compareFn).slice(0, limit),
  );

export const selectNewestProducts = selectTopProductsSelector(
  (product1, product2) => (product2.year || 0) - (product1.year || 0),
);

export const selectHottestProducts = selectTopProductsSelector(
  (product1, product2) => {
    const firstDiscount = product1.fullPrice - product1.price;
    const secondDiscount = product2.fullPrice - product2.price;

    return secondDiscount - firstDiscount;
  },
);
