import { Accessories } from '../../../../shared/types/Accessories';
import { PhonesTablets } from '../../../../shared/types/PhonesTablets';
import { BASE_URL } from '../../../../shared/utils/httpClient';

export const categoriesInfo = (
  phones: PhonesTablets[],
  tablets: PhonesTablets[],
  accessories: Accessories[],
) => {
  return [
    {
      title: 'Mobile phones',
      count: phones.length,
      img: `${BASE_URL}img/categories/category-phones.png`,
      name: 'phones',
    },
    {
      title: 'Tablets',
      count: tablets.length,
      img: `${BASE_URL}img/categories/category-tablets.png`,
      name: 'tablets',
    },
    {
      title: 'Accessories',
      count: accessories.length,
      img: `${BASE_URL}img/categories/category-accessories.png`,
      name: 'accessories',
    },
  ];
};
