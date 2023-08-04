import { PayloadAction, Slice, createSlice } from '@reduxjs/toolkit';
import { Product } from '../type/Product';

export interface StateProps {
  basketItem: Product[];
}

const initialState: StateProps = {
  basketItem: [],
};

export const basketSlice: Slice<StateProps> = createSlice({
  name: 'favorite',
  initialState,
  reducers: {
    addAllBasket: (state, action: PayloadAction<Product[]>) => {
      return {
        ...state,
        basketItem: action.payload,
      };
    },
    addItemBasket: (state, action: PayloadAction<Product>) => {
      const itemExists = state.basketItem
        .some(item => item.id === action.payload.id);

      if (itemExists) {
        return {
          ...state,
          basketItem: state.basketItem.map(item => {
            if (item.id === action.payload.id) {
              if (Object.hasOwnProperty.call(item, 'quantity')) {
                return { ...item, quantity: item.quantity + 1 };
              }

              return { ...item, quantity: 2 };
            }

            return { ...item };
          }),
        };
      }

      return {
        ...state,
        basketItem: [...state.basketItem, action.payload],
      };
    },
    removeAllItems: (state) => {
      return {
        ...state,
        basketItem: [],
      };
    },
    removeItemInBasket: (state, action: PayloadAction<Product>) => {
      return {
        ...state,
        basketItem: state.basketItem.map(item => {
          if (item.id === action.payload.id) {
            if (Object.hasOwnProperty.call(item, 'quantity')
              && item.quantity > 0) {
              return { ...item, quantity: item.quantity - 1 };
            }

            return { ...item, quantity: item.quantity - 1 };
          }

          return item;
        }),
      };
    },
    removeItemFromBasket: (state, action: PayloadAction<Product>) => {
      return {
        ...state,
        basketItem: state.basketItem
          .filter(item => item.id !== action.payload.id),
      };
    },
  },
});

export const {
  addItemBasket,
  removeItemInBasket,
  addAllBasket,
  removeItemFromBasket,
  removeAllItems,
} = basketSlice.actions;
export default basketSlice.reducer;
