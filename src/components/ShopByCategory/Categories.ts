import PhonesCategoryImg from './images/category-phones.webp';
import TabletsCategoryImg from './images/category-tablets.jpg';
import AccessoriesCategoryImg from './images/category-accessories.jpg';

export interface Category {
  id: string;
  nameKey: string; // Translation key for category name
  slug: string; // URL slug
  image: string; // Category image
  color: string; // Background color
  link: string; // Navigation link
}

export const Categories: Category[] = [
  {
    id: '1',
    nameKey: 'categoryPhones', // Translation key
    slug: 'phones',
    image: PhonesCategoryImg,
    color: '#6D6474', // Purple-gray from Figma
    link: '/phones',
  },
  {
    id: '2',
    nameKey: 'categoryTablets', // Translation key
    slug: 'tablets',
    image: TabletsCategoryImg,
    color: '#8D8D92', // Gray from Figma
    link: '/tablets',
  },
  {
    id: '3',
    nameKey: 'categoryAccessories', // Translation key
    slug: 'accessories',
    image: AccessoriesCategoryImg,
    color: '#973D5F', // Pink-red from Figma
    link: '/accessories',
  },
];
