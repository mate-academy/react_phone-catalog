import { AllProducts } from '../../../shared/types/AllProduct/AllProduct';

export function getRandom(products: AllProducts[], count: number) {
  const shuffled = [...products].sort(() => Math.random() - 0.5);

  return shuffled.slice(0, count);
}
