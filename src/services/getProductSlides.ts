import { Product } from '../types/Product';
import { ProductSlide } from '../types/ProductSlide';

export const getProductSlides = (products: Product[]): ProductSlide[] => {
  const result: ProductSlide[] = [];
  let id = 1;

  for (let i = 0; i < products.length; i += 4) {
    const slideProducts = products.slice(i, i + 4);

    result.push({ id, slideProducts });

    id += 1;
  }

  return result;
};
