/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

type CarouselItem = {
  url: string;
  product: string;
  undername: string;
  title: string;
  cotitle: string;
  site: string;
};

type CarouselState = {
  offset: number;
  items: CarouselItem[];
};

const initialState: CarouselState = {
  offset: 0,
  items: [
    {
      url: '/react_phone-catalog/img/slider/iphone-14-pro.png',
      site: '/phones/apple-iphone-11-pro-256gb-gold',
      product: 'iPhone 14 Pro',
      undername: 'Pro. Beyond.',
      title: 'Now available in our store!',
      cotitle: 'Be the first!',
    },
    {
      url: '/react_phone-catalog/img/slider/ipad-11-pro.png',
      site: '/tablets/apple-ipad-pro-11-2021-128gb-spacegray',
      product: 'iPad 11 Pro',
      undername: 'Pro. Beyond.',
      title: "Don't wait, get it now!",
      cotitle: 'Get it yourself!',
    },
    {
      url: '/react_phone-catalog/img/slider/apple-watch-series-6.png',
      site: '/accessories/apple-watch-series-6-40mm-space-gray',
      product: 'Apple watch series 6',
      undername: 'Pro. Beyond.',
      title: 'Only a few pieces left!',
      cotitle: 'Hurry up!',
    },
  ],
};

export const carouselSlice = createSlice({
  name: 'carousel',
  initialState,
  reducers: {
    setActiveImage: (state, action) => {
      state.offset = action.payload;
    },
    nextImage: state => {
      state.offset =
        state.offset === state.items.length - 1 ? 0 : state.offset + 1;
    },
    prevImage: state => {
      state.offset =
        state.offset === 0 ? state.items.length - 1 : state.offset - 1;
    },
  },
});

export const { setActiveImage, nextImage, prevImage } = carouselSlice.actions;
