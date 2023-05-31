import './Slider.scss';

import { useCallback, useMemo, useState } from 'react';

import classNames from 'classnames';
import {
  ReactComponent as ArrowLeft
} from '../../images/icons/arrow-left.svg';
import {
  ReactComponent as ArrowRight
} from '../../images/icons/arrow_right.svg';
import { Product } from '../../types/Product';
import { ProductCard } from '../ProductCard';

const TRANSITION_DURATION = 700;
const SLIDE_WIDTH = 272 + 16;

interface Props {
  products: Product[];
  title: string;
}

export const Slider: React.FC<Props> = ({ products, title }) => {
  const [offset, setOffset] = useState<number>(0);
  const [transitionDuration, setTransitionDuration]
    = useState<number>(TRANSITION_DURATION);

  const productsLength = useMemo(() => products.length, []);

  const handleLeftArrowClick = useCallback(() => {
    if (!transitionDuration) {
      setTransitionDuration(TRANSITION_DURATION);
    }

    setOffset((current) => {
      const newOffset = current + SLIDE_WIDTH * 4;

      return Math.min(newOffset, 0);
    });
  }, [offset]);

  const maxOffset = useMemo(
    () => -(SLIDE_WIDTH * (productsLength - 4)),
    [SLIDE_WIDTH, productsLength],
  );

  const handleRightArrowClick = useCallback(() => {
    if (!transitionDuration) {
      setTransitionDuration(TRANSITION_DURATION);
    }

    setOffset((current) => {
      const newOffset = current - SLIDE_WIDTH * 4;

      return Math.max(newOffset, maxOffset);
    });
  }, [transitionDuration, offset, maxOffset]);

  const disableLeftArrowButton = useMemo(() => offset === 0, [offset]);
  const disableRightArrowButton = useMemo(
    () => offset === maxOffset,
    [offset, maxOffset],
  );

  return (
    <div className="slider">
      <div className="slider__top">
        <h1 className="slider__title">{title}</h1>

        <div className="slider__buttons">
          <button
            className={classNames('slider__arrow slider__arrow--left', {
              'slider__arrow--disabled': disableLeftArrowButton,
            })}
            onClick={handleLeftArrowClick}
            disabled={disableLeftArrowButton}
            type="button"
          >
            <ArrowLeft
              className={classNames('arrow--default', {
                'slider__arrow-icon--disabled': disableLeftArrowButton,
              })}
            />
          </button>

          <button
            className={classNames('slider__arrow slider__arrow--right', {
              'slider__arrow--disabled': disableRightArrowButton,
            })}
            onClick={handleRightArrowClick}
            disabled={disableRightArrowButton}
            type="button"
          >
            <ArrowRight
              className={classNames('arrow--default', {
                'slider__arrow-icon--disabled': disableRightArrowButton,
              })}
            />
          </button>
        </div>
      </div>

      <div className="slider__window">
        <div
          className="slider__container"
          style={{
            transform: `translateX(${offset}px)`,
            transitionDuration: `${transitionDuration}ms`,
          }}
        >
          {products.map((product) => (
            <div className="slider__slide" key={product.id}>
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
