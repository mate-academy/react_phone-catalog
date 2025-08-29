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
    link: Category.Phones,
    src: 'phones.png',
  },
  {
    id: 1,
    name: 'Tablets',
    link: Category.Tablets,
    src: 'tablets.png',
  },
  {
    id: 2,
    name: 'Accessories',
    link: Category.Accessories,
    src: 'accessories.png',
  },
];

export { type HomePageCategory, categories };
