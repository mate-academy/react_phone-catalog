import React, { useState } from 'react';
import './ProductSlider.scss';
import { TransitionGroup, CSSTransition } from 'react-transition-group';

import {
  ReactComponent as ArrowRigth,
} from '../../images/icons/arrow_rigth.svg';
import {
  ReactComponent as ArrowLeft,
} from '../../images/icons/arrow_left.svg';
import { ProductsList } from '../ProductsList/ProductsList';
import { Product } from '../../types/Product';

const VISIBLE_COUNT = 4;

type Props = {
  name: string;
  data: Product[];
};

export const ProductSlider: React.FC<Props> = ({ data, name }) => {
  const [endIndex, setEndIndex] = useState(VISIBLE_COUNT);

  const startIndex = endIndex - VISIBLE_COUNT;
  const visibleProducts = data.slice(startIndex, endIndex);

  const handleNextButtonClick = () => {
    const maxIndex = data.length - 1;

    const newEndIndex = endIndex + VISIBLE_COUNT > maxIndex
      ? maxIndex
      : endIndex + VISIBLE_COUNT;

    setEndIndex(newEndIndex);
  };

  const handlePrevButtonClick = () => {
    const newEndIndex = endIndex - VISIBLE_COUNT < VISIBLE_COUNT
      ? VISIBLE_COUNT
      : endIndex - VISIBLE_COUNT;

    setEndIndex(newEndIndex);
  };

  const isPrevButtonDisabled = endIndex <= VISIBLE_COUNT;
  const isNextButtonDisabled = endIndex >= data.length - 1;

  return (
    <div className="product-slider">
      <div className="product-slider__top">
        <h1 className="product-slider__title">{name}</h1>
        <div className="product-slider__top-left">
          <button
            disabled={isPrevButtonDisabled}
            className="product-slider__nav button button__nav"
            type="button"
            onClick={handlePrevButtonClick}
          >
            <ArrowLeft />
          </button>
          <button
            disabled={isNextButtonDisabled}
            className="product-slider__nav button button__nav"
            type="button"
            onClick={handleNextButtonClick}
          >
            <ArrowRigth />
          </button>
        </div>
      </div>
      <TransitionGroup className="product-slider__content">
        <CSSTransition
          key={endIndex}
          classNames="product-slider__transition"
          timeout={50}
          exit={false}
        >
          <ProductsList products={visibleProducts} />
        </CSSTransition>
      </TransitionGroup>
    </div>
  );
};
