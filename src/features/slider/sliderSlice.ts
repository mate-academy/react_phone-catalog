import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { SliderState } from '../../types/SliderState';

const initialState: SliderState = {
  slides: [
    {
      id: 1,
      image: '/slider-images/banner-phones.png',
      link: '/catalog/phones/apple-iphone-14-pro-1tb-spaceblack',
    },
    {
      id: 2,
      image: '/slider-images/banner-tablets.webp',
      link: '/catalog/tablets/apple-ipad-pro-11-2021-2tb-silver',
    },
    {
      id: 3,
      image: '/slider-images/banner-accessories.webp',
      link: '/catalog/accessories/apple-watch-series-6-44mm-space-gray',
    },
  ],
  interval: 5000,
};

export const sliderSlice = createSlice({
  name: 'slider',
  initialState,
  reducers: {
    setSlides: (state, action: PayloadAction<SliderState['slides']>) => {
      state.slides = action.payload;
    },
    setInterval: (state, action: PayloadAction<number>) => {
      state.interval = action.payload;
    },
  },
});

export const { setSlides, setInterval } = sliderSlice.actions;
export default sliderSlice.reducer;
