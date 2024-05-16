import React, { useContext, useState } from 'react';
import './CarouselProductCards.scss';
import { Product } from '../../types/Product';
import classNames from 'classnames';
import { useSwipe } from '../../hooks/useSwipe';
import { ProductCard } from '../ProductCard/ProductCard';
import { Loader } from '../Loader';
import { StoreContext } from '../../context/StoreContext';

const CARD_WIDTH_WITH_GAP = 288;

type Props = {
  title: string;
  products: Product[];
  isDiscount: boolean;
};

export const CarouselProductCards: React.FC<Props> = ({
  products,
  title,
  isDiscount,
}) => {
  const { isErrorOfLoading } = useContext(StoreContext);

  const [transition, setTransition] = useState(0);

  const endLeftSideCarousel = transition === 0;
  const endRightSideCarousel =
    transition === CARD_WIDTH_WITH_GAP * products.length - CARD_WIDTH_WITH_GAP;

  const handleSlideLeft = () => {
    if (endLeftSideCarousel) {
      return;
    }

    setTransition(prev => prev - CARD_WIDTH_WITH_GAP);
  };

  const handleSlideRight = () => {
    if (endRightSideCarousel) {
      return;
    }

    setTransition(prev => prev + CARD_WIDTH_WITH_GAP);
  };

  const elementRef = useSwipe(handleSlideLeft, handleSlideRight);

  return (
    <div className="carousel-product-cards">
      <div className="carousel-product-cards__head">
        <div className="head__title">{title}</div>

        <div className="head__buttons">
          <button
            className={classNames('head__button head__button--left', {
              'head__button--left--disabled': endLeftSideCarousel,
            })}
            disabled={endLeftSideCarousel}
            onClick={handleSlideLeft}
          />

          <button
            className={classNames('head__button head__button--right', {
              'head__button--right--disabled': endRightSideCarousel,
            })}
            disabled={endRightSideCarousel}
            onClick={handleSlideRight}
          />
        </div>
      </div>

      {!!!products.length && !isErrorOfLoading ? (
        <Loader />
      ) : !!!products.length ? (
        <div className="something-went-wrong">
          <div className="something-went-wrong__title">
            Something went wrong...
          </div>
        </div>
      ) : (
        <>
          <div className="carousel-product-cards__window" ref={elementRef}>
            <div
              className="carousel-product-cards__all-cards"
              style={{
                width: `${products.length * CARD_WIDTH_WITH_GAP}px`,
                transform: `translateX(-${transition}px)`,
              }}
            >
              {products.map(product => (
                <ProductCard
                  key={product.id}
                  isDiscount={isDiscount}
                  product={product}
                />
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
};
