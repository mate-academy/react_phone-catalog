import React, { useEffect } from 'react';
import { Slider } from '../../components/Slider';
import { ProductSlider } from '../../components/ProductSlider';

import './HomePage.scss';

import { useAppDispatch, useAppSelector } from '../../api/hooks';
import { getProducts } from '../../features/productsSlice';

export const HomePage: React.FC = () => {
  const dispatch = useAppDispatch();
  const products = useAppSelector(state => state.products.products);
  const isLoaded = useAppSelector(state => state.products.loaded);

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  return (
    <main className="main">
      <Slider />

      {isLoaded && (
        <div className="hotprices margin-top-70-px">
          <ProductSlider
            title="Hot prices"
            productList={products.slice(0, 12)}
          />
        </div>
      )}

      {isLoaded && (
        <div className="brand-new margin-top-70-px">
          <ProductSlider
            title="Brand new model"
            productList={products.slice(12, 24)}
          />
        </div>
      )}

    </main>
  );
};
