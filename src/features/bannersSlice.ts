import {createSlice, PayloadAction, Slice} from "@reduxjs/toolkit";

type BannerState = {
  banners: string[];
};

const initialState: BannerState = {
  banners: [],
};

export const bannersSlice: Slice<BannerState> = createSlice({
  name: "banners",
  initialState,
  reducers: {
    setBanners: (state, {payload}: PayloadAction<string[]>) => {
      state.banners = payload;
    },
  },
});

export const {reducer, actions} = bannersSlice;
