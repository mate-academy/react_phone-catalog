// // /* eslint-disable no-param-reassign */
// import { createSlice } from '@reduxjs/toolkit';
// import { Product } from '../services/productType';
// // import { ProductType } from '../services/enums';

// export interface FavoritsAndCardState {
//   favorits: Product[];
//   card: Product[];
//   isLoading: boolean;
//   isError: boolean;
// }

// const initialState: FavoritsAndCardState = {
//   favorits: [],
//   card: [],
//   isLoading: false,
//   isError: false,
// };

// export const favoritesAndCardSlice = createSlice({
//   name: 'details',
//   initialState,
//   reducers: {},

//   extraReducers: builder => {
//     builder
//       .addCase(loadProductsDetail.pending, state => {
//         // eslint-disable-next-line no-param-reassign
//         state.isLoading = true;
//       })
//       .addCase(loadProductsDetail.fulfilled, (state, action) => {
//         // eslint-disable-next-line no-param-reassign
//         state.isLoading = false;
//         // eslint-disable-next-line no-param-reassign
//         state.detail = action.payload;
//       })
//       .addCase(loadProductsDetail.rejected, state => {
//         // eslint-disable-next-line no-param-reassign
//         state.isLoading = false;
//         // eslint-disable-next-line no-param-reassign
//         state.isError = true;
//       });
//   },
// });

// export default favoritesAndCardSlice.reducer;
