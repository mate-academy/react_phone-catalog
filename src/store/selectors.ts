import { createSelector } from 'reselect';
import { TProductBase } from '@utils/types/productBase.type';

const selectPhones = (state: { phones: { phones: TProductBase[] } }) =>
  state.phones.phones;
const selectTablets = (state: { tablets: { tablets: TProductBase[] } }) =>
  state.tablets.tablets;
const selectAccessories = (state: {
  accessories: { accessories: TProductBase[] };
}) => state.accessories.accessories;

export const selectAllProducts = createSelector(
  [selectPhones, selectTablets, selectAccessories],
  (phones, tablets, accessories) => {
    return [...phones, ...tablets, ...accessories];
  },
);
