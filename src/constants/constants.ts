import { getAccessories, getPhones, getTablets } from '../services/product.api';
import { BaseProduct } from '../types/types';

export const BANNERS = [
  { id: 1, src: '/img/slider/banner.jpg', alt: 'Iphone 14 pro' },
  { id: 2, src: '/img/slider/banner2.jpg', alt: 'Iphone 14 pro' },
  { id: 3, src: '/img/slider/banner3.jpg', alt: 'Iphone 14 pro' },
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
    const foundProduct = allProducts.find(product => product.id === targetId);

    return foundProduct || null;
  } catch (error) {
    return null;
  }
};
