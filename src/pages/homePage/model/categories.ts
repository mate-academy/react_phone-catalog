import { Category } from '@shared/types/APIReturnTypes';

interface HomePageCategory {
  id: number;
  name: string;
  link: 'phones' | 'tablets' | 'accessories';
  src: string;
}

const categories: HomePageCategory[] = [
  {
    id: 0,
    name: 'Mobile phones',
    link: Category.PHONES,
    src: 'phones.png',
  },
  {
    id: 1,
    name: 'Tablets',
    link: Category.TABLETS,
    src: 'tablets.png',
  },
  {
    id: 2,
    name: 'Accessories',
    link: Category.ACCESSORIES,
    src: 'accessories.png',
  },
];

export { type HomePageCategory, categories };
