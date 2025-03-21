/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type CarouselState = {
  containerWidth: number;
  totalWidth: number;
  hottestOffset: number;
  newestOffset: number;
  offerOffset: number;
  maxScroll: number;
  gap: number;
  itemWidth: number;
};

const initialState: CarouselState = {
  containerWidth: 0,
  totalWidth: 0,
  hottestOffset: 0,
  newestOffset: 0,
  maxScroll: 0,
  offerOffset: 0,
  gap: 16,
  itemWidth: 0,
};

export const scrollSlice = createSlice({
  name: 'scroll',
  initialState,
  reducers: {
    setContainerWidth: (state, action: PayloadAction<number>) => {
      state.containerWidth = action.payload;
    },
    setTotalWidth: (state, action: PayloadAction<number>) => {
      state.totalWidth = action.payload;
      state.maxScroll = Math.max(action.payload - state.containerWidth, 0);
    },
    setItemWidth: (state, action: PayloadAction<number>) => {
      state.itemWidth = action.payload;
    },
    resetNewestOffset: state => {
      const step = state.itemWidth + state.gap;
      const newOffset = Math.round(state.newestOffset / step) * step;

      state.newestOffset = Math.min(newOffset, state.maxScroll);
    },
    nextNewestScroll: state => {
      const nextOffset = state.newestOffset + state.itemWidth + state.gap;

      state.newestOffset =
        nextOffset >= state.maxScroll ? state.maxScroll : nextOffset;
    },
    prevNewestScroll: state => {
      state.newestOffset = Math.max(
        state.newestOffset - state.itemWidth - state.gap,
        0,
      );
    },
    resetHottestOffset: state => {
      const step = state.itemWidth + state.gap;
      const newOffset = Math.round(state.hottestOffset / step) * step;

      state.hottestOffset = Math.min(newOffset, state.maxScroll);
    },
    nextHottestScroll: state => {
      const nextOffset = state.hottestOffset + state.itemWidth + state.gap;

      state.hottestOffset =
        nextOffset >= state.maxScroll ? state.maxScroll : nextOffset;
    },
    prevHottestScroll: state => {
      state.hottestOffset = Math.max(
        state.hottestOffset - state.itemWidth - state.gap,
        0,
      );
    },
    resetOfferOffset: state => {
      const step = state.itemWidth + state.gap;
      const newOffset = Math.round(state.offerOffset / step) * step;

      state.offerOffset = Math.min(newOffset, state.maxScroll);
    },
    nextOfferScroll: state => {
      const nextOffset = state.offerOffset + state.itemWidth + state.gap;

      state.offerOffset =
        nextOffset >= state.maxScroll ? state.maxScroll : nextOffset;
    },
    prevOfferScroll: state => {
      state.offerOffset = Math.max(
        state.offerOffset - state.itemWidth - state.gap,
        0,
      );
    },
    resetScroll: state => {
      state.hottestOffset = 0;
      state.newestOffset = 0;
      state.offerOffset = 0;
    },
  },
});

export const {
  setContainerWidth,
  setTotalWidth,
  nextHottestScroll,
  nextNewestScroll,
  prevHottestScroll,
  prevNewestScroll,
  setItemWidth,
  resetHottestOffset,
  resetNewestOffset,
  resetScroll,
  resetOfferOffset,
  prevOfferScroll,
  nextOfferScroll,
} = scrollSlice.actions;
