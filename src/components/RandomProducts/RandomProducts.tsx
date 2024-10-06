import React, { useState } from 'react';
import { PictureSlider } from '../PictureSlider/PictureSlider';
import './RandomProducts.module.scss';
import cn from 'classnames';
import { Product } from '../../types/Product';
import { GetAmountOfSliderProducts } from '../../utils/getSliderProducts';

type Props = {
  sliderProducts: Product[];
};

export const RandomProducts: React.FC<Props> = ({ sliderProducts }) => {
  const [index, setIndex] = useState(0);
  const amount = GetAmountOfSliderProducts();
  const slicedProducts = sliderProducts.slice(index, index + amount);
  const notActivePrev = index === 0;
  const notActiveNext = index === sliderProducts.length - amount;

  return (
    <div className="container">
      <article className="RandomProducts">
        <h1 className="article__title brand__title">You may also like</h1>

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

        <PictureSlider products={slicedProducts} />
      </article>
    </div>
  );
};
