import React, { useState } from 'react';
import classNames from 'classnames';
import { ProductShort } from '../../types/ProductShort';
import { ProductCard } from '../ProductCard/ProductCard';
import './ProductsSlider.scss';

const enum Disable {
  Next = 'next',
  Prev = 'prev',
  Empty = '',
}

type Props = {
  title: string,
  quantityCards: number,
  widthItem: number,
  widthGap: number,
  products: ProductShort[],
  numLiked: number,
  onSetNumLiked: (num: number) => void,
  numAdded: number,
  onSetNumAdded: (num: number) => void,
};

export const ProductsSlider: React.FC<Props> = React.memo(({
  title,
  quantityCards,
  widthItem,
  widthGap,
  products,
  numLiked,
  onSetNumLiked,
  numAdded,
  onSetNumAdded,
}) => {
  const [moveRight, setMoveRight] = useState<number>(0);
  const [disabledButton, setDisabledButton] = useState<Disable>(Disable.Prev);

  const step = 1 * (widthItem + widthGap);
  const lastTranslatePosition: number = (products.length - quantityCards)
    * step * -1;

  const handlerCaruselsPrev = () => {
    if (moveRight + step === 0) {
      setDisabledButton(Disable.Prev);
    } else {
      setDisabledButton(Disable.Empty);
    }

    setMoveRight(currentRight => currentRight + step);
  };

  const handlerCaruselsNext = () => {
    if (moveRight - step === lastTranslatePosition) {
      setDisabledButton(Disable.Next);
    } else {
      setDisabledButton(Disable.Empty);
    }

    setMoveRight(currentRight => currentRight - step);
  };

  return (
    <div className="slider">
      <div className="slider__top">
        <h1>
          {title}
        </h1>

        <div className="slider__top--buttons-container">
          <button
            type="button"
            aria-label="scroll-left"
            title="previous images"
            className={classNames(
              'slider__top--button',
              'slider__top--button-left',
              { 'is-disabled': disabledButton === Disable.Prev },
            )}
            onClick={handlerCaruselsPrev}
            disabled={disabledButton === Disable.Prev}
          />

          <button
            type="button"
            aria-label="scroll-right"
            title="next images"
            className={classNames(
              'slider__top--button',
              'slider__top--button-right',
              { 'is-disabled': disabledButton === Disable.Next },
            )}
            onClick={handlerCaruselsNext}
            disabled={disabledButton === Disable.Next}
          />
        </div>
      </div>

      <div className="slider__content">
        <div
          className="slider__images"
          data-cy="cardsContainer"
          style={{ transform: `translateX(${moveRight}px)` }}
        >
          {products.map(product => (
            <ProductCard
              key={product.id}
              product={product}
              numLiked={numLiked}
              onSetNumLiked={onSetNumLiked}
              numAdded={numAdded}
              onSetNumAdded={onSetNumAdded}
            />
          ))}
        </div>
      </div>
    </div>
  );
});
