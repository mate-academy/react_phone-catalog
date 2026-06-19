import { getAccessories, getPhones, getTablets } from '../services/product.api';
import { BaseProduct } from '../types/types';

export const BANNERS = [
  { id: 1, src: '/img/slider/banner.jpg', alt: 'Iphone 14 pro' },
  { id: 2, src: '/img/slider/banner2.jpg', alt: 'Iphone 14 pro' },
  { id: 3, src: '/img/slider/banner3.jpg', alt: 'Iphone 14 pro' },
];

export const sortOptions = [
  { value: 'age', label: 'Newest' },
  { value: 'title', label: 'Alphabetically' },
  { value: 'price', label: 'Cheapest' },
];

export const perPageOptions = [
  { value: '4', label: '4' },
  { value: '8', label: '8' },
  { value: '16', label: '16' },
  { value: 'all', label: 'All' },
];

export const getProductById = async (
  targetId: string | number,
): Promise<BaseProduct | null> => {
  try {
    const [phones, tablets, accessories] = await Promise.all([
      getPhones(),
      getTablets(),
      getAccessories(),
    ]);

    const allProducts: BaseProduct[] = [...phones, ...tablets, ...accessories];
    const foundProduct = allProducts.find(
      product => String(product.id) === String(targetId),
    );

    return foundProduct || null;
  } catch (error) {
    return null;
  }
};
