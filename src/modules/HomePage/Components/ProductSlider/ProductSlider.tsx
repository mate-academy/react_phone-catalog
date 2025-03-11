import classNames from 'classnames';
import { ProductCards } from '../../../shared/ProductCards';
import s from './ProductSlider.module.scss';
import React from 'react';

type Props = {
  currentIndex: number;
};

export const ProductSlider: React.FC<Props> = ({ currentIndex }) => {
  return (
    <div className={classNames(s.cards_slider, 'container')}>
      <div
        className={s.cards_slide}
        style={{ transform: `translateX(-${currentIndex * 50}%)` }}
      >
        <ProductCards />
      </div>
    </div>
  );
};
