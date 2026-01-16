/* eslint-disable max-len */

import { useContext } from 'react';
import s from './GoodsSlider.module.scss';

import { ProductCard } from '../../../../components/ProductCard/ProductCard';
import { ProductsContext } from '../../../../Context/ProductsContext';
// import { ReactComponent as Right } from '/img/icons/Stroke_right.svg';

export const GoodsSlider = () => {
  const { products } = useContext(ProductsContext);

  const trimProducts = products.slice(0, 4);

  return (
    <div className={`BannerSlider ${s.banner_slider}`}>
      <h2 className="title">Brand new models</h2>
      {/* Brand new models slider content goes here */}
      <div className="columns">
        {trimProducts.map(product => (
          <div className="column" key={product.id}>
            <ProductCard product={product} />
          </div>
        ))}
      </div>
    </div>
  );
};
