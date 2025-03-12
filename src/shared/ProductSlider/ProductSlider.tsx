import classNames from 'classnames';
import s from './ProductSlider.module.scss';
import React, { useState } from 'react';
import { Product } from '../../types/Products';
import { ProductCards } from './components/ProductCards';

type Props = {
  title: string;
  products: Product[];
};

export const ProductSlider: React.FC<Props> = ({ title, products }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextCard = () => {
    setCurrentIndex(prev => prev + 1);
  };

  const prevCard = () => {
    setCurrentIndex(prev => prev - 1);
  };

  return (
    <div className="block-margin">
      <div className={classNames(s.title__wrapper, 'container')}>
        <div className={s.title}>
          <h2>{title}</h2>
        </div>
        <div className={s.title__buttons}>
          <button
            className={classNames(s.title__buttons_prev, {
              [s.disable]: currentIndex === 0,
            })}
            onClick={prevCard}
            disabled={currentIndex === 0}
          >
            <img src="./img/icons/prev.png" alt="previous card" />
          </button>
          <button className={s.title__buttons_next} onClick={nextCard}>
            <img src="./img/icons/next.png" alt="next card" />
          </button>
        </div>
      </div>
      <div className={classNames(s.cards_slider, 'container')}>
        <div
          className={s.cards_slide}
          style={{ transform: `translateX(-${currentIndex * 50}%)` }}
        >
          <ProductCards products={products} />
        </div>
      </div>
    </div>
  );
};
