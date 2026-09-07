/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AllProduct } from '../types/UnionType';

interface State {
  data: { item: AllProduct; count: number }[];
}
const myStorage = window.localStorage;
const initialState: State = {
  data: JSON.parse(myStorage.getItem('cart') || '[]'),
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addCart: (state, action: PayloadAction<AllProduct>) => {
      const newData = action.payload;
      const newDataId = 'itemId' in newData ? newData.itemId : newData.id;
      const findProd = state.data.find(item =>
        'itemId' in item.item
          ? item.item.itemId === newDataId
          : item.item.id === newDataId,
      );
      let data = state.data;

      if (findProd) {
        data = data.map(product => {
          if (product.item.id === findProd.item.id) {
            return {
              item: product.item,
              count: product.count + 1,
            };
          }

          return product;
        });
      } else {
        data.push({ item: newData, count: 1 });
      }

      myStorage.setItem('cart', JSON.stringify(data));
      state.data = data;
    },
    deleteCart: (state, action) => {
      const id = action.payload;
      let data = state.data;

      data = data.filter(item =>
        'itemId' in item.item ? item.item.itemId !== id : item.item.id !== id,
      );

      myStorage.setItem('cart', JSON.stringify(data));
      state.data = data;
    },
    addCount: (state, action) => {
      const id = action.payload;
      let data = state.data;

      data = data.map(item => {
        if (
          'itemId' in item.item ? item.item.itemId === id : item.item.id === id
        ) {
          return {
            item: item.item,
            count: item.count + 1,
          };
        }

        return item;
      });

      myStorage.setItem('cart', JSON.stringify(data));
      state.data = data;
    },
    decCount: (state, action) => {
      const id = action.payload;
      let data = state.data;

      data = data.map(item => {
        if (
          'itemId' in item.item ? item.item.itemId === id : item.item.id === id
        ) {
          if (item.count - 1 === 0) {
            return item;
          }

          return {
            item: item.item,
            count: item.count - 1,
          };
        }

        return item;
      });

      myStorage.setItem('cart', JSON.stringify(data));
      state.data = data;
    },
    clearCart: state => {
      state.data = [];
      myStorage.setItem('cart', '[]');
    },
  },
});

export const { addCart, deleteCart, addCount, decCount, clearCart } =
  cartSlice.actions;

export default cartSlice.reducer;
