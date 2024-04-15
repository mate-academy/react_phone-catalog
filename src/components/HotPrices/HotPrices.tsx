import React, { useContext } from 'react';
import { ProductContext } from '../../context/productContext';
import { ProductSlider } from '../ProductsSlider';
import { getHotPriceProducts } from '../../utils/api';

export const HotPrices: React.FC = () => {
  const { products } = useContext(ProductContext);

  const hotPriceProducts = getHotPriceProducts(products);

  return <ProductSlider title="Hot prices" products={hotPriceProducts} />;
};
