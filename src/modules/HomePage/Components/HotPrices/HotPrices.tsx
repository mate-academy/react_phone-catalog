import classNames from 'classnames';
import s from './HotPrices.module.scss';
import { ProductSlider } from '../ProductSlider';
import { useState } from 'react';

export const HotPrices = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextCard = () => {
    setCurrentIndex(prev => prev + 1);
  };

  const prevCard = () => {
    setCurrentIndex(prev => prev - 1);
  };

  return (
    <>
      <div
        className={classNames(s.title__wrapper, 'container', 'block-margin')}
      >
        <div className={s.title}>
          <h2>Hot prices</h2>
        </div>
        <div className={s.title__buttons}>
          <button className={s.title__buttons_prev} onClick={prevCard}>
            <img src="public/img/icons/prev.png" alt="previous" />
          </button>
          <button className={s.title__buttons_next} onClick={nextCard}>
            <img src="public/img/icons/next.png" alt="next" />
          </button>
        </div>
      </div>
      <ProductSlider currentIndex={currentIndex} />
    </>
  );
};
