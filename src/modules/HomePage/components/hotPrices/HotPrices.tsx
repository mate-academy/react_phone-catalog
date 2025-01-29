import React from 'react';
import styles from './HotPrices.module.scss';
import classNames from 'classnames';
import { CardSlider } from '../../../../components/CardSlider';
import allProducts from '../../../../../public/api/products.json';

export const HotPrices: React.FC = () => {
  const hotProducts = allProducts
    .sort((a, b) => b.fullPrice - b.price - (a.fullPrice - a.price))
    .slice(0, 10);

  return (
    <div className={classNames(styles[('hot-prices__container', 'container')])}>
      <CardSlider
        sliderTitle={'Hot Prices'}
        products={hotProducts}
        showDiscount={true}
      />
    </div>
  );
};
