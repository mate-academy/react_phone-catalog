import { useState } from 'react';
import {
  GetAmountOfSliderProducts,
  GetSliderProducts,
} from '../../utils/getSliderProducts';
import { PictureSlider } from '../PictureSlider/PictureSlider';
import './Brandmodels.module.scss';
import cn from 'classnames';

export const Brandmodels = () => {
  const [index, setIndex] = useState(0);
  const sliderProducts = [...GetSliderProducts('brand')];
  const amount = GetAmountOfSliderProducts();
  const slicedProducts = sliderProducts.slice(index, index + amount);
  const notActivePrev = index === 0;
  const notActiveNext = index === sliderProducts.length - amount;

  return (
    <article className="brand__models">
      <div className="article__top">
        <h1 className="article__title brand__title">Brand new models</h1>

        <div className="arrow__buttons">
          <div
            className={cn('arrow__button', {
              'is-not-active': notActivePrev,
            })}
          >
            <button
              className={cn('left__arrow button', {
                'is-not-active': notActivePrev,
              })}
              onClick={() => setIndex(index - 1)}
              disabled={notActivePrev}
            ></button>
          </div>

          <div
            className={cn('arrow__button', {
              'is-not-active': notActiveNext,
            })}
          >
            <button
              className={cn('right__arrow button', {
                'is-not-active': notActiveNext,
              })}
              onClick={() => setIndex(index + 1)}
              disabled={notActiveNext}
            ></button>
          </div>
        </div>
      </div>

      <PictureSlider products={slicedProducts} />
    </article>
  );
};
