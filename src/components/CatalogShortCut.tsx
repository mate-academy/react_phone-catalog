import React, { useState } from 'react';
import arrowRight from '../imgs/icons/arrow-right.svg';
import arrowLeft from '../imgs/icons/arrow-left.svg';
import { Products } from '../type/Products';
import { Card } from './Card';

type Props = {
  list: Products[];
  title: string;
};

export const CatalogShortCut: React.FC<Props> = ({ list, title }) => {
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
    <div className="CatalogShortCut">
      <div className="CatalogShortCut__top">
        <h1 className="CatalogShortCut__title">{title}</h1>

        <div className="CatalogShortCut__buttons">
          <button
            type="button"
            className="CatalogShortCut__button"
            onClick={() => handleArrowClick('left')}
            disabled={translateXValue === 0}
          >
            <img src={arrowLeft} alt="" />
          </button>

          <button
            type="button"
            className="CatalogShortCut__button"
            onClick={() => handleArrowClick('right')}
          >
            <img src={arrowRight} alt="" />
          </button>
        </div>
      </div>

      <div className="CatalogShortCut__cards">
        <div
          className="CatalogShortCut__cards-inner"
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
