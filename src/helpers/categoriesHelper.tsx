import { CategoryDescription } from '../types/Category';

export const categoryImageMap: Record<string, string> = {
  phones: 'img/categories/category-phones.png',
  tablets: 'img/categories/category-tablets.png',
  accessories: 'img/categories/category-accessories.png',
};

export const categoryBannerMap: Record<string, string> = {
  phones: 'img/banners/banner-phones.png',
  tablets: 'img/banners/banner-tablets.png',
  accessories: 'img/banners/banner-accessories.png',
};

export const categoryDescriptionMap: Record<string, CategoryDescription> = {
  phones: {
    title: 'Discover the latest smartphones!',
    subtitle: 'Stay connected with style.',
  },
  tablets: {
    title: 'Power and portability combined!',
    subtitle: 'Explore our new tablet range.',
  },
  accessories: {
    title: 'Upgrade your gear today!',
    subtitle: 'Perfect additions for every device.',
  },
};
