import { createSlice } from '@reduxjs/toolkit';

export const favoritesSlice = createSlice({
  name: 'favorites',
  initialState:
    JSON.parse(localStorage.getItem('favorites')) !== null
      ? JSON.parse(localStorage.getItem('favorites'))
      : [],
  reducers: {
    addProduct: (state, action) => {
      state.push(action.payload);
    },
    removeProduct: (state, action) => {
      return state.filter(id => id !== action.payload);
    },
  },
});
