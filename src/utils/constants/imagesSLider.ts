import { ISliderImage } from '@utils/types/sliderImage.interface';

import product1 from '../../images/slider/slider-1.webp';
import product2 from '../../images/slider/slider-2.webp';
import product3 from '../../images/slider/slider-3.webp';
import product4 from '../../images/slider/slider-4.webp';
import product5 from '../../images/slider/slider-5.webp';

export const IMAGES: ISliderImage[] = [
  {
    id: 1,
    name: 'iPhone 14 Pro',
    review: 'Pro. Beyond.',
    img: product1,
  },
  {
    id: 2,
    name: 'iPhone 12 Pro',
    review: 'Max.',
    img: product2,
  },
  {
    id: 3,
    name: 'MacBook Pro 16',
    review: 'Space. Black.',
    img: product3,
  },
  {
    id: 4,
    name: 'iPad Pro',
    review: 'Pro. Space.',
    img: product4,
  },
  {
    id: 5,
    name: 'Apple Watch Ultra',
    review: 'Ultra. Titanium.',
    img: product5,
  },
];
