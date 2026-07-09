import bannerPhone from '../../../../public/img/banner-phones.png';
import bannerAccessories from '../../../../public/img/banner-accessories.png';
import bannerTablets from '../../../../public/img/banner-tablets.png';

export const mainBanners = [
  {
    src: bannerPhone,
    alt: 'Phones banner',
    title: 'Pro shots daily',
    subtitle: 'Pro-level cameras and performance you can trust.',
    button: 'Explore Phones',
    link: '/phones',
  },
  {
    src: bannerAccessories,
    alt: 'Accessories banner',
    title: 'Finish your setup',
    subtitle: 'Essential gadgets that make your life easier.',
    button: 'Shop Accessories',
    link: '/accessories',
  },
  {
    src: bannerTablets,
    alt: 'Tablets banner',
    title: 'Create anywhere',
    subtitle: 'Power for creativity and fun, wherever you go.',
    button: 'View Tablets',
    link: '/tablets',
  },
];
