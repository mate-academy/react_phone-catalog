import { getData } from '../../../api/fetchClient';

type CategoryCounts = {
  phoneCounts: number;
  tabletCounts: number;
  accessorieCounts: number;
};

export const getCountByCategorys = async (): Promise<CategoryCounts> => {
  const data = await getData();

  if (!data) {
    return { phoneCounts: 0, tabletCounts: 0, accessorieCounts: 0 };
  }

  const phoneCount = data.filter(
    product => product.category === 'phones',
  ).length;

  const tabletCount = data.filter(
    product => product.category === 'tablets',
  ).length;

  const accessoryCount = data.filter(
    product => product.category === 'accessories',
  ).length;

  return {
    phoneCounts: phoneCount,
    tabletCounts: tabletCount,
    accessorieCounts: accessoryCount,
  };
};

export const getCategorys = async () => {
  const { phoneCounts, tabletCounts, accessorieCounts } =
    await getCountByCategorys();

  const categoriesConfig = [
    {
      color: '#6D6474',
      name: 'Mobile phones',
      count: phoneCounts,
      img: 'img/category-phones.webp',
      path: '/phones',
    },
    {
      color: '#89939A',
      name: 'Tablets',
      count: tabletCounts,
      img: 'img/category-tablets.png',
      path: '/tablets',
    },
    {
      color: '#973D5F',
      name: 'Accessories',
      count: accessorieCounts,
      img: 'img/category-accessories.png',
      path: '/accessories',
    },
  ];

  return categoriesConfig;
};
