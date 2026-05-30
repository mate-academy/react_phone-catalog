import { Product } from '../../../../shared/types/Product';
import { BASE_URL } from '../../../../shared/utils/httpClient';

export const categoriesInfo = (products: Product[]) => {
  return [
    {
      title: 'Mobile phones',
      count: products.filter(p => p.category === 'phones').length,
      img: `${BASE_URL}img/categories/category-phones.png`,
      name: 'phones',
    },
    {
      title: 'Tablets',
      count: products.filter(p => p.category === 'tablets').length,
      img: `${BASE_URL}img/categories/category-tablets.png`,
      name: 'tablets',
    },
    {
      title: 'Accessories',
      count: products.filter(p => p.category === 'accessories').length,
      img: `${BASE_URL}img/categories/category-accessories.png`,
      name: 'accessories',
    },
  ];
};
