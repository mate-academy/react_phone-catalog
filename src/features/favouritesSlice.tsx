import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { TypeCard } from '../types/TypeCard';

export interface T {
  favouritesPhones: TypeCard[];
  // phonesInCart: TypeCard[];
  // selectedPhone: ItemTypeCard | null;
  // searchFilter: string;
}

export const initialState: T = {
  favouritesPhones: [],
  // phonesInCart: [],
  // selectedPhone: null,
  // searchFilter: '',
};

// export const selectPhone = createAsyncThunk(
//   'phones/id',
//   async (id: string) => {
//     const response = await fetch(
//       `https://mate-academy.github.io/react_phone-catalog/_new/products/${id}.json`,
//     );

//     const data = await response.json();

//     return data;
//   },
// );

export const favouritesSlice = createSlice({
  name: 'favourites',
  initialState,
  reducers: {
    addFavouritePhones: (state, action) => {
      // localStorage.setItem('favourites', JSON.stringify(
      //   [...state.favouritesPhones, action.payload],
      // ));

      return {
        ...state,
        favouritesPhones: [...state.favouritesPhones, action.payload],
      };
    },

    deleteFavouritePhones: (state, action: PayloadAction<TypeCard>) => {
      // localStorage.setItem('favourites', JSON.stringify(
      //   state.favouritesPhones
      //     .filter(card => card.id !== action.payload.id),
      // ));

      return {
        ...state,
        favouritesPhones: state.favouritesPhones
          .filter(card => card.id !== action.payload.id),
      };
    },

    // addPhonesInCart: (state, action) => {
    //   // const oldCart = localStorage.getItem('cart') || '';
    //   // const newCart: TypeCard[] = JSON.parse(oldCart);

    //   // newCart.push(action.payload);
    //   // localStorage.setItem('cart', JSON.stringify(newCart));

    //   // localStorage.setItem('cart', JSON.stringify(
    //   //   [...state.phonesInCart, action.payload],
    //   // ));

    //   return {
    //     ...state,
    //     phonesInCart: [...state.phonesInCart, action.payload],
    //   };
    // },

    // deletePhonesInCart: (state, action: PayloadAction<TypeCard>) => {
    //   // const oldCart = localStorage.getItem('cart') || '';
    //   // const newCart: TypeCard[] = JSON.parse(oldCart);

    //   // localStorage.setItem('cart', JSON.stringify(
    //   //   newCart.filter(item => item.id !== action.payload.id),
    //   // ));

    //   // localStorage.setItem('cart', JSON.stringify(
    //   //   state.phonesInCart
    //   //     .filter(card => card.id !== action.payload.id),
    //   // ));

    //   return {
    //     ...state,
    //     phonesInCart: state.phonesInCart
    //       .filter(card => card.id !== action.payload.id),
    //   };
    // },

    // setSearchFilter: (state, action) => {
    //   return {
    //     ...state,
    //     searchFilter: action.payload,
    //   };
    // },
  },

  // extraReducers: (builder) => {
  //   /* eslint-disable no-param-reassign */
  //   builder.addCase(selectPhone.fulfilled, (state, action) => {
  //     state.selectedPhone = action.payload;
  //   });
  // },
});

export default favouritesSlice.reducer;
export const {
  addFavouritePhones,
  deleteFavouritePhones,
  // addPhonesInCart,
  // deletePhonesInCart,
  // setSearchFilter,
} = favouritesSlice.actions;
