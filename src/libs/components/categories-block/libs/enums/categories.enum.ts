import { AppRoutes, ProductsCategories } from '../../../../enums';
import { CategorpesImages } from './images.enum';

type BannersType = {
  category: ProductsCategories,
  title: string,
  image: string,
  link: AppRoutes,
};

export const categories: BannersType[] = [
  {
    category: ProductsCategories.PHONES,
    title: 'Phones',
    image: CategorpesImages.PhonesImg,
    link: AppRoutes.PHONES,
  },
  {
    category: ProductsCategories.TABLETS,
    title: 'Tablets',
    image: CategorpesImages.TabletsImg,
    link: AppRoutes.TABLETS,
  },
  {
    category: ProductsCategories.ACCESSORIES,
    title: 'Accessories',
    image: CategorpesImages.AccessoriesImg,
    link: AppRoutes.ACCESSORIES,
  },
];
