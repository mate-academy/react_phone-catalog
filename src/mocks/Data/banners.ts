import phonesBanner from '/img/banners/banner-phones.svg';
import tabletsBanner from '/img/banners/banner-tablets.svg';
import accsBanner from '/img/banners/banner-accessories.svg';

export const banners: Banner[] = [
  {
    id: 0,
    name: 'phones',
    banner: phonesBanner,
    title: 'Mobile phones',
    link: '/phones',
  },
  {
    id: 1,
    name: 'tablets',
    banner: tabletsBanner,
    title: 'Tablets',
    link: '/tablets',
  },
  {
    id: 2,
    name: 'accessories',
    banner: accsBanner,
    title: 'Accessories',
    link: '/accessories',
  },
];
