import React, { useState } from 'react';
import arrowRight from '../images/icons/Arrow_right.svg';
import arrowLeft from '../images/icons/Arrow_left.svg';
import { Products } from '../type/Products';
import { Card } from './Card';

type Props = {
  list: Products[];
};

export const HotPrice: React.FC<Props> = ({ list }) => {
  const [translateXValue, setTranslateXValue] = useState(0);
  const width = 272;

  const handleArrowClick = (direction: 'left' | 'right') => {
    if (direction === 'right') {
      setTranslateXValue((prev) => prev - width - 16);
    } else {
      setTranslateXValue((prev) => prev + width + 16);
    }
  };

  return (
    <div className="HotPrice">
      <div className="HotPrice__top">
        <h1 className="HotPrice__title">Hot prices</h1>

        <div className="HotPrice__buttons">
          <button
            type="button"
            className="HotPrice__button"
            onClick={() => handleArrowClick('left')}
            disabled={translateXValue === 0}
          >
            <img src={arrowLeft} alt="" />
          </button>

          <button
            type="button"
            className="HotPrice__button"
            onClick={() => handleArrowClick('right')}
          >
            <img src={arrowRight} alt="" />
          </button>
        </div>
      </div>

      <div className="HotPrice__cards">
        <div
          className="HotPrice__cards-inner"
          style={{ transform: `translateX(${translateXValue}px)` }}
        >
          {list.map((phone) => (
            <Card card={phone} key={phone.itemId} />
          ))}
        </div>
      </div>
    </div>
  );
};
