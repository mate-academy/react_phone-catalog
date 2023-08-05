// eslint-disable-next-line import/no-cycle
import { RootState } from './store';

export const phoneCardSelector = (
  state: RootState,
) => state.phonesCarded.value;

export const favoriteProductsSelector = (
  state: RootState,
) => state.phonesFavorites.value;

export const productsSelector = (
  state: RootState,
) => state.products.value;

export const productsStatusSelector = (
  state: RootState,
) => state.products.status;

export const selectedPhoneSelector = (
  state: RootState,
) => state.selectedPhone.value;

export const selectedPhoneStatusSelector = (
  state: RootState,
) => state.selectedPhone.status;

export const searchBarSelector = (
  state: RootState,
) => state.searchBar.value;

export const phonesSelector = (
  state: RootState,
) => state.phones.value;

export const phonesStatusSelector = (
  state: RootState,
) => state.phones.status;

export const phonesDetailsSelector = (
  state: RootState,
) => state.phoneDetails.value;

export const phonesDetaildStatusSelector = (
  state: RootState,
) => state.phoneDetails.status;
