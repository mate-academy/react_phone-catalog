import classNames from 'classnames';
import s from './NewModelsSlider.module.scss';
import { useState } from 'react';
import { ProductSlider } from '../ProductSlider';

export const NewModelsSlider = () => {
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
          <h2>Brand new models</h2>
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
      <ProductSlider currentIndex={currentIndex} />
    </div>
  );
};
