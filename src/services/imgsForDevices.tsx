import { getSliderImages } from './getSliderImages';
import { Picture } from '../types/Picture';

export const imgsMobile: Picture[] = [
  {
    id: 1,
    url: `${getSliderImages().mobileImage1}`,
    name: 'slider-1',
    alt: 'IPhone 14 Pro',
  },
  {
    id: 2,
    url: `${getSliderImages().mobileImage2}`,
    name: 'slider-3',
    alt: 'IPhone 14 Pro',
  },
  {
    id: 3,
    url: `${getSliderImages().mobileImage3}`,
    name: 'slider-4',
    alt: 'IPhone 14 Pro',
  },
];

export const imgs: Picture[] = [
  {
    id: 1,
    url: `${getSliderImages().tabletImage1}`,
    name: 'slider-1',
    alt: 'IPhone 14 Pro',
  },
  {
    id: 2,
    url: `${getSliderImages().tabletImage2}`,
    name: 'slider-3',
    alt: 'IPhone 14 Pro',
  },
  {
    id: 3,
    url: `${getSliderImages().tabletImage3}`,
    name: 'slider-4',
    alt: 'IPhone 14 Pro',
  },
];
