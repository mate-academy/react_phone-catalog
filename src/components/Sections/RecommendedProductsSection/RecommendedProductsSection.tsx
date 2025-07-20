import { type FC } from 'react';

import { ProductsSlider } from '../../Sliders/ProductsSlider';
import { useFetchProducts } from '../../../hooks/useFetchProducts';

export const RecommendedProductsSection: FC = () => {
  const { products, isLoading } = useFetchProducts();

  const shuffleArray = <T,>(array: T[]): T[] => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };

  const shuffledProducts = shuffleArray(products);
  const randomProducts = shuffledProducts.slice(0, 20);

  return (
    <ProductsSlider
      title={'You may also like'}
      products={randomProducts}
      isLoading={isLoading}
    />
  );
};
