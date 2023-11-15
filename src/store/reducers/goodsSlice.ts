/* eslint-disable no-param-reassign */
import {
  createSlice,
  PayloadAction,
  createAsyncThunk,
} from '@reduxjs/toolkit';
import { Good } from '../../types/Good';
import { getData } from '../../helpers/httpClient';

type GoodsState = {
  goods: Good[],
  goodsToBag: Good[],
  goodsToWishlist: Good[],
  currentGood: Good | null,
  isLoaded: boolean,
  hasError: boolean,
};

const initialState: GoodsState = {
  goods: [],
  goodsToBag: [],
  goodsToWishlist: [],
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
    addToBag: (state, action: PayloadAction<Good>) => {
      state.goodsToBag.push(action.payload);
    },
    removeFromBag: (state, action: PayloadAction<number>) => {
      state.goodsToBag = state.goodsToBag
        .filter(good => good.id !== action.payload);
    },
    addToWishList: (state, action: PayloadAction<Good>) => {
      state.goodsToWishlist.push(action.payload);
    },
    removeFromWishlist: (state, action: PayloadAction<number>) => {
      state.goodsToWishlist = state.goodsToWishlist
        .filter(good => good.id !== action.payload);
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
  addToWishList,
  removeFromWishlist,
  currentGood,
} = goodsSlice.actions;
