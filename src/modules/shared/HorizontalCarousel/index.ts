import { HorizontalCarouselProvider } from './HorizontalCarouselContext';
import { NextButton } from './NextButton';
import { PrevButton } from './PrevButton';
import { View } from './View';

export const HorizontalCarousel = Object.assign(HorizontalCarouselProvider, {
  View,
  NextButton,
  PrevButton,
});
