import { setActiveSlide } from '../../../app/features/activeSlideSlice';
import { setDirection } from '../../../app/features/directionSlice';
import { AppDispatch } from '../../../app/store';

export interface Args {
  activeSlide: number;
  dispatch: AppDispatch;
}

export function swipeRight({ activeSlide, dispatch }: Args) {
  dispatch(setDirection('right'));

  if (activeSlide === 3) {
    dispatch(setActiveSlide(1));
  } else {
    dispatch(setActiveSlide(activeSlide + 1));
  }
}

export function swipeLeft({ activeSlide, dispatch }: Args) {
  dispatch(setDirection('left'));

  if (activeSlide === 1) {
    dispatch(setActiveSlide(3));
  } else {
    dispatch(setActiveSlide(activeSlide - 1));
  }
}
