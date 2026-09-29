import { CategoryConfig } from './ShopByCategory.type';
import {
  phonesCategory,
  tabletsCategory,
  accessoriesCategory,
} from '@/shared/assets/home-page-img';
import {
  TimeManagementImg,
  WorkTimeImg,
  CalendarImg,
} from '@/shared/assets/error-img';

export const CATEGORIES_CONFIG: CategoryConfig[] = [
  {
    id: 'phones',
    title: 'Mobile phones',
    path: '/phones',
    img: phonesCategory,
    alt: 'Mobile phones category',
  },
  {
    id: 'tablets',
    title: 'Tablets',
    path: '/tablets',
    img: tabletsCategory,
    alt: 'Tablets category',
  },
  {
    id: 'accessories',
    title: 'Accessories',
    path: '/accessories',
    img: accessoriesCategory,
    alt: 'Accessories category',
  },
];

export const ERROR_CATEGORIES_CONFIG: CategoryConfig[] = [
  {
    id: 'phones',
    title: 'Mobile phones',
    path: '/phones',
    Icon: TimeManagementImg,
  },
  {
    id: 'tablets',
    title: 'Tablets',
    path: '/tablets',
    Icon: WorkTimeImg,
  },
  {
    id: 'accessories',
    title: 'Accessories',
    path: '/accessories',
    Icon: CalendarImg,
  },
];
