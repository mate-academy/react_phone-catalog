/* eslint-disable no-param-reassign */
import {
  createSlice,
  PayloadAction,
  createAsyncThunk,
} from '@reduxjs/toolkit';
import { getData } from '../../helpers/httpClient';

import { Good } from '../../types/Good';
import { GoodToBag } from '../../types/GoodToBag';

type GoodsState = {
  goods: Good[],
  goodsToBag: GoodToBag[],
  goodsToWishlist: Good[],
  currentGood: Good | null,
  isLoaded: boolean,
  hasError: boolean,
};

const initialState: GoodsState = {
  goods: [],
  goodsToBag: JSON.parse(
    localStorage.getItem('goodsToBag') as string,
  ) || [],
  goodsToWishlist: JSON.parse(
    localStorage.getItem('goodsToWishlist') as string,
  ) || [],
  currentGood: null,
  isLoaded: false,
  hasError: false,
};

export const init = createAsyncThunk(
  'goods/fetch',
  () => getData<Good[]>('goods'),
);

const goodsSlice = createSlice({
  name: 'goods',
  initialState,
  reducers: {
    addToBag: (state, action: PayloadAction<GoodToBag>) => {
      const updatedBag = [...state.goodsToBag, action.payload];

      state.goodsToBag = updatedBag;
      localStorage.setItem('goodsToBag', JSON.stringify(updatedBag));
    },
    removeFromBag: (state, action: PayloadAction<number>) => {
      const updatedBag = state.goodsToBag
        .filter(goodToBag => goodToBag.good.id !== action.payload);

      state.goodsToBag = updatedBag;
      localStorage.setItem('goodsToBag', JSON.stringify(updatedBag));
    },
    increaseQuantity: (state, action: PayloadAction<number>) => {
      const currentGoodToBag = state.goodsToBag.find(goodToBag => {
        return goodToBag.good.id === action.payload;
      }) as GoodToBag;

      currentGoodToBag.quantity += 1;
    },
    decreaseQuantity: (state, action: PayloadAction<number>) => {
      const currentGoodToBag = state.goodsToBag.find(goodToBag => {
        return goodToBag.good.id === action.payload;
      }) as GoodToBag;

      if (currentGoodToBag.quantity > 1) {
        currentGoodToBag.quantity -= 1;
      }
    },
    addToWishList: (state, action: PayloadAction<Good>) => {
      const updatedBag = [...state.goodsToWishlist, action.payload];

      state.goodsToWishlist = updatedBag;
      localStorage.setItem('goodsToWishlist', JSON.stringify(updatedBag));
    },
    removeFromWishlist: (state, action: PayloadAction<number>) => {
      const updatedBag = state.goodsToWishlist
        .filter(good => good.id !== action.payload);

      state.goodsToWishlist = updatedBag;
      localStorage.setItem('goodsToWishlist', JSON.stringify(updatedBag));
    },
    currentGood: (state, action: PayloadAction<string>) => {
      state.currentGood = state.goods
        .find(good => good.seoUrl === action.payload) as Good;
    },
  },
  extraReducers: builder => {
    builder.addCase(init.pending, state => {
      state.hasError = false;
      state.isLoaded = true;
    });

    builder.addCase(init.fulfilled, (state, action: PayloadAction<Good[]>) => {
      state.goods = action.payload;
      state.isLoaded = false;
    });

    builder.addCase(init.rejected, state => {
      state.isLoaded = false;
      state.hasError = true;
    });
  },
});

export default goodsSlice.reducer;
export const {
  addToBag,
  removeFromBag,
  increaseQuantity,
  decreaseQuantity,
  addToWishList,
  removeFromWishlist,
  currentGood,
} = goodsSlice.actions;
