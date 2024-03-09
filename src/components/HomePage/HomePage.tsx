import React, { useContext } from 'react';
import { Slider } from '../Slider';
import { PhotoSlider } from '../PhotoSlider';
import { StateContext } from '../../store/ProductsContext';
import './HomePage.scss';

export const HomePage: React.FC = () => {
  const { products } = useContext(StateContext);
  const hotProducts = products.filter(
    product => product.fullPrice - product.price !== 0,
  );

  return (
    <div className="HomePage">
      <h1 className="HomePage__title">Home Page</h1>
      <PhotoSlider />

      <Slider products={hotProducts} title="Hot prices" />
    </div>
  );
};
