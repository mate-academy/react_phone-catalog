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

export const getNumbers = (from: number, to: number): number[] => {
  const numbers = [];

  for (let n = from; n <= to; n += 1) {
    numbers.push(n);
  }

  return numbers;
};

export const latestYear = (arr: Product[]): number => {
  return arr.reduce((year, product) => {
    if (product.year > year) {
      return product.year;
    }

    return year;
  }, 0);
};

export const getSuggestedProducts = (products: Product[]): Product[] => {
  const shuffled = [...products];

  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));

    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }

  return shuffled.slice(0, 10);
};

export const debounce = <T extends (...args: string[]) => void>(
  func: T,
  delay = 500,
): ((...args: Parameters<T>) => void) => {
  let timeoutId: ReturnType<typeof setTimeout>;

  return function (this: string, ...args: Parameters<T>) {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }

    timeoutId = setTimeout(() => func.apply(this, args), delay);
  };
};
