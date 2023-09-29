import React, { useEffect, useState } from 'react';
import classNames from 'classnames';
import { ProductShort } from '../../types/ProductShort';
import { ProductCard } from '../ProductCard/ProductCard';
import './ProductsSlider.scss';
import { SLIDER_GAP, SLIDER_ITEM_WIDTH } from '../../helpers/consts';

const enum Disable {
  Next = 'next',
  Prev = 'prev',
  Empty = '',
}

type Props = {
  title: string,
  products: ProductShort[],
  numLiked: number,
  onSetNumLiked: (num: number) => void,
  numAdded: number,
  onSetNumAdded: (num: number) => void,
};

export const ProductsSlider: React.FC<Props> = React.memo(({
  title,
  products,
  numLiked,
  onSetNumLiked,
  numAdded,
  onSetNumAdded,
}) => {
  const [moveRight, setMoveRight] = useState<number>(0);
  const [cardsPerPage, setCardsPerPage] = useState<number>(4);
  const [disabledButton, setDisabledButton] = useState<Disable>(Disable.Prev);

  const step = 1 * (SLIDER_ITEM_WIDTH + SLIDER_GAP);
  const lastTranslatePosition: number = (products.length - cardsPerPage)
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

  useEffect(() => {
    const windowWidth = window.innerWidth;

    if (windowWidth < 633) {
      if (windowWidth < 1020) {
        if (windowWidth < 1303) {
          setCardsPerPage(3);
        }

        setCardsPerPage(2);
      }

      setCardsPerPage(1);
    }

    setCardsPerPage(4);
  }, [moveRight]);

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
