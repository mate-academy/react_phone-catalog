import { Product } from '../typies';

export const maxNumber = (arr: Product[], key: keyof Product): number => {
  return Math.max(...arr.map(item => item[key] as number));
};

export const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  });
};
