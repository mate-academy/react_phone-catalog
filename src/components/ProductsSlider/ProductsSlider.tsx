import classNames from 'classnames';
import { useEffect, useRef, useState } from 'react';
import { Product } from '../../helpers/types';
import { ProductCard } from '../ProductCard/ProductCard';
import './ProductsSlider.scss';

type Props = {
  title: string;
  products: Product[],
};

export const ProductsSlider: React.FC<Props> = ({ title, products }) => {
  const PRODUCT_CARD_WIDTH = 272;
  const GAP_WIDTH = 16;
  const CARDS_VIEWED = 4;

  const [counter, setCounter] = useState(0);
  const [prevDisabled, setPrevDisabled] = useState(false);
  const [nextDisabled, setNextDisabled] = useState(false);

  const itemsLine = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (counter === 0) {
      setPrevDisabled(true);
    }

    if (counter === products.length - 1 - CARDS_VIEWED) {
      setNextDisabled(true);
    }

    const translation = (PRODUCT_CARD_WIDTH + GAP_WIDTH) * counter;

    if (itemsLine.current) {
      itemsLine.current.style.transform = `translateX(-${translation}px)`;
    }
  }, [counter]);

  function toPrew() {
    setNextDisabled(false);
    setCounter(prev => prev - 1);
  }

  function toNext() {
    setPrevDisabled(false);
    if (counter === products.length - 1 - CARDS_VIEWED) {
      setNextDisabled(true);
    } else {
      setCounter(prev => prev + 1);
    }
  }

  return (
    <div className="products-slider">
      <div className="products-slider__top">
        <h1 className="products-slider__title">{title}</h1>

        <div className="products-slider__buttons">
          <button
            aria-label="prev"
            type="button"
            className={classNames(
              'button button--prev',
              { 'button--disabled': prevDisabled },
            )}
            onClick={toPrew}
          />
          <button
            aria-label="next"
            type="button"
            className={classNames(
              'button button--next',
              { 'button--disabled': nextDisabled },
            )}
            onClick={toNext}
          />
        </div>
      </div>

      <div className="products-slider__viewport">
        <div
          className="products-slider__items"
          ref={itemsLine}
          data-cy="cardsContainer"
        >
          {products.map(currProduct => (
            <div key={currProduct.id}>
              <ProductCard product={currProduct} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
