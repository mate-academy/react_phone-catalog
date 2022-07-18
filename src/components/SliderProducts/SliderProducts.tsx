import React, { useState } from 'react';
import classNames from 'classnames/bind';
import { Product } from '../../type';
import { PricesPhone } from '../../helpers/PricesPhone/PricesPhone';
import './SliderProducts.scss';

interface Props {
  title: string,
  products: Product[],
}

export const SliderProducts: React.FC<Props> = ({ title, products }) => {
  const [firstElem, setFirstElem] = useState(0);

  return (
    <section className="slider">
      <div className="slider__wrapper">
        <div className="slider__header">
          <h2 className="slider__title">
            {title}
          </h2>
          <div className="slider__move">
            <button
              type="button"
              aria-label="Mute volume"
              className="slider__left-right slider__left"
              disabled={firstElem < 4}
              onClick={() => {
                let value = firstElem - 4;

                if (value < 4) {
                  value = 0;
                }

                setFirstElem(value);
              }}
            />
            <button
              type="button"
              aria-label="Mute volume"
              className={classNames('slider__left-right slider__right', {
                'products-slider__button--active':
                  firstElem < products.length - 5,
              })}
              disabled={firstElem > products.length - 5}
              onClick={() => {
                let value = firstElem + 4;

                if (value < 0) {
                  value = 0;
                }

                setFirstElem(value);
              }}
            />
          </div>
        </div>
        <div className="slider__content">
          {products.slice(firstElem, firstElem + 4).map((product) => {
            return (
              <div className="prices__card card" key={product.id}>
                <PricesPhone product={product} />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
