import { useEffect } from 'react';
import { Hero } from './components/Hero';
import { Category } from './components/Category';
import { ProductsSlider } from '../shared/ProductsSlider';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import * as productsActions from '../../features/products/productsSlice';

export const HomePage = () => {
  const dispatch = useAppDispatch();
  const { newModels, hotPrice } = useAppSelector(state => state.products);

  useEffect(() => {
    dispatch(productsActions.init());
  }, []);

  return (
    <>
      <Hero />
      <ProductsSlider
        title="Brand new models"
        products={newModels}
        hasFullPrice={false}
      />
      <Category />
      <ProductsSlider
        title="Hot prices"
        products={hotPrice}
        hasFullPrice={true}
      />
    </>
  );
};
