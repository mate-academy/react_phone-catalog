import React from 'react';
import { ProductsSlider } from '../../../../shared/layout/ProductsSlider';
import { useProducts } from '../../../../shared/context/ProductsContext';

type Props = {
  currentProductId: string;
};

export const ProductsRecommendation: React.FC<Props> = ({
  currentProductId,
}) => {
  const { products } = useProducts();

  const getSuggestedProducts = () => {
    const filtered = products.filter(p => p.id !== +currentProductId);

    const shuffled = [...filtered].sort(() => Math.random() - 0.5);

    return shuffled.slice(0, 30);
  };

  const productsLikes = getSuggestedProducts();

  return (
    <ProductsSlider title={'You may also like'} products={productsLikes} />
  );
};
