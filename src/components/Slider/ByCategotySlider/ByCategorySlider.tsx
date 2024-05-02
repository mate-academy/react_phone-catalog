import React, { useEffect, useState } from 'react';
import { useProductSlider } from '../ProductSlider';
import { Product } from '../../../types/product';
import { getProducts } from '../../../api/api';

type Props = {
  category: string;
};

export const ByCategorySlider: React.FC<Props> = ({ category }) => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    getProducts().then(setProducts);
  }, []);

  const productsByCategory = products.filter(
    product => product.category === category,
  );
  const { sliderComponent: byCategorySlider } = useProductSlider(
    productsByCategory,
    false,
    true,
    false,
  );

  return <div>{byCategorySlider}</div>;
};
