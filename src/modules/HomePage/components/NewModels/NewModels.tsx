import React from 'react';
import styles from './NewModels.module.scss';
import classNames from 'classnames';
import allProducts from '../../../../../public/api/products.json';
import { CardSlider } from '../../../../components/CardSlider';

export const NewModels: React.FC = () => {
  const newProducts = allProducts.sort((a, b) => b.year - a.year).slice(0, 10);

  return (
    <div className={classNames(styles[('new-models__container', 'container')])}>
      <CardSlider
        sliderTitle={'Brand new models'}
        products={newProducts}
        showDiscount={false}
      />
    </div>
  );
};
