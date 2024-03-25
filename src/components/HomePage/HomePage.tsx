import React, { useContext } from 'react';
import { ProductsSlider } from '../ProductsSlider';
import { PhotoSlider } from '../PhotoSlider';
import { StateContext } from '../../store/ProductsContext';
import './HomePage.scss';
import { Categories } from '../Categories';

export const HomePage: React.FC = () => {
  const { products } = useContext(StateContext);
  // const size = useWindowSize();

  const hotProducts = products.filter(
    product => product.fullPrice - product.price !== 0,
  );

  hotProducts.sort((a, b) => {
    const discountA = a.fullPrice - a.price;
    const discountB = b.fullPrice - b.price;

    return discountB - discountA;
  });

  const newModels = products.sort((a, b) => b.year - a.year);

  return (
    <div className="HomePage">
      <h1 className="HomePage__title">Home Page</h1>
      <PhotoSlider />

      <ProductsSlider products={newModels} title="Brand new models" />

      <Categories />

      <ProductsSlider products={hotProducts} title="Hot prices" />
    </div>
  );
};
