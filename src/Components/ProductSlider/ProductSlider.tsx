import classNames from 'classnames';
import React, { useState } from 'react';
import { ProductCard } from '../ProductCard/ProductCard';
import { Product } from '../../Helpers/types/Product';
import './ProductsSlider.scss';

type Props = {
  title: string,
  products: Product[],
};

export const ProductSlider: React.FC<Props> = ({ title, products }) => {
  const [startPoint, setStartPoint] = useState(0);
  const [nextDisable, setNextDisable] = useState(false);
  const [prevDisable, setPrevDisable] = useState(true);
  const step = 1;
  const scrollPx = startPoint === 0 ? 0 : 16 * startPoint + startPoint * 272;

  const prev = () => {
    setStartPoint(startPoint - step);
    setPrevDisable(startPoint === 1);
    setNextDisable(false);
  };

  const next = () => {
    setStartPoint(startPoint + step);
    setNextDisable(startPoint === products.length - 5);
    setPrevDisable(false);
  };

  return (
    <div className="ProductSlider">
      <div className="ProductSlider__top">
        <h2 className="title page__title">{title}</h2>
        <div className="ProductSlider__scroll">
          <button
            type="button"
            className={classNames(
              'button-small',
              'button-small--left',
              { 'button-small--left--disable': prevDisable },
            )}
            onClick={prev}
            aria-label="swipe left"
            disabled={prevDisable}
          />
          <button
            type="button"
            className={classNames(
              'button-small',
              'button-small--right',
              { 'button-small--right--disable': nextDisable },
            )}
            onClick={next}
            aria-label="swipe right"
            disabled={nextDisable}
          />
        </div>
      </div>

      <div className="ProductSlider__wrapper">
        <div
          className="ProductSlider__container"
          style={{ transform: `translateX(-${scrollPx}px)` }}
          data-cy="cardsContainer"
        >
          {products.map(product => (
            <div key={product.id}>
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
