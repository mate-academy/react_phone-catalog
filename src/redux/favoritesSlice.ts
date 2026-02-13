/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AllProduct } from '../types/UnionType';

interface State {
  data: AllProduct[];
}
const myStorage = window.localStorage;

const initialState: State = {
  data: JSON.parse(myStorage.getItem('favorites') || '[]'),
};

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    changeFavorites: (state: State, action: PayloadAction<AllProduct>) => {
      const newData = action.payload;
      const newDataId = 'itemId' in newData ? newData.itemId : newData.id;
      const findProd = state.data.find(item =>
        'itemId' in item ? item.itemId === newDataId : item.id === newDataId,
      );

      if (findProd) {
        state.data = state.data.filter(item =>
          'itemId' in item ? item.itemId !== newDataId : item.id !== newDataId,
        );
      } else {
        state.data.push(newData);
      }

      myStorage.setItem('favorites', JSON.stringify(state.data));
    },
  },
});

export const { changeFavorites } = favoritesSlice.actions;

export default favoritesSlice.reducer;
