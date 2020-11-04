import React, { FC, useState } from 'react';
import { useSelector } from 'react-redux';

import { isLoading, errorState } from '../store';
import { Phones } from '../interfaces/interfaces';
import ProductCard from './ProductCard';

type Props = {
  phones: Phones[];
};

const ProductSlider: FC<Props> = ({ phones }) => {
  const loading = useSelector(isLoading);
  const error = useSelector(errorState);

  const [position, setPosition] = useState(0);
  const [offset] = useState(1152);

  const slidesMove = {
    display: 'flex',

    transform: `translateX(${position}px)`,

    transition: 'transform 0.5s',
  };

  const prev = () => {
    if (position === 0) {
      setPosition(-offset * (Math.floor(phones.length / 4) - 1));

      return;
    }

    setPosition(position + offset);
  };

  const next = () => {
    if (position === -offset * (Math.floor(phones.length / 4) - 1)) {
      setPosition(0);

      return;
    }

    setPosition(position - offset);
  };

  return (
    <div>
      <div className="sliderButtons">
        <button
          type="button"
          className="sliderButtons__btn"
          onClick={prev}
        >
          <img src="img/left-arrow.svg" alt="Left arrow" />
        </button>
        <button
          type="button"
          className="sliderButtons__btn"
          onClick={next}
        >
          <img src="img/right-arrow.svg" alt="Right arrow" />
        </button>
      </div>
      <div className="productSlider">
        {
          loading
        && (
          <div className="productSlider__loader" />
        )
        }
        {
          error
        && (
          <div className="productSlider__error">Loading error...</div>
        )
        }
        <div style={slidesMove}>
          {phones.map(phone => (
            <div key={phone.id}>
              <ProductCard phone={phone} />
            </div>
          ))}
        </div>
      </div>
    </div>

  );
};

export default ProductSlider;
