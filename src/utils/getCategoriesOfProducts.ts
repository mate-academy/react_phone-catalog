import img1 from '../assets/images/CategoryPhone.png';
import img2 from '../assets/images/CategoryTablets.png';
import img3 from '../assets/images/CategoryAccessories.png';

export const getCategoriesOfProducts = (): Record<
  string,
  { image: string; path: string; title: string; count: number }
> => {
  return {
    phones: { image: img1, path: '/phones', title: 'Mobile phones', count: 0 },
    tablets: { image: img2, path: '/tablets', title: 'Tablets', count: 0 },
    accessories: {
      image: img3,
      path: '/accessories',
      title: 'Accessories',
      count: 0,
    },
  };
};
