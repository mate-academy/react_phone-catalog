// import './HotPrices.module.scss';
import React, { useState } from 'react';
import { Product } from '../../../types/products';
import './HotPrices.scss';
import classNames from 'classnames';
import { useSwipe } from '../../../units/useSwipe';

const CARD_WIDTH_WITH_GAP = 288;

type Props = {
  salesProducts: Product[];
};

export const HotPrices: React.FC<Props> = ({ salesProducts }) => {
  const [transition, setTransition] = useState(0);

  const handleSlideLeft = () => {
    setTransition(prev => prev - CARD_WIDTH_WITH_GAP);
  };

  const handleSlideRight = () => {
    setTransition(prev => prev + CARD_WIDTH_WITH_GAP);
  };

  const elementRef = useSwipe(handleSlideLeft, handleSlideRight);

  return (
    <div className="hot-prices">
      <div className="hot-prices__head">
        <h2 className="hot-prices__title">Hot prices</h2>
        <div className="hot-prices__head-buttons">
          <button
            className={classNames(
              'hot-prices__button-left hot-prices__button',
              { 'disabled-button__left': transition === 0 },
            )}
            disabled={transition === 0}
            onClick={handleSlideLeft}
          />
          <button
            className={classNames(
              'hot-prices__button-right hot-prices__button',
              {
                'disabled-button__right':
                  transition ===
                  CARD_WIDTH_WITH_GAP * salesProducts.length -
                    CARD_WIDTH_WITH_GAP * 2,
              },
            )}
            disabled={
              transition ===
              CARD_WIDTH_WITH_GAP * salesProducts.length -
                CARD_WIDTH_WITH_GAP * 2
            }
            onClick={handleSlideRight}
          />
        </div>
      </div>

      <div className="hot-prices__window" ref={elementRef}>
        <div
          className="hot-prices__carousel"
          style={{
            width: `${salesProducts.length * CARD_WIDTH_WITH_GAP}px`,
            transform: `translateX(-${transition}px)`,
          }}
        >
          {salesProducts.map(product => {
            const {
              itemId,
              image,
              name,
              price,
              fullPrice,
              screen,
              capacity,
              ram,
            } = product;

            return (
              <div className="card" key={itemId}>
                <img className="card__image" src={image} alt={itemId} />

                <div className="card__title">{name}</div>

                <div className="card__discount">
                  <div className="discount__new-price">{`$${price}`}</div>
                  <div className="discount__old-price">{`$${fullPrice}`}</div>
                </div>

                <div className="card__characteristics">
                  <div className="card__discription">
                    <span className="discription__title">Screen</span>
                    <span className="description__value">{screen}</span>
                  </div>
                  <div className="card__discription">
                    <span className="discription__title">Capacity</span>
                    <span className="description__value">{capacity}</span>
                  </div>
                  <div className="card__discription">
                    <span className="discription__title">RAM</span>
                    <span className="description__value">{ram}</span>
                  </div>
                </div>

                <div className="card__buttons">
                  <a href="#" className="button__add">
                    Add to card
                  </a>
                  <a href="#" className="card-button__favourite">
                    <img src="./img/icons-image/heart_empty.svg" alt="" />
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
