import { AppRoutes } from '../../../../enums';
import { BannerImages } from './images.enum';

type BannersType = {
  id: number,
  title: string,
  image: string,
  link: AppRoutes,
};

export const slides: BannersType[] = [
  {
    id: 0,
    title: 'Phones',
    image: BannerImages.PhonesBanner,
    link: AppRoutes.PHONES,
  },
  {
    id: 1,
    title: 'Tablets',
    image: BannerImages.TabletsBanner,
    link: AppRoutes.TABLETS,
  },
  {
    id: 2,
    title: 'Accessories',
    image: BannerImages.AccessoriesBanner,
    link: AppRoutes.ACCESSORIES,
  },
];
