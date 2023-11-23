import React, { useState } from 'react';
import classNames from 'classnames';
import arrowRight from '../images/icons/Arrow_right.svg';
import { Products } from '../type/Products';
import { Card } from './Card';

type Props = {
  title: string,
  list: Products[];
};

export const CatalogProducts: React.FC<Props> = ({ title, list }) => {
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
    <div className="catalog-products">
      <div className="catalog-products__top">
        <h1 className="catalog-products__title">{title}</h1>

        <div className="catalog-products__buttons">
          <button
            type="button"
            className="catalog-products__button"
            onClick={() => handleArrowClick('left')}
            disabled={translateXValue === 0}
          >
            <img
              src={arrowRight}
              alt=""
              className={classNames('catalog-products__button-left', {
                'catalog-products__button-left--noActive':
                translateXValue === 0,
              })}
            />
          </button>

          <button
            type="button"
            className="catalog-products__button"
            onClick={() => handleArrowClick('right')}
          >
            <img src={arrowRight} alt="" />
          </button>
        </div>
      </div>

      <div className="catalog-products__cards">
        <div
          className="catalog-products__cards-inner"
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
