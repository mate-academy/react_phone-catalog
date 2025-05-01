import { ROUTES } from '@routes/index';
import { BannerSliderItem } from 'types/bannerSliderTypes';

import sliderImg1 from '/img/banner-iphone.png';
import sliderImg2 from '/img/banner-phones.png';
import sliderImg3 from '/img/banner-tablets.png';
import sliderImg4 from '/img/banner-accessories.png';

export const BannerSliderItems: BannerSliderItem[] = [
  {
    type: 'main',
    title: 'Now available in our store!',
    subtitle: 'Be the first!',
    textBtn: 'Order now',
    phoneName: 'iPhone 14 Pro',
    tagName: 'Pro. Beyond.',
    image: sliderImg1,
    alt: 'Iphone 14 Pro',
    link: ROUTES.PHONES,
  },
  { image: sliderImg2, alt: 'Slide 2', link: ROUTES.PHONES },
  { image: sliderImg3, alt: 'Slide 3', link: ROUTES.TABLETS },
  { image: sliderImg4, alt: 'Slide 4', link: ROUTES.ACCESSORIES },
];
