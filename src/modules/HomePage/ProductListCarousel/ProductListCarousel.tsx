import React, { useEffect, useState } from 'react';
import cn from 'classnames';
import { CardCarousel } from '../CardCarousel';
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
            <button
              type="button"
              className={cn('carousel-buttons__move', {
                disabled: imgPosition <= 0,
              })}
              onClick={moveLeft}
            >
              &lt;
            </button>

            <button
              type="button"
              className={cn('carousel-buttons__move', {
                disabled: imgPosition >= maxPosition,
              })}
              onClick={moveRight}
            >
              &gt;
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
                <CardCarousel
                  product={product}
                  key={product.id}
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
