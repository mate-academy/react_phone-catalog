import { CategoryDescription } from '../types/Category';

export const categoryImageMap: Record<string, string> = {
  phones: new URL('/public/img/categories/category-phones.png', import.meta.url)
    .href,
  tablets: new URL(
    '/public/img/categories/category-tablets.png',
    import.meta.url,
  ).href,
  accessories: new URL(
    '/public/img/categories/category-accessories.png',
    import.meta.url,
  ).href,
};

export const categoryBannerMap: Record<string, string> = {
  phones: new URL('/public/img/banners/banner-phones.png', import.meta.url)
    .href,
  tablets: new URL('/public/img/banners/banner-tablets.png', import.meta.url)
    .href,
  accessories: new URL(
    '/public/img/banners/banner-accessories.png',
    import.meta.url,
  ).href,
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
