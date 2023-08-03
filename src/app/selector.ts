import {
  FavoritePhoneReducer,
} from '../features/PhonesFavorites/phonesFavoritesSlice';
import { CardPhoneReducer } from '../features/PhonesInCard/phonesInCardSlice';
import { SeachBarReducer } from '../features/SearchBar/searchBarSlice';
import { PhonesState } from '../features/phones/phonesSlice';
import { ProductsState } from '../features/products/productsSlice';
import {
  SelectedPhoneReducer,
} from '../features/selectedPhone/selectedPhoneSlice';

export type State = {
  phones: PhonesState;
  selectedPhone: SelectedPhoneReducer;
  phoneDetails: PhonesState;
  phonesFavorites: FavoritePhoneReducer;
  phonesCarded: CardPhoneReducer;
  searchBar: SeachBarReducer;
  products: ProductsState;
};

export const phoneCardSelector = (
  state: State,
) => state.phonesCarded.value;

export const favoriteProductsSelector = (
  state: State,
) => state.phonesFavorites.value;
