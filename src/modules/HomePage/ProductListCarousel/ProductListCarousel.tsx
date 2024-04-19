import React, { useEffect, useState } from 'react';
import cn from 'classnames';
import { ProductCard } from '../../shared/ProductCard';
import { getPadding } from '../../../services/getPadding';
import { getWidthCard } from '../../../services/getWidthCard';
import { WIDTH_DEVICES } from '../../constants/WIDTH_DEVICES';
import { Loader } from '../../shared/Loader';
import { Product } from '../../../types/Product';
import {
  COLUMN_SIZE_FOR_DESCTOP,
  DESCTOP_COLUMNS,
  GAP_BETWEEN_COLUMNS,
} from '../../constants/PARAMS_OF_PAGE';

type Props = {
  title: string;
  windowSize: number;
  products: Product[];
  dataLoaded: boolean;
  hotPrice: boolean;
};

export const ProductListCarousel: React.FC<Props> = React.memo(
  ({ title, windowSize, products, dataLoaded, hotPrice }) => {
    const [size, setSize] = useState<number>(windowSize);

    const [touchStart, setTouchStart] = useState<{ x: number } | null>(null);
    const [touchEnd, setTouchEnd] = useState<{ x: number } | null>(null);

    const widthCard = getWidthCard(windowSize);
    const padding = getPadding(windowSize);

    const [position, setPosition] = useState(getPadding(windowSize));
    const [imgPosition, setImgPosition] = useState<number>(0);

    // #region
    const windowSizeForDesctop =
      COLUMN_SIZE_FOR_DESCTOP * DESCTOP_COLUMNS +
      GAP_BETWEEN_COLUMNS * (DESCTOP_COLUMNS - 1);

    const currentWindowSizeSlider =
      windowSize < WIDTH_DEVICES.desctop ? windowSize : windowSizeForDesctop;

    const oneItem = widthCard + GAP_BETWEEN_COLUMNS;

    const itemsPerStep =
      windowSize < WIDTH_DEVICES.desctop
        ? Math.floor(currentWindowSizeSlider / oneItem)
        : Math.floor((currentWindowSizeSlider + GAP_BETWEEN_COLUMNS) / oneItem);

    const maxPosition = dataLoaded ? products.length - itemsPerStep : 0;

    const boundary =
      products.length * oneItem -
      GAP_BETWEEN_COLUMNS +
      padding -
      currentWindowSizeSlider;
    // #endregion

    const moveRight = () => {
      if (imgPosition < maxPosition) {
        const newImgPosition = imgPosition + itemsPerStep;
        const newPosition =
          windowSize < WIDTH_DEVICES.desctop
            ? newImgPosition * oneItem - GAP_BETWEEN_COLUMNS
            : newImgPosition * oneItem;

        setImgPosition(Math.min(newImgPosition, maxPosition));
        setPosition(Math.max(-newPosition, -boundary));
      }
    };

    const moveLeft = () => {
      if (imgPosition > 0) {
        const newImgPosition = imgPosition - itemsPerStep;
        const newPosition =
          windowSize < WIDTH_DEVICES.desctop
            ? newImgPosition * oneItem - GAP_BETWEEN_COLUMNS
            : newImgPosition * oneItem;

        setImgPosition(Math.max(newImgPosition, 0));
        setPosition(Math.min(-newPosition, padding));
      }
    };

    const handleTouchStart = (event: React.TouchEvent<HTMLDivElement>) => {
      setTouchStart({ x: event.touches[0].clientX });
    };

    const handleTouchMove = (event: React.TouchEvent<HTMLDivElement>) => {
      setTouchEnd({ x: event.touches[0].clientX });
    };

    const handleTouchEnd = () => {
      if (touchStart && touchEnd) {
        const deltaX = touchEnd.x - touchStart.x;

        if (Math.abs(deltaX) > 50) {
          if (deltaX > 0) {
            moveLeft();
          } else {
            moveRight();
          }
        }
      }

      setTouchStart(null);
      setTouchEnd(null);
    };

    useEffect(() => {
      if (imgPosition > maxPosition) {
        setImgPosition(maxPosition);

        const newPosition = maxPosition * oneItem - GAP_BETWEEN_COLUMNS;

        setPosition(Math.max(-newPosition, -boundary));

        return;
      }

      if (dataLoaded && size !== windowSize && imgPosition !== 0) {
        const newPosition =
          windowSize < WIDTH_DEVICES.desctop
            ? imgPosition * oneItem - GAP_BETWEEN_COLUMNS
            : imgPosition * oneItem;

        setPosition(Math.max(-newPosition, -boundary));
        setSize(windowSize);
      }

      if (dataLoaded && position !== padding && imgPosition === 0) {
        setPosition(padding);
        setSize(windowSize);
      }
    }, [
      boundary,
      dataLoaded,
      imgPosition,
      maxPosition,
      oneItem,
      padding,
      position,
      size,
      windowSize,
    ]);

    return (
      <div className="carousel">
        <div className="carousel__title-block">
          <h2 className="carousel__title secondary-title">{title}</h2>

          <div className="carousel__slider-control carousel-buttons">
            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              type="button"
              className={cn('carousel-buttons__move', {
                disabled: imgPosition <= 0,
              })}
              onClick={moveLeft}
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  // eslint-disable-next-line max-len
                  d="M10.4715 3.52861C10.2111 3.26826 9.78903 3.26826 9.52868 3.52861L5.52868 7.52861C5.26833 7.78896 5.26833 8.21107 5.52868 8.47141L9.52868 12.4714C9.78903 12.7318 10.2111 12.7318 10.4715 12.4714C10.7318 12.2111 10.7318 11.789 10.4715 11.5286L6.94289 8.00001L10.4715 4.47141C10.7318 4.21107 10.7318 3.78896 10.4715 3.52861Z"
                  fill="#313237"
                  className={cn('carousel-buttons__arrow', {
                    disabled: imgPosition <= 0,
                  })}
                />
              </svg>
            </button>

            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              type="button"
              className={cn('carousel-buttons__move', {
                disabled: imgPosition >= maxPosition,
              })}
              onClick={moveRight}
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  // eslint-disable-next-line max-len
                  d="M5.52876 3.52861C5.78911 3.26826 6.21122 3.26826 6.47157 3.52861L10.4716 7.52861C10.7319 7.78896 10.7319 8.21107 10.4716 8.47141L6.47157 12.4714C6.21122 12.7318 5.78911 12.7318 5.52876 12.4714C5.26841 12.2111 5.26841 11.789 5.52876 11.5286L9.05735 8.00001L5.52876 4.47141C5.26841 4.21107 5.26841 3.78896 5.52876 3.52861Z"
                  fill="#313237"
                  className={cn('carousel-buttons__arrow', {
                    disabled: imgPosition >= maxPosition,
                  })}
                />
              </svg>
            </button>
          </div>
        </div>

        <div className="carousel__imgs-container">
          {!dataLoaded ? (
            <div className="carousel__loader">
              <Loader />
            </div>
          ) : (
            <div
              className="carousel__imgs"
              style={{ left: `${position}px`, gap: `${GAP_BETWEEN_COLUMNS}px` }}
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
            >
              {products.map(product => (
                <ProductCard
                  key={product.id}
                  product={product}
                  widthCard={widthCard}
                  hotPrice={hotPrice}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    );
  },
);
