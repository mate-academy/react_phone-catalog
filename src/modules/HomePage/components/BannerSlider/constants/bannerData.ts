import { ProductLink } from '../../../../shared/types/ProductLink';

const bannerPhotos: ProductLink[] = [
  {
    id: 'Iphone 14',
    title: 'Iphone 14',
    image: 'img/bannerImg/iphone-14-pro.jpg',
    link: 'apple-iphone-14-128gb-midnight',
  },
  {
    id: 'Ipad Pro 11',
    title: 'Ipad Pro 11',
    image: 'img/bannerImg/ipads.jpg',
    link: 'apple-ipad-pro-11-2021-128gb-spacegray',
  },
  {
    id: 'Apple Watch 6',
    title: 'Apple Watch 6',
    image: 'img/bannerImg/apple-watch.jpg',
    link: 'apple-watch-series-6-40mm-silver',
  },
];

export const extendedProducts = [
  bannerPhotos[bannerPhotos.length - 1],
  ...bannerPhotos,
  bannerPhotos[0],
];
