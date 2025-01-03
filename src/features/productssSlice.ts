// import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
// import { getJson } from '../helpers/fetchData';
// import { Category } from '../types/category';
// import { TabAccessPhone } from '../types/tabAccessPhones';

// export type AllProducts = {
//   phones: TabAccessPhone[];
//   tablets: TabAccessPhone[];
//   accessories: TabAccessPhone[];
//   loading: boolean;
//   error: boolean;
// };

// const initialState: AllProducts = {
//   phones: [],
//   tablets: [],
//   accessories: [],
//   loading: false,
//   error: false,
// };

// const phonesUrl = 'phones.json';
// const tabletsUrl = 'tablets.json';
// const accessoriesUrl = 'accessories.json';

// export const fetchAllProducts = createAsyncThunk(
//   'products/fetchAllProducts',
//   async () => {
//     const phones = await getJson<TabAccessPhone[]>(phonesUrl);
//     const tablets = await getJson<TabAccessPhone[]>(tabletsUrl);
//     const accessories = await getJson<TabAccessPhone[]>(accessoriesUrl);

//     return { phones, tablets, accessories };
//   },
// );

// export const fetchProducts = createAsyncThunk(
//   'products/fetchProducts',
//   async (category: Category) => {
//     let products: TabAccessPhone[] = [];

//     switch (category) {
//       case Category.PHONES:
//         products = await getJson(phonesUrl);
//         break;
//       case Category.TABLETS:
//         products = await getJson(tabletsUrl);
//         break;
//       case Category.ACCESSORIES:
//         products = await getJson(accessoriesUrl);
//         break;
//       default:
//         break;
//     }

//     return products;
//   },
// );

// const productsSlice = createSlice({
//   name: 'products',
//   initialState,
//   reducers: {},
//   extraReducers: builder => {
//     builder
//       .addCase(fetchAllProducts.pending, state => {
//         const currentState = state;

//         currentState.loading = true;
//       })
//       .addCase(fetchAllProducts.fulfilled, (state, action) => {
//         const currentState = state;

//         currentState.loading = false;
//         currentState.phones = action.payload.phones;
//         currentState.tablets = action.payload.tablets;
//         currentState.accessories = action.payload.accessories;
//       })
//       .addCase(fetchAllProducts.rejected, state => {
//         const currentState = state;

//         currentState.loading = false;
//         currentState.error = true;
//       })
//       .addCase(fetchProducts.pending, state => {
//         const currentState = state;

//         currentState.loading = true;
//       })
//       .addCase(fetchProducts.fulfilled, (state, action) => {
//         const currentState = state;

//         currentState.loading = false;
//         currentState[action.meta.arg] = action.payload;
//       })
//       .addCase(fetchProducts.rejected, state => {
//         const currentState = state;

//         currentState.loading = false;
//         currentState.error = true;
//       });
//   },
// });

// export default productsSlice.reducer;
