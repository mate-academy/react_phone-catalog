import classNames from 'classnames';
import React, { useState } from 'react';
import { ProductCard } from '../ProductCard/ProductCard';
import './ProductsSlider.scss';
import { Product } from '../../Helpers/types/Product';

type Props = {
  title: string,
  products: Product[],
};

export const ProductSlider: React.FC<Props> = ({ title, products }) => {
  const [startPoint, setStartPoint] = useState(0);

  const [disableRight, setDisableRight] = useState(false);
  const [disableLeft, setDisableLeft] = useState(true);

  const shown = products.slice(startPoint, startPoint + 4);

  const prev = () => {
    setStartPoint(startPoint - 4);
    setDisableLeft(startPoint === 4);
    setDisableRight(false);
  };

  const next = () => {
    setStartPoint(startPoint + 4);
    setDisableRight(startPoint === products.length - 8);
    setDisableLeft(false);
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
              { 'button-small--left--disable': disableLeft },
            )}
            onClick={prev}
            aria-label="swipe left"
            disabled={disableLeft}
          />
          <button
            type="button"
            className={classNames(
              'button-small',
              'button-small--right',
              { 'button-small--right--disable': disableRight },
            )}
            onClick={next}
            aria-label="swipe right"
            disabled={disableRight}
          />
        </div>
      </div>
      <div className="ProductSlider__container" data-cy="cardsContainer">
        {shown.map(product => (
          <div key={product.id}>
            <ProductCard product={product} />
          </div>
        ))}
      </div>
    </div>
  );
};
